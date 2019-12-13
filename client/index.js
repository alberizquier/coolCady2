import {
    refreshCoffeeShops,
    refreshCoffeeShop,
    newCaddy,
    askCaddy,
    addProduct,
    removeProduct
} from './main.js';

var currentCaddy = null;

function displayCoffeeShops(coffeeShops) {
    let coffeeShopsCardsNode = document.getElementById('coffeeShopsCards');
    coffeeShopsCardsNode.innerHTML = '';
    for (let coffeeShop of coffeeShops) {
        let divCardNode = document.createElement('div');
        let divBlackNode = document.createElement('div');
        let imgNode = document.createElement('img');
        let brNode = document.createElement('br');
        let spanNode = document.createElement('span');

        coffeeShopsCardsNode.appendChild(divCardNode);
        divCardNode.appendChild(divBlackNode);
        divBlackNode.appendChild(imgNode);
        divBlackNode.appendChild(brNode);
        divBlackNode.appendChild(spanNode);

        divCardNode.setAttribute('class', 'card');
        divCardNode.setAttribute('onclick', `btnCoffeeShopClick('${coffeeShop.id}')`)
        divBlackNode.setAttribute('class', 'black');
        imgNode.setAttribute('src', '/client/assets/dishes/cupAndcake/bgCupCake.jpg')
        spanNode.textContent = coffeeShop.displayName;

        /*
        <div class="card">
                <div class="black">
                    <img src="/client/assets/dishes/cupAndcake/bgCupCake.jpg" alt=""><br>
                    Cup & Cake
                </div>
            </div>
        */

    }
}

function displayCoffeeShop(coffeeShop) {
    let divCoffeeShopNode = document.getElementById(coffeeShop.id);
    //Nodos HTML para display de campos
    let coffeeShop_nameNode = document.getElementById('coffeeShop_name');
    let coffeeShopBodyNode = document.getElementById('coffeeShopBody');
    //Relleno de nodos con los datos del json
    coffeeShop_nameNode.textContent = coffeeShop.displayName;
    //limpiamos el contenido del products body
    coffeeShopBodyNode.innerHTML = "";
    for (let stock of coffeeShop.stocks) {

        let coffeeShop_stockNode = document.createElement('div');
        let coffeeShop_stock_pictureNode = document.createElement('img');
        let coffeeShop_stock_product_displayNameNode = document.createElement('h2');
        let coffeeShop_stock_product_ingredientsNode = document.createElement('h4');
        let coffeeShop_stock_priceSellNode = document.createElement('h4');
        let btnAddToCaddyNode = document.createElement('button');

        coffeeShopBodyNode.appendChild(coffeeShop_stockNode);
        coffeeShop_stockNode.appendChild(btnAddToCaddyNode);
        coffeeShop_stockNode.appendChild(coffeeShop_stock_pictureNode);
        coffeeShop_stockNode.appendChild(coffeeShop_stock_product_displayNameNode);
        coffeeShop_stockNode.appendChild(coffeeShop_stock_product_ingredientsNode);
        coffeeShop_stockNode.appendChild(coffeeShop_stock_priceSellNode);

        coffeeShopBodyNode.setAttribute('class', 'container')
        coffeeShop_stockNode.setAttribute('class', 'container coffeeShop_stock');
        coffeeShop_stock_pictureNode.setAttribute('src', `/client/assets/dishes${stock.product.pictureURL}`);
        coffeeShop_stock_pictureNode.setAttribute('class', 'stock_product_img');
        btnAddToCaddyNode.stock = stock;
        btnAddToCaddyNode.addEventListener('click', async () => {
            await addToCaddy(stock.productId, 1, stock.priceSell);
        });

        coffeeShop_stock_product_displayNameNode.textContent = stock.product.displayName;
        coffeeShop_stock_product_ingredientsNode.textContent = stock.product.ingredients;
        coffeeShop_stock_priceSellNode.textContent = stock.priceSell.toFixed(2) + ' €';
        btnAddToCaddyNode.textContent = '+';
    }

}

function displayCaddy(caddy) {
    currentCaddy = caddy;
    let caddyBodyNode = document.getElementById('caddyBody');
    let taxBaseRNode = document.getElementById('taxBaseR');
    let vatBaseRNode = document.getElementById('vatBaseR');
    let amountDueNode = document.getElementById('amountDue');
    
    taxBaseRNode.value = `${caddy.taxBaseR.toFixed(2)} €`;
    amountDueNode.value = `${caddy.amountDue.toFixed(2)} €`;

    //el amount del vat no viene calculado! Se ha de calcular dinamicamente
    let vatBaseR = caddy.taxBaseR * caddy.percentageBaseR;

    vatBaseRNode.value = `${vatBaseR.toFixed(2)} €`;

    caddyBodyNode.innerHTML = '';
    for (let docDetail of caddy.docDetails) {
        let containerNode = document.createElement('div');
        let itemCounterNode = document.createElement('h3');
        let unionNode = document.createElement('h3');
        let imgNode = document.createElement('img');
        let inputTextNode = document.createElement('input');
        let inputPriceNode = document.createElement('input');
        let buttonRemoveOneNode = document.createElement('button');
        let buttonRemoveSelectionNode = document.createElement('button');

        caddyBodyNode.appendChild(containerNode);
        caddyBodyNode.appendChild(itemCounterNode);
        caddyBodyNode.appendChild(unionNode);
        caddyBodyNode.appendChild(imgNode);
        caddyBodyNode.appendChild(inputTextNode);
        caddyBodyNode.appendChild(inputPriceNode);
        caddyBodyNode.appendChild(buttonRemoveOneNode);
        caddyBodyNode.appendChild(buttonRemoveSelectionNode);
        containerNode.setAttribute('class', 'container');
        itemCounterNode.setAttribute('id', 'itemCounter');
        unionNode.setAttribute('id', 'union');
        imgNode.setAttribute('id', 'itemImage');
        imgNode.setAttribute('src', `/client/assets/dishes${docDetail.product.pictureURL}`);
        inputTextNode.setAttribute('id', 'selectedItem');
        inputPriceNode.setAttribute('id', 'selectedPrice');
        buttonRemoveOneNode.setAttribute('id', 'removeFromCaddy');
        buttonRemoveOneNode.addEventListener('click', async () => {
            console.log('stock.productId', docDetail.productId);
            await removeFromCaddy(docDetail.productId);
        })
        buttonRemoveSelectionNode.setAttribute('id', 'removeSelectionFromCaddy');
        buttonRemoveOneNode.textContent = '-';
        buttonRemoveSelectionNode.textContent = 'X';
        itemCounterNode.textContent = docDetail.quantity;
        unionNode.textContent = "X";
        inputTextNode.value = docDetail.product.displayName;
        inputPriceNode.value = docDetail.price;
    }
    /*
                <div class="container">
                <h3 id="itemCounter">1</h3>
                <h3 id="union">X</h3>
                <img src="/client/assets/dishes/cupAndcake/carrotCupCake.png" alt="">
                <input type="text" value="Carrot Cake" id="selectedItem" disabled=true>
                <input type="text" value="10,00" id="selectedPrice" disabled=true>
                <button id="removeOneItemFromCaddy" onclick="removeOneItemFromCaddy()">-</button>
                <button id="removeSelectionFromCaddy" onclick="removeSelectionFromCaddy()">X</button>
                </div>
    */
}

function btnRefreshAreasClick() {
    hideNode('coffeeShopCardsArea', false);
    hideNode('coffeeShopProductArea', true);
    refreshCoffeeShops(displayCoffeeShops.bind(this));
}

async function requestCaddy() {
    await askCaddy(currentCaddy.id, displayCaddy.bind(this));
}

async function addToCaddy(productId, quantity, price) {
    await addProduct(currentCaddy.id, productId, quantity, price, displayCaddy.bind(this));
}

async function removeFromCaddy(productId) {
    await removeProduct(currentCaddy.id, productId, displayCaddy.bind(this));
}

function hideNode(nameNode, hidden) {
    let node = document.getElementById(nameNode);
    if (hidden) {
        node.style.display = "none";
    } else {
        node.style.display = "block";
    }
}


function btnCoffeeShopClick(id) {
    hideNode('coffeeShopCardsArea', true);
    hideNode('coffeeShopProductArea', false);
    refreshCoffeeShop(id, displayCoffeeShop.bind(this));
    newCaddy(id, displayCaddy.bind(this));
}



function removeSelectionFromCaddy() {

}

let btnRefreshAreasNode = document.getElementById('btnRefreshAreas');
btnRefreshAreasNode.addEventListener('click', btnRefreshAreasClick);


window.btnCoffeeShopClick = btnCoffeeShopClick;
window.btnRefreshAreasClick = btnRefreshAreasClick;