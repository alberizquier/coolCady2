function postAjax(url, data) {
    // return a new promise. 
    return new Promise(function (resolve, reject) {
        // do the usual XHR stuff 
        var req = new XMLHttpRequest();
        req.open('post', url);
        //NOW WE TELL THE SERVER WHAT FORMAT OF POST REQUEST WE ARE MAKING 
        req.setRequestHeader('Content-Type', 'application/json');
        req.onload = function () {
            console.log('PostAjaxOnload()',req);
            if (req.status == 200) {
                resolve(req.response);
            } else {
                reject(Error(req.statusText));
            }
        };
        // handle network errors 
        req.onerror = function () {
            reject(Error("Network Error"));
        }; // make the request 
        req.send(data);
        //same thing if i hardcode like //req.send("limit=2"); 
    });
};

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
            var response = await postAjax(`${this.uri}/caddy/${coffeeShopId}`,null);
            var dataJson = JSON.parse(response);
            return dataJson;
        } catch (error) {
            errors.push(error.message);
        }
        return null;
    }

    async askCaddy(caddyId,errors){
        try {
            var response = await fetch(`${this.uri}/docheaders/${caddyId}/full`);
            var dataJson = await response.json();
            return dataJson;
        } catch (error) {
            errors.push(error.message);
        }
        return null;
    }

    async addProduct(caddyId,productId,quantity,price,errors){
        try {
      
           var data = {
            docHeaderId:caddyId,
            productId:productId,
            quantity:quantity,
            price:price,
            percentageDiscount:0,
            vatKind: "R",
            title : "",
            remarks:""
           };
            var response = await postAjax(`${this.uri}/caddy/product/${caddyId}`,JSON.stringify(data));
            var dataJson = JSON.parse(response);
            return dataJson;
        } catch (error) {
            errors.push(error.message);
        }
        return null;
    }
}


