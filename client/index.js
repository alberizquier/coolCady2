import {
    Main
} from './main.js';

import {
    MainMock
} from './tests/main.mock.js';
import { ClientAPIMock } from './tests/ClientAPI.mock.js';
import { ClientAPI } from './RestAPI/ClientAPI.js';



var currentCaddy = null;

export default class Index {
    constructor(main) {
        if (!main) {
            main = new Main(new ClientAPI('localhost', '3000', 'api'));
        }
        this.main = main;
        this.initApp();
    }

    //#region Errors
    displayErrors(errors) {
        let errorsAreaNode = document.getElementById('errorsArea');
        errorsAreaNode.innerHTML = JSON.stringify(errors);
    }

    //#endregion

    //#region AuxFuntions
    hideNode(nameNode, hidden) {
        let node = document.getElementById(nameNode);
        if (hidden) {
            node.style.display = "none";
        } else {
            node.style.display = "block";
        }
    }
    //#endregion

    //#region DisplayModels
    displayCoffeeShops(coffeeShops) {
        /*Template
         <div class="card" style="background-image: url("client/assets/cafetLogos/bgCupCake.jpg") ">
                 <div class="black">
                     <img src="client/assets/cafetLogos/Cup&cake.png"><br>
                     Cup & Cake
                 </div>
             </div>
         */
        debugger;
        this.hideNode('coffeeShopCardsArea', false);
        this.hideNode('coffeeShopProductArea', true);

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
            divCardNode.style.backgroundImage = `url("/client/assets/cafetLogos/${coffeeShop.backgroundPictureURL}")`;
            divCardNode.style.backgroundPosition = "center";
            divCardNode.style.backgroundSize = "cover";

            divBlackNode.setAttribute('class', 'black');
            imgNode.setAttribute('src', `/client/assets/cafetLogos/${coffeeShop.logoURL}`);
            spanNode.textContent = coffeeShop.displayName;
            spanNode.title = coffeeShop.description;
            divCardNode.addEventListener('click', () => {
                this.btnCoffeeShopClick(coffeeShop.id);
            })
        }
    }

    displayCoffeeShop(coffeeShop) {
        /*Template
                    <div id="coffeeShopProductArea" class="container coffeeShopProductArea">
                        <div class="white">
                                <div class="coffeeShopHeader" id="coffeeShopHeader">
                                <h2 id="coffeeShop_name"></h2>
                            </div>
                        <div class="coffeeShopBody" id="coffeeShopBody">
                        <div id="coffeeShopBodyCardContainer" class="coffeeShopBodyCardContainer">
                            <div class="coffeeShopBodyCardBlack" id="coffeeShopBodyCardBlack"> 
                                <h2>Product.name</h2> 
                                <h4>Product.ingredients</h4>
                                <h5>Product.price</h5>
                                <button>+</button>
                            </div>
                        </div>
                        </div>
                        <div class="coffeeShopFooter" id="coffeeShopFooter">
                            <h2>delivery time: 30 minutes!</h2>
                        </div>
                        </div>
                    </div>
        */
        this.hideNode('coffeeShopCardsArea', true);
        this.hideNode('coffeeShopProductArea', false);

        let coffeeShop_nameNode = document.getElementById('coffeeShop_name');
        let coffeeShopBodyNode = document.getElementById('coffeeShopBody');
        coffeeShop_nameNode.textContent = coffeeShop.displayName;

        coffeeShopBodyNode.innerHTML = "";
        for (let stock of coffeeShop.stocks) {
            let coffeeShop_stockNode = document.createElement('div');
            let coffeeShop_stock_black = document.createElement('div');
            let coffeeShop_stock_product_displayNameNode = document.createElement('h2');
            let coffeeShop_stock_product_ingredientsNode = document.createElement('h4');
            let coffeeShop_stock_priceSellNode = document.createElement('h5');
            let btnAddToCaddyNode = document.createElement('button');

            coffeeShopBodyNode.appendChild(coffeeShop_stockNode);
            coffeeShop_stockNode.appendChild(coffeeShop_stock_black);
            coffeeShop_stock_black.appendChild(coffeeShop_stock_product_displayNameNode);
            coffeeShop_stock_black.appendChild(coffeeShop_stock_product_ingredientsNode);
            coffeeShop_stock_black.appendChild(coffeeShop_stock_priceSellNode);
            coffeeShop_stock_black.appendChild(btnAddToCaddyNode);

            coffeeShop_stockNode.setAttribute('class', 'coffeeShopBodyCardContainer');
            coffeeShop_stockNode.setAttribute('id', 'coffeeShopBodyCardContainer');
            coffeeShop_stockNode.setAttribute('style', `background-image: url("/client/assets/dishes${stock.product.pictureURL}")`)
            coffeeShop_stock_black.setAttribute('class', 'coffeeShopBodyCardBlack');
            coffeeShop_stock_black.setAttribute('id', 'coffeeShopBodyCardBlack');
            coffeeShop_stock_product_displayNameNode.setAttribute('class', 'productName');
            coffeeShop_stock_product_ingredientsNode.setAttribute('class', 'productIngredients');
            coffeeShop_stock_priceSellNode.setAttribute('class', 'productPrice');
            btnAddToCaddyNode.stock = stock;
            btnAddToCaddyNode.addEventListener('click', async () => {
                await this.addToCaddy(stock.productId, 1, stock.priceSell);
            });

            coffeeShop_stock_product_displayNameNode.textContent = stock.product.displayName;
            coffeeShop_stock_product_ingredientsNode.textContent = stock.product.ingredients;
            coffeeShop_stock_priceSellNode.textContent = stock.priceSell.toFixed(2) + ' €';
            btnAddToCaddyNode.textContent = '+';
        }

    }

    displayCaddyHeader(caddy) {
        /* Template
                    <!--CADDY HEADER TITTLE-->
                    <div class="caddyHeader">
                        <div style=" display: inline-block; width: 84%;">
                        <h1 id="mainCaddyTxt">Caddy</h1>
                        </div>
                        <img id="caddyBag" src="/client/assets/icons/caddyEmpty.png" alt="">
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
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 23:
            case 24:
            case 25:
            case 26:
            case 27:
            case 28:
            case 29:
            case 30:
                totalItemsId = caddy.totalItems.toString();
                break;
            default:
                totalItemsId = '10';
                break;
        }
        caddyBagNode.setAttribute('src', `/client/assets/icons/caddy${totalItemsId}.png`)
    }

    displayCaddyDetails(caddyBodyNode, docDetail) {
        /* Template
                          <div class="container">
                              <h3 id="itemCounter">1</h3>
                              <h3 id="union">X</h3>
                              <img id="itemImage" src="/client/assets/dishes/cupAndcake/carrotCupCake.png" alt="">
                              <input type="text" value="Carrot Cake" id="selectedItem" disabled="true">
                              <input type="text" value="10,00" id="selectedPrice" disabled="true">
                              <button id="removeOneItemFromCaddy">-</button>
                              <button id="removeSelectionFromCaddy">X</button>
                              <button id="addOneItemFromCaddy">+</button>
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
            await this.addToCaddy(docDetail.productId, 1, docDetail.price);
        })
        buttonRemoveOneNode.setAttribute('id', 'removeOneItemFromCaddy');
        buttonRemoveOneNode.addEventListener('click', async () => {
            await this.removeFromCaddy(docDetail.productId, 1);
        })
        buttonRemoveSelectionNode.setAttribute('id', 'removeSelectionFromCaddy');
        buttonRemoveSelectionNode.addEventListener('click', async () => {
            await this.removeSelectionFromCaddy(docDetail.id);
        })
        buttonAddOneNode.textContent = '+';
        buttonRemoveOneNode.textContent = '-';
        buttonRemoveSelectionNode.textContent = 'X';
        itemCounterNode.textContent = docDetail.quantity;
        unionNode.textContent = "X";
        inputTextNode.value = docDetail.product.displayName;
        inputPriceNode.value = docDetail.price;
    }

    displayCaddyFooter(caddy) {
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

        //el amount del vat ha de venir dado por el server
        let vatBaseR = caddy.taxBaseR * caddy.percentageBaseR;
        vatBaseRNode.value = `${vatBaseR.toFixed(2)} €`;
    }

    displayCaddy(caddy) {
        /*Template
          <div id ="caddy" class="caddy">
                
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

        this.hideNode('caddyArea', false);
        this.hideNode('orderArea', true);
        this.hideNode('btnOrder', false);


        this.displayCaddyHeader(caddy);

        let caddyBodyNode = document.getElementById('caddyBody');
        caddyBodyNode.setAttribute('class', 'caddyBody');
        caddyBodyNode.innerHTML = '<h2>Your dishes list</h2>';
        for (let docDetail of caddy.docDetails) {
            this.displayCaddyDetails(caddyBodyNode, docDetail);
        }
        this.displayCaddyFooter(caddy);
    }

    displayOrder(order) {
        let orderAmountDueNode = document.getElementById('orderAmountDue');
        this.hideNode('caddyArea', true);
        this.hideNode('orderArea', false);
        orderAmountDueNode.textContent = order.amountDue.toFixed(2) + ' €';

    }

    //#endregion

    //#region Funcionalities of main.js

    async getCoffeeShops() {
        await this.main.refreshCoffeeShops(this.displayCoffeeShops.bind(this), this.displayErrors.bind(this));
    }

    async getCoffeeShop(coffeeShopId) {
        debugger;
        await this.main.refreshCoffeeShop(coffeeShopId, this.displayCoffeeShop.bind(this), this.displayErrors.bind(this));
    }

    async clearCaddy(coffeeShopId) {
        await this.main.newCaddy(coffeeShopId, this.displayCaddy.bind(this), this.displayErrors.bind(this));
    }

    async getCaddy() {
        await this.main.askCaddy(currentCaddy.id, this.displayCaddy.bind(this), this.displayErrors.bind(this));
    }

    async newOrder() {
        await this.main.closeCaddy(currentCaddy.id, this.displayOrder.bind(this), this.displayErrors.bind(this));
    }

    async getOrder() {
        await this.main.askOrder(currentCaddy.id, this.displayOrder.bind(this), this.displayErrors.bind(this));
    }

    async addToCaddy(productId, quantity, price) {
        debugger;
        await this.main.addProduct(currentCaddy.id, productId, quantity, price, this.displayCaddy.bind(this), this.displayErrors.bind(this));
    }

    async removeFromCaddy(productId, quantity) {
        await this.main.removeProduct(currentCaddy.id, productId, quantity, this.displayCaddy.bind(this), this.displayErrors.bind(this));
    }

    async removeSelectionFromCaddy(docDetailId) {
        await this.main.removeSelection(docDetailId, this.displayCaddy.bind(this), this.displayErrors.bind(this));
    }
    //#endregion

    //#region ClickEvents
    btnRefreshAreasClick() {
        this.getCoffeeShops();
    }

    btnCoffeeShopClick(id) {
        this.getCoffeeShop(id);
        this.clearCaddy(id);
    }

    backToCaddyClick(caddyId) {
        this.hideNode('caddyArea', false);
        this.hideNode('orderArea', true);
    }

    //#endregion

    //#region InitApp
    initApp() {
        //Oculto y enseño las views; Zona de coffeeShops y de caddy visibles; zona de order y de coffeeShop ocultas.
        this.hideNode('coffeeShopCardsArea', false);
        this.hideNode('coffeeShopProductArea', true);

        this.hideNode('caddyArea', false);
        this.hideNode('orderArea', true);
        //Hasta que no haya un caddy disponible no muestro el boton de cerrar caddy (order);
        this.hideNode('btnOrder', true);

        //asocio a los botones estaticos sus Events(clicks);
        //btnRefreshAreasNode
        let btnRefreshAreasNode = document.getElementById('mainCaddyTxt');
        btnRefreshAreasNode.addEventListener('click', this.btnRefreshAreasClick.bind(this));
        //btnOrderNode
        let btnOrderNode = document.getElementById('btnOrder');
        btnOrderNode.addEventListener('click', async () => {
            await this.newOrder();
        });
        let btnBackToCaddyNode = document.getElementById('btnBackToCaddy');
        btnBackToCaddyNode.addEventListener('click', this.backToCaddyClick.bind(this));
        //ejecuto directamente al inicio la carga de todos los CoffeeShops
        document.body.onload = this.btnRefreshAreasClick.bind(this);
    };

}
//#endregion

//To use app without db
//var index = new Index(new Main(new ClientAPIMock('localhost', '3000', 'api')));
//To use app with db
 var index = new Index(new Main(new ClientAPI('localhost', '3000', 'api')));

 