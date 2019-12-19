class CaddyMock {
    constructor() {
        var caddyMock = {
            "$type": "FullDocHeaderDTO",
            "id": "5df3c0b49ef50f1c0eda6e9e",
            "rowVersion": 3,
            "year": 2019,
            "docNumber": 1,
            "coffeeShopId": "5df167a143121e1f7c2c9756",
            "docDate": "2019-12-13T16:47:48.961Z",
            "sellerId": "gus",
            "clientId": "alber",
            "paymentMethod": "cash",
            "paymentDoc": "",
            "paymentAuth": "",
            "docKind": "",
            "docState": "open",
            "taxBaseS": 0,
            "taxBaseR": 10.5,
            "taxBaseN": 0,
            "percentageBaseS": 0.07,
            "percentageBaseR": 0.1,
            "percentageBaseN": 0.21,
            "percentageDiscount": 0,
            "amountDue": 11.55,
            "amountPayed": 0,
            "totalItems": 0,
            "docDetails": [],
            "coffeeShop": {}
        }
        for (let field in caddyMock) {
            this[field] = caddyMock[field];
        }
        this.docDetails = [];
        this.coffeeShop = {};
    }
}

export {CaddyMock};