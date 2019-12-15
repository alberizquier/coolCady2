import {
    refreshCoffeeShops,
    refreshCoffeeShop,
    newCaddy,
    addProduct,
    removeProduct,
    removeSelection
} from './main.js';

var currentCaddy = null;


//#region Errors
function displayErrors(errors) {
    let errorsAreaNode = document.getElementById('errorsArea');
    errorsAreaNode.innerHTML = JSON.stringify(errors);
}

//#endregion

//#region AuxFuntions
function hideNode(nameNode, hidden) {
    let node = document.getElementById(nameNode);
    if (hidden) {
        node.style.display = "none";
    } else {
        node.style.display = "block";
    }
}

//#endregion

//#region DisplayModels
function displayCoffeeShops(coffeeShops) {
    /*Template
     <div class="card">
             <div class="black">
                 <img src="/client/assets/dishes/cupAndcake/bgCupCake.jpg" alt=""><br>
                 Cup & Cake
             </div>
         </div>
     */
    hideNode('coffeeShopCardsArea', false);
    hideNode('coffeeShopProductArea', true);

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
        divBlackNode.setAttribute('class', 'black');
        imgNode.setAttribute('src', '/client/assets/dishes/cupAndcake/bgCupCake.jpg')
        spanNode.textContent = coffeeShop.displayName;
        divCardNode.addEventListener('click', () => {
            btnCoffeeShopClick(coffeeShop.id);
        })


    }
}

function displayCoffeeShop(coffeeShop) {
    hideNode('coffeeShopCardsArea', true);
    hideNode('coffeeShopProductArea', false);

    //let divCoffeeShopNode = document.getElementById(coffeeShop.id);
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
        coffeeShop_stock_pictureNode.setAttribute('class', 'productImage');
        coffeeShop_stock_product_displayNameNode.setAttribute('class', 'productName');
        coffeeShop_stock_product_ingredientsNode.setAttribute('class', 'productIngredients');
        coffeeShop_stock_priceSellNode.setAttribute('class', 'productPrice');
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

function displayCaddyHeader(caddy) {
    /* Template
                <!--CADDY HEADER TITTLE-->
                    <div class="caddyHeader">
                    <img id="caddyBag" src="/client/assets/icons/caddyEmpty.png" alt="">
                    <h1>Caddy</h1>
                </div>
    */

    let caddyBagNode = document.getElementById('caddyBag');
    let totalItemsId = 'Empty';
    switch (caddy.totalItems) {
        case 0:
            totalItemsId = 'Empty';
            break;
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            totalItemsId = caddy.totalItems.toString();
            break;
        default:
            totalItemsId = '10';
            break;
    }
    caddyBagNode.setAttribute('src', `/client/assets/icons/caddy${totalItemsId}.png`)
}

function displayCaddyFooter(caddy) {
    /*Template
                 <!--CADDY FOOTER AMOUNT-->
                    <div class="caddyFooter">
                        <div id="amount">
                        <h2>Total:</h2><input type="text" id="taxBaseR" disabled=true>
                        <hr>
                        <h2>VAT 10%:</h2><input type="text" id="vatBaseR" disabled=true>
                        <hr>
                        <h2>TOTAL PRICE:</h2><input type="text" id="amountDue" disabled=true>
                         </div>
                        <button>Order!</button>
                    </div>
    */

    let taxBaseRNode = document.getElementById('taxBaseR');
    let vatBaseRNode = document.getElementById('vatBaseR');
    let amountDueNode = document.getElementById('amountDue');
    taxBaseRNode.value = `${caddy.taxBaseR.toFixed(2)} €`;
    amountDueNode.value = `${caddy.amountDue.toFixed(2)} €`;

    //el amount del vat no viene calculado! Se ha de calcular dinamicamente
    let vatBaseR = caddy.taxBaseR * caddy.percentageBaseR;
    vatBaseRNode.value = `${vatBaseR.toFixed(2)} €`;
}

function displayCaddyDetails(caddyBodyNode, docDetail) {
    /* Template
                      <div class="container">
                          <h3 id="itemCounter">1</h3>
                          <h3 id="union">X</h3>
                          <img id="itemImage" src="/client/assets/dishes/cupAndcake/carrotCupCake.png" alt="">
                          <input type="text" value="Carrot Cake" id="selectedItem" disabled="true">
                          <input type="text" value="10,00" id="selectedPrice" disabled="true">
                          <button id="removeOneItemFromCaddy">-</button>
                          <button id="removeSelectionFromCaddy">X</button>
                      </div>
    */

    let containerNode = document.createElement('div');
    let itemCounterNode = document.createElement('h3');
    let unionNode = document.createElement('h3');
    let imgNode = document.createElement('img');
    let inputTextNode = document.createElement('input');
    let inputPriceNode = document.createElement('input');
    let buttonAddOneNode = document.createElement('button');
    let buttonRemoveOneNode = document.createElement('button');
    let buttonRemoveSelectionNode = document.createElement('button');

    caddyBodyNode.appendChild(containerNode);
    containerNode.appendChild(itemCounterNode);
    containerNode.appendChild(unionNode);
    containerNode.appendChild(imgNode);
    containerNode.appendChild(inputTextNode);
    containerNode.appendChild(inputPriceNode);
    containerNode.appendChild(buttonAddOneNode);
    containerNode.appendChild(buttonRemoveOneNode);
    containerNode.appendChild(buttonRemoveSelectionNode);

    containerNode.setAttribute('class', 'container');
    itemCounterNode.setAttribute('id', 'itemCounter');
    unionNode.setAttribute('id', 'union');
    imgNode.setAttribute('id', 'itemImage');
    imgNode.setAttribute('src', `/client/assets/dishes${docDetail.product.pictureURL}`);
    inputTextNode.setAttribute('id', 'selectedItem');
    inputTextNode.setAttribute('disabled', true);
    inputPriceNode.setAttribute('id', 'selectedPrice');
    inputPriceNode.setAttribute('disabled', true);

    buttonAddOneNode.setAttribute('id', 'addOneItemFromCaddy');
    buttonAddOneNode.addEventListener('click', async () => {
        await addToCaddy(docDetail.productId, 1, docDetail.price);
    })
    buttonRemoveOneNode.setAttribute('id', 'removeOneItemFromCaddy');
    buttonRemoveOneNode.addEventListener('click', async () => {
        await removeFromCaddy(docDetail.productId, 1);
    })
    buttonRemoveSelectionNode.setAttribute('id', 'removeSelectionFromCaddy');
    buttonRemoveSelectionNode.addEventListener('click', async () => {
        await removeSelectionFromCaddy(docDetail.id);
    })
    buttonAddOneNode.textContent = '+';
    buttonRemoveOneNode.textContent = '-';
    buttonRemoveSelectionNode.textContent = 'X';
    itemCounterNode.textContent = docDetail.quantity;
    unionNode.textContent = "X";
    inputTextNode.value = docDetail.product.displayName;
    inputPriceNode.value = docDetail.price;
}


function displayCaddy(caddy) {
    /*Template
      <div class="caddy">
            
            <!--CADDY BODY ITEMS-->
            <div id="caddyBody" class="caddyBody">
                <h2>Your dishes list</h2>
                <div class="container">
                    <h3 id="itemCounter">1</h3>
                    <h3 id="union">X</h3>
                    <img id="itemImage" src="/client/assets/dishes/cupAndcake/carrotCupCake.png" alt="">
                    <input type="text" value="Carrot Cake" id="selectedItem" disabled=true>
                    <input type="text" value="10,00" id="selectedPrice" disabled=true>
                    <button id="removeOneItemFromCaddy">-</button>
                    <button id="removeSelectionFromCaddy">X</button>
                </div>
            </div>
        </div>
    */

    currentCaddy = caddy;

    hideNode('caddyArea', false);
    hideNode('orderArea', true);

    displayCaddyHeader(caddy);

    let caddyBodyNode = document.getElementById('caddyBody');
    caddyBodyNode.innerHTML = '<h2>Your dishes list</h2>';
    for (let docDetail of caddy.docDetails) {
        displayCaddyDetails(caddyBodyNode, docDetail);
    }
    displayCaddyFooter(caddy);
}

function displayOrder(order) {
    hideNode('caddyArea', true);
    hideNode('orderArea', false);
}

//#endregion

//#region Funcionalities of main.js

async function getCoffeeShops() {
    await refreshCoffeeShops(displayCoffeeShops.bind(this), displayErrors.bind(this));
}

async function getCoffeeShop(coffeeShopId) {
    await refreshCoffeeShop(coffeeShopId, displayCoffeeShop.bind(this), displayErrors.bind(this));
}

async function clearCaddy(coffeeShopId) {
    await newCaddy(coffeeShopId, displayCaddy.bind(this), displayErrors.bind(this));
}

async function getCaddy() {
    await askCaddy(currentCaddy.id, displayCaddy.bind(this), displayErrors.bind(this));
}

async function getOrder() {
    await askOrder(currentCaddy.id, displayOrder.bind(this), displayErrors.bind(this));
}

async function addToCaddy(productId, quantity, price) {
    await addProduct(currentCaddy.id, productId, quantity, price, displayCaddy.bind(this), displayErrors.bind(this));
}

async function removeFromCaddy(productId, quantity) {
    await removeProduct(currentCaddy.id, productId, quantity, displayCaddy.bind(this), displayErrors.bind(this));
}

async function removeSelectionFromCaddy(docDetailid) {
    await removeSelection(docDetailid, displayCaddy.bind(this), displayErrors.bind(this));
}
//#endregion


//#region ClickEvents
function btnRefreshAreasClick() {
    getCoffeeShops();
}

function btnCoffeeShopClick(id) {
    getCoffeeShop(id);
    clearCaddy(id);
}

function btnOrderClick(caddyId) {
    hideNode('caddyArea', true);
    hideNode('orderArea', false);
}

function backToCaddyClick(caddyId) {
    hideNode('caddyArea', false);
    hideNode('orderArea', true);
}

//#endregion


//#region InitApp
(function initApp() {
    hideNode('coffeeShopCardsArea', false);
    hideNode('coffeeShopProductArea', true);

    hideNode('caddyArea', false);
    hideNode('orderArea', true);

    let btnRefreshAreasNode = document.getElementById('mainCaddyTxt');
    btnRefreshAreasNode.addEventListener('click', btnRefreshAreasClick);
    let btnOrderNode = document.getElementById('btnOrder');
    btnOrderNode.addEventListener('click', btnOrderClick);
    let btnBackToCaddyNode = document.getElementById('btnBackToCaddy');
    btnBackToCaddyNode.addEventListener('click', backToCaddyClick);
    document.body.onload = btnRefreshAreasClick;
})();