import {MainMock} from './main.mock.js';
import Index from '../index.js';

class Context {
    constructor() {
        this.main = new MainMock();
        this.index = new Index(this.main);
    }
}

// test('should hide the orderAreaNodeNode & show caddyAreaNodeNode', () => {
//     let context = new Context();
//     let orderAreaNode = document.getElementById('orderArea');
//     let caddyAreaNode = document.getElementById('caddyArea');
//     console.log(caddyAreaNode);
//     console.log(orderAreaNode);
//     context.index.hideNode('orderArea', true);
//     expect(context.index.hideNode).toHaveBeenCalled();
//     context.index.hideNode('orderAreaNode', true);
//     context.index.hideNode('caddyAreaNode', false);
//     expect(orderAreaNode.style.display).toBe('none');
//     expect(caddyAreaNode.style.display).toBe('block');
// });

// test('displayErrors should return the error ocurred', (errors)=>{
//     let context = new Context();
//     let errorsAreaNode = document.getElementById('errorsArea');
//     displayErrors(errors);
//     expect(errorsAreaNode.innerHTML).toBe(JSON.stringify(errors));
// });

test('getCoffeeShops() should make a callBack to the clientAPI asking for the CoffeeShops', ()=>{
    //Hay que mockear la llamada a la API y los resultados que esta devuelve
});

test('getCoffeeShop() should make a callBack to the clientAPI asking for the CoffeeShopDetails', ()=>{
    //Hay que mockear la llamada a la API y los resultados que esta devuelve
});

test('clearCaddy() should make a callBack to the clientAPI asking for a new caddy', ()=>{
    //Hay que mockear la llamada a la API y los resultados que esta devuelve
});

test('getCaddy() should make a callBack to the clientAPI asking for the currentCaddy', ()=>{
    //Hay que mockear la llamada a la API y los resultados que esta devuelve
});

test('newOrder() should make a callBack to the clientAPI asking for closing the currentCaddy', ()=>{
    //Hay que mockear la llamada a la API y los resultados que esta devuelve
});

test('newOrder() should also display the OrderArea and hide the CaddyArea', ()=>{
    //Hay que mockear la llamada a la API y los resultados que esta devuelve
});

test('addToCaddy() should make a callBack to the clientAPI to add the selected product to the caddy', ()=>{
    //Hay que mockear la llamada a la API y los resultados que esta devuelve
});

test('addToCaddy() should make a callBack to the clientAPI to calculate the new totals', ()=>{
    //Hay que mockear la llamada a la API y los resultados que esta devuelve
});

test('addToCaddy() should make a callBack to the clientAPI to change the caddyImage number', ()=>{
    //Hay que mockear la llamada a la API y los resultados que esta devuelve
});

test('removeFromCaddy() should make a callBack to the clientAPI to take out only 1 item from the Caddy', ()=>{
    //Hay que mockear la llamada a la API y los resultados que esta devuelve
});

test('removeSelectionFromCaddy() should make a callBack to the clientAPI to take out the docDetails', ()=>{
    //Hay que mockear la llamada a la API y los resultados que esta devuelve
});


//#region ClickEvents

    //Need a b2b program to make these tests

//#endregion

test('initApp() should display CoffeeShopsArea and hide CoffeeShopProductArea', ()=>{
    //Hay que mockear la llamada a la API y los resultados que esta devuelve
});

test('initApp() should display caddyArea and hide orderArea', ()=>{
    //Hay que mockear la llamada a la API y los resultados que esta devuelve
});

test('initApp() should onclick btnRefreshAreasNode call the ClientAPI for the CallBack.btnRefreshAreasClick to be called', ()=>{
    //Hay que mockear la llamada a la API y los resultados que esta devuelve
});