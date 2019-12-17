
export class ClientAPI {
    constructor(hostName, portNumber, apiPath) {
        this.hostName = hostName;
        this.portNumber = portNumber;
        this.apiPath = apiPath;
    }

    get uri() {
        return `http://${this.hostName}:${this.portNumber}/${this.apiPath}`;
    }

    async getCoffeeShops(errors) {
        try {
            var response = await fetch(`${this.uri}/coffeeshops`);
            var dataJson = await response.json();
            return dataJson;
        } catch (error) {
            errors.push(error.message);
        }
        return null;
    }

    async getOneCoffeeShop(coffeeShopId, errors) {
        try {
            var response = await fetch(`${this.uri}/coffeeshops/${coffeeShopId}/full`);
            var dataJson = await response.json();
            return dataJson;
        } catch (error) {
            errors.push(error.message);
        }
        return null;
    }

    async newCaddy(coffeeShopId, errors) {
        try {
            var fetchParams = {
                method: 'POST', 
                body: null, 
                headers:{
                  'Content-Type': 'application/json'
                }
            };
            var response = await fetch(`${this.uri}/caddy/${coffeeShopId}`, fetchParams);
            var dataJson = await response.json();
            return dataJson;
        } catch (error) {
            errors.push(error.message);
        }
        return null;
    }

    async closeCaddy(caddyId, errors){
        try {
            var fetchParams = {
                method: 'POST', 
                body: null, 
                headers:{
                  'Content-Type': 'application/json'
                }
            };
            var response = await fetch(`${this.uri}/caddy/${caddyId}/close`, fetchParams);
            var dataJson = await response.json();
            return dataJson;
        } catch (error) {
            errors.push(error.message);
        }
        return null;
    }

    async addProduct(caddyId, productId, quantity, price, errors) {
        try {
            var data = {
                docHeaderId: caddyId,
                productId: productId,
                quantity: quantity,
                price: price,
                percentageDiscount: 0,
                vatKind: "R",
                title: "",
                remarks: ""
            };
            var fetchParams = {
                method: 'POST', 
                body: JSON.stringify(data), 
                headers:{
                  'Content-Type': 'application/json'
                }
            };
            var response = await fetch(`${this.uri}/caddy/product/${caddyId}`, fetchParams);
            var dataJson = await response.json();
            return dataJson;
        } catch (error) {
            errors.push(error.message);
        }
        return null;
    }

    async removeProduct(caddyId, productId,quantity,errors) {
        try {
            //object to be included in the body request before json.stringify();
            var data = {
                docHeaderId: caddyId,
                productId: productId,
                quantity: quantity,
                price: 0,
                percentageDiscount: 0,
                vatKind: "R",
                title: "",
                remarks: ""
            };
            var fetchParams = {
                method: 'DELETE', 
                body: JSON.stringify(data), 
                headers:{
                  'Content-Type': 'application/json'
                }
            };
            //call to fetch(Endpoint, fetchParams);
            var response = await fetch(`${this.uri}/caddy/product/${caddyId}`,fetchParams);
            var dataJson = await response.json();
            return dataJson;
        } catch (error) {
            errors.push(error.message);
        }
        return null;
    }

    async removeSelection (docDetailid, errors){
        try {
            //object to be included in the body request before json.stringify();
            
            var fetchParams = {
                method: 'DELETE', 
                body: null, 
                headers:{
                  'Content-Type': 'application/json'
                }
            };
            //call to fetch(Endpoint, fetchParams);
            var response = await fetch(`${this.uri}/caddy/selection/${docDetailid}`,fetchParams);
            var dataJson = await response.json();
            return dataJson;
        } catch (error) {
            errors.push(error.message);
        }
        return null;
    }
}