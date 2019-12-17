//#region Data
var coffeeShopsMock = [{
        "$type": "CoffeeShopDTO",
        "id": "5df167a143121e1f7c2c9756",
        "rowVersion": 0,
        "name": "Satans Coffee Corner",
        "displayName": "Satans Coffee Corner",
        "address": "",
        "backgroundPictureURL": "bgSatans.jpg",
        "logoURL": "SatansCoffeCorner.png",
        "description": "Barcelona's original specialty coffee shop: Hellishly good coffee, snacks, drinks and merch with a punk spirit since 2012."
    },
    {
        "$type": "CoffeeShopDTO",
        "id": "5df167a143121e1f7c2c9764",
        "rowVersion": 0,
        "name": "Nomad",
        "displayName": "Nomad",
        "address": "",
        "backgroundPictureURL": "bgNomad.jpg",
        "logoURL": "NomadCoffee.png",
        "description": "Dynamic coffee company. We Toast, we serve ,we distribute, we form, we play, we tried and we advise"
    },
    {
        "$type": "CoffeeShopDTO",
        "id": "5df167a143121e1f7c2c9773",
        "rowVersion": 0,
        "name": "Hola Coffee",
        "displayName": "Hola Coffee",
        "address": "",
        "backgroundPictureURL": "bgHolaCoffee.jpg",
        "logoURL": "HolaCoffee.png",
        "description": "Our cafeteria was born as a need to put into practice everything experienced in recent years and as a way to better explain our ideas and coffees. We want to bring specialty coffee in a friendly and democratic way, while maintaining very high standards behind the bar."
    },
    {
        "$type": "CoffeeShopDTO",
        "id": "5df167a143121e1f7c2c9783",
        "rowVersion": 0,
        "name": "Cup & Cake",
        "displayName": "Cup & Cake",
        "address": "",
        "backgroundPictureURL": "bgCupAndCake.jpg",
        "logoURL": "CupAndCake.png",
        "description": "We are passionate about simple things made with the utmost love and with the best products available. An extension of my way of understanding life. Our stores are places where people perceive quality and honesty. There are few things in life more beautiful than sharing a good meal in a beautiful environment. I would love to share my passion with as many people as possible."
    }
];

var fullCoffeeShopsMock = [{
        "$type": "FullCoffeeShopDTO",
        "id": "5df167a143121e1f7c2c9756",
        "rowVersion": 0,
        "name": "Satans Coffee Corner",
        "displayName": "Satans Coffee Corner",
        "address": "",
        "backgroundPictureURL": "bgSatans.jpg",
        "logoURL": "SatansCoffeCorner.png",
        "description": "Barcelona's original specialty coffee shop: Hellishly good coffee, snacks, drinks and merch with a punk spirit since 2012.",
        "stocks": [{
                "$type": "FullStockDTO",
                "id": "5df167a143121e1f7c2c9759",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9756",
                "productId": "5df167a143121e1f7c2c9757",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 3.5,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a143121e1f7c2c9757",
                    "rowVersion": 0,
                    "name": "Cold Brew",
                    "displayName": "Cold Brew",
                    "kind": "Coffee",
                    "subKind": "SIMBI - RUANDA",
                    "ingredients": "coffee",
                    "priceCost": 5,
                    "vatKind": "R",
                    "remarks": "tangerine, apricot, orange blossom, honey flower",
                    "pictureURL": "/holaCoffee/coldBrew.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9756",
                    "rowVersion": 0,
                    "name": "Satans Coffee Corner",
                    "displayName": "Satans Coffee Corner",
                    "address": "",
                    "backgroundPictureURL": "bgSatans.jpg",
                    "logoURL": "SatansCoffeCorner.png",
                    "description": "Barcelona's original specialty coffee shop: Hellishly good coffee, snacks, drinks and merch with a punk spirit since 2012."
                }
            },
            {
                "$type": "FullStockDTO",
                "id": "5df167a143121e1f7c2c975c",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9756",
                "productId": "5df167a143121e1f7c2c975a",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 3,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a143121e1f7c2c975a",
                    "rowVersion": 0,
                    "name": "Flat White",
                    "displayName": "Flat White",
                    "kind": "Coffee",
                    "subKind": "MUJERES DE HICHOZAL - HONDURAS",
                    "ingredients": "coffee",
                    "priceCost": 4.5,
                    "vatKind": "R",
                    "remarks": "Kiwi, Passion Fruit, Lima",
                    "pictureURL": "/holaCoffee/flatWhite.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9756",
                    "rowVersion": 0,
                    "name": "Satans Coffee Corner",
                    "displayName": "Satans Coffee Corner",
                    "address": "",
                    "backgroundPictureURL": "bgSatans.jpg",
                    "logoURL": "SatansCoffeCorner.png",
                    "description": "Barcelona's original specialty coffee shop: Hellishly good coffee, snacks, drinks and merch with a punk spirit since 2012."
                }
            },
            {
                "$type": "FullStockDTO",
                "id": "5df167a143121e1f7c2c975f",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9756",
                "productId": "5df167a143121e1f7c2c975d",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 7,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a143121e1f7c2c975d",
                    "rowVersion": 0,
                    "name": "Kombucha",
                    "displayName": "Kombucha",
                    "kind": "food",
                    "subKind": "",
                    "ingredients": "cookies, cream, lemon, sugar, jelly, butter, flowers",
                    "priceCost": 7,
                    "vatKind": "R",
                    "pictureURL": "/satans/kombucha.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9756",
                    "rowVersion": 0,
                    "name": "Satans Coffee Corner",
                    "displayName": "Satans Coffee Corner",
                    "address": "",
                    "backgroundPictureURL": "bgSatans.jpg",
                    "logoURL": "SatansCoffeCorner.png",
                    "description": "Barcelona's original specialty coffee shop: Hellishly good coffee, snacks, drinks and merch with a punk spirit since 2012."
                }
            },
            {
                "$type": "FullStockDTO",
                "id": "5df167a143121e1f7c2c9761",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9756",
                "productId": "5df167a143121e1f7c2c9760",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 14,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a143121e1f7c2c9760",
                    "rowVersion": 0,
                    "name": "omelette",
                    "displayName": "omelette",
                    "kind": "food",
                    "subKind": "",
                    "ingredients": "omelette filled with white rice and tomato sauce, topped with sour cream",
                    "priceCost": 14,
                    "vatKind": "R",
                    "pictureURL": "/satans/omelette.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9756",
                    "rowVersion": 0,
                    "name": "Satans Coffee Corner",
                    "displayName": "Satans Coffee Corner",
                    "address": "",
                    "backgroundPictureURL": "bgSatans.jpg",
                    "logoURL": "SatansCoffeCorner.png",
                    "description": "Barcelona's original specialty coffee shop: Hellishly good coffee, snacks, drinks and merch with a punk spirit since 2012."
                }
            },
            {
                "$type": "FullStockDTO",
                "id": "5df167a143121e1f7c2c9763",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9756",
                "productId": "5df167a143121e1f7c2c9762",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 12,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a143121e1f7c2c9762",
                    "rowVersion": 0,
                    "name": "sandwich",
                    "displayName": "sandwich",
                    "kind": "food",
                    "subKind": "",
                    "ingredients": "Duck rillette sandwich with pickles and a 7' egg",
                    "priceCost": 20,
                    "vatKind": "R",
                    "pictureURL": "/satans/waffles.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9756",
                    "rowVersion": 0,
                    "name": "Satans Coffee Corner",
                    "displayName": "Satans Coffee Corner",
                    "address": "",
                    "backgroundPictureURL": "bgSatans.jpg",
                    "logoURL": "SatansCoffeCorner.png",
                    "description": "Barcelona's original specialty coffee shop: Hellishly good coffee, snacks, drinks and merch with a punk spirit since 2012."
                }
            }
        ]
    },
    {
        "$type": "FullCoffeeShopDTO",
        "id": "5df167a143121e1f7c2c9764",
        "rowVersion": 0,
        "name": "Nomad",
        "displayName": "Nomad",
        "address": "",
        "backgroundPictureURL": "bgNomad.jpg",
        "logoURL": "NomadCoffee.png",
        "description": "Dynamic coffee company. We Toast, we serve ,we distribute, we form, we play, we tried and we advise",
        "stocks": [{
                "$type": "FullStockDTO",
                "id": "5df167a143121e1f7c2c9766",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9764",
                "productId": "5df167a143121e1f7c2c9757",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 4,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a143121e1f7c2c9757",
                    "rowVersion": 0,
                    "name": "Cold Brew",
                    "displayName": "Cold Brew",
                    "kind": "Coffee",
                    "subKind": "SIMBI - RUANDA",
                    "ingredients": "coffee",
                    "priceCost": 5,
                    "vatKind": "R",
                    "remarks": "tangerine, apricot, orange blossom, honey flower",
                    "pictureURL": "/holaCoffee/coldBrew.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9764",
                    "rowVersion": 0,
                    "name": "Nomad",
                    "displayName": "Nomad",
                    "address": "",
                    "backgroundPictureURL": "bgNomad.jpg",
                    "logoURL": "NomadCoffee.png",
                    "description": "Dynamic coffee company. We Toast, we serve ,we distribute, we form, we play, we tried and we advise"
                }
            },
            {
                "$type": "FullStockDTO",
                "id": "5df167a143121e1f7c2c9768",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9764",
                "productId": "5df167a143121e1f7c2c9767",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 12,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a143121e1f7c2c9767",
                    "rowVersion": 0,
                    "name": "English Toast",
                    "displayName": "English Toast",
                    "kind": "food",
                    "subKind": "",
                    "ingredients": "A toasted slice of bread with a soft butter with fine herbs and orange marmalade",
                    "priceCost": 12,
                    "vatKind": "R",
                    "pictureURL": "/nomad/englishToast.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9764",
                    "rowVersion": 0,
                    "name": "Nomad",
                    "displayName": "Nomad",
                    "address": "",
                    "backgroundPictureURL": "bgNomad.jpg",
                    "logoURL": "NomadCoffee.png",
                    "description": "Dynamic coffee company. We Toast, we serve ,we distribute, we form, we play, we tried and we advise"
                }
            },
            {
                "$type": "FullStockDTO",
                "id": "5df167a143121e1f7c2c976a",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9764",
                "productId": "5df167a143121e1f7c2c9769",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 3,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a143121e1f7c2c9769",
                    "rowVersion": 0,
                    "name": "Ice Cream",
                    "displayName": "Ice Cream",
                    "kind": "food",
                    "subKind": "",
                    "ingredients": "Hand made vanilla ice cream with dark 90% chocolate inside",
                    "priceCost": 3,
                    "vatKind": "R",
                    "pictureURL": "/nomad/iceCream.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9764",
                    "rowVersion": 0,
                    "name": "Nomad",
                    "displayName": "Nomad",
                    "address": "",
                    "backgroundPictureURL": "bgNomad.jpg",
                    "logoURL": "NomadCoffee.png",
                    "description": "Dynamic coffee company. We Toast, we serve ,we distribute, we form, we play, we tried and we advise"
                }
            },
            {
                "$type": "FullStockDTO",
                "id": "5df167a143121e1f7c2c976d",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9764",
                "productId": "5df167a143121e1f7c2c976b",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 5,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a143121e1f7c2c976b",
                    "rowVersion": 0,
                    "name": "Pistacho Frappé",
                    "displayName": "Pistacho Frappé",
                    "kind": "drink",
                    "subKind": "",
                    "ingredients": "Iced pistacho frappé made at the moment with notes of JS vanilla",
                    "priceCost": 5,
                    "vatKind": "R",
                    "pictureURL": "/nomad/pistachoFrappe.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9764",
                    "rowVersion": 0,
                    "name": "Nomad",
                    "displayName": "Nomad",
                    "address": "",
                    "backgroundPictureURL": "bgNomad.jpg",
                    "logoURL": "NomadCoffee.png",
                    "description": "Dynamic coffee company. We Toast, we serve ,we distribute, we form, we play, we tried and we advise"
                }
            },
            {
                "$type": "FullStockDTO",
                "id": "5df167a143121e1f7c2c9770",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9764",
                "productId": "5df167a143121e1f7c2c976e",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 7,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a143121e1f7c2c976e",
                    "rowVersion": 0,
                    "name": "Shoot and Brownie",
                    "displayName": "Shoot and Brownie",
                    "kind": "coffee and food",
                    "subKind": "",
                    "ingredients": "Expresso shoot from desired coffee with a hand made brownie made with butter, dark 90% chocolate, flour and suggar",
                    "priceCost": 7,
                    "vatKind": "R",
                    "pictureURL": "/nomad/shootAndBrownie.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9764",
                    "rowVersion": 0,
                    "name": "Nomad",
                    "displayName": "Nomad",
                    "address": "",
                    "backgroundPictureURL": "bgNomad.jpg",
                    "logoURL": "NomadCoffee.png",
                    "description": "Dynamic coffee company. We Toast, we serve ,we distribute, we form, we play, we tried and we advise"
                }
            },
            {
                "$type": "FullStockDTO",
                "id": "5df167a143121e1f7c2c9772",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9764",
                "productId": "5df167a143121e1f7c2c9771",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 10,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a143121e1f7c2c9771",
                    "rowVersion": 0,
                    "name": "Txipirones",
                    "displayName": "Txipirones",
                    "kind": "food",
                    "subKind": "",
                    "ingredients": "Fresh daily squid, seasoned with rosemary and marinated with a teriyaki sauce",
                    "priceCost": 10,
                    "vatKind": "R",
                    "pictureURL": "/nomad/txipirones.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9764",
                    "rowVersion": 0,
                    "name": "Nomad",
                    "displayName": "Nomad",
                    "address": "",
                    "backgroundPictureURL": "bgNomad.jpg",
                    "logoURL": "NomadCoffee.png",
                    "description": "Dynamic coffee company. We Toast, we serve ,we distribute, we form, we play, we tried and we advise"
                }
            }
        ]
    },
    {
        "$type": "FullCoffeeShopDTO",
        "id": "5df167a143121e1f7c2c9773",
        "rowVersion": 0,
        "name": "Hola Coffee",
        "displayName": "Hola Coffee",
        "address": "",
        "backgroundPictureURL": "bgHolaCoffee.jpg",
        "logoURL": "HolaCoffee.png",
        "description": "Our cafeteria was born as a need to put into practice everything experienced in recent years and as a way to better explain our ideas and coffees. We want to bring specialty coffee in a friendly and democratic way, while maintaining very high standards behind the bar.",
        "stocks": [{
                "$type": "FullStockDTO",
                "id": "5df167a143121e1f7c2c9778",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9773",
                "productId": "5df167a143121e1f7c2c975a",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 4.5,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a143121e1f7c2c975a",
                    "rowVersion": 0,
                    "name": "Flat White",
                    "displayName": "Flat White",
                    "kind": "Coffee",
                    "subKind": "MUJERES DE HICHOZAL - HONDURAS",
                    "ingredients": "coffee",
                    "priceCost": 4.5,
                    "vatKind": "R",
                    "remarks": "Kiwi, Passion Fruit, Lima",
                    "pictureURL": "/holaCoffee/flatWhite.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9773",
                    "rowVersion": 0,
                    "name": "Hola Coffee",
                    "displayName": "Hola Coffee",
                    "address": "",
                    "backgroundPictureURL": "bgHolaCoffee.jpg",
                    "logoURL": "HolaCoffee.png",
                    "description": "Our cafeteria was born as a need to put into practice everything experienced in recent years and as a way to better explain our ideas and coffees. We want to bring specialty coffee in a friendly and democratic way, while maintaining very high standards behind the bar."
                }
            },
            {
                "$type": "FullStockDTO",
                "id": "5df167a143121e1f7c2c977a",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9773",
                "productId": "5df167a143121e1f7c2c9757",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 5,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a143121e1f7c2c9757",
                    "rowVersion": 0,
                    "name": "Cold Brew",
                    "displayName": "Cold Brew",
                    "kind": "Coffee",
                    "subKind": "SIMBI - RUANDA",
                    "ingredients": "coffee",
                    "priceCost": 5,
                    "vatKind": "R",
                    "remarks": "tangerine, apricot, orange blossom, honey flower",
                    "pictureURL": "/holaCoffee/coldBrew.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9773",
                    "rowVersion": 0,
                    "name": "Hola Coffee",
                    "displayName": "Hola Coffee",
                    "address": "",
                    "backgroundPictureURL": "bgHolaCoffee.jpg",
                    "logoURL": "HolaCoffee.png",
                    "description": "Our cafeteria was born as a need to put into practice everything experienced in recent years and as a way to better explain our ideas and coffees. We want to bring specialty coffee in a friendly and democratic way, while maintaining very high standards behind the bar."
                }
            },
            {
                "$type": "FullStockDTO",
                "id": "5df167a143121e1f7c2c977c",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9773",
                "productId": "5df167a143121e1f7c2c977b",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 11,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a143121e1f7c2c977b",
                    "rowVersion": 0,
                    "name": "Avocato Toast",
                    "displayName": "Avocato Toast",
                    "kind": "food",
                    "subKind": "",
                    "ingredients": "A toasted bimbo toast accompanied with an avocato basement, softly cutted radish, fresh blue cheese and green peas",
                    "priceCost": 11,
                    "vatKind": "R",
                    "pictureURL": "/holaCoffee/avocatoToast.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9773",
                    "rowVersion": 0,
                    "name": "Hola Coffee",
                    "displayName": "Hola Coffee",
                    "address": "",
                    "backgroundPictureURL": "bgHolaCoffee.jpg",
                    "logoURL": "HolaCoffee.png",
                    "description": "Our cafeteria was born as a need to put into practice everything experienced in recent years and as a way to better explain our ideas and coffees. We want to bring specialty coffee in a friendly and democratic way, while maintaining very high standards behind the bar."
                }
            },
            {
                "$type": "FullStockDTO",
                "id": "5df167a143121e1f7c2c977e",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9773",
                "productId": "5df167a143121e1f7c2c977d",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 6,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a143121e1f7c2c977d",
                    "rowVersion": 0,
                    "name": "Bagel",
                    "displayName": "Bagel",
                    "kind": "food",
                    "subKind": "",
                    "ingredients": "A review of the classic bagel ripened with canela, honey and 99% chocolate ",
                    "priceCost": 6,
                    "vatKind": "R",
                    "pictureURL": "/holaCoffee/bagel.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9773",
                    "rowVersion": 0,
                    "name": "Hola Coffee",
                    "displayName": "Hola Coffee",
                    "address": "",
                    "backgroundPictureURL": "bgHolaCoffee.jpg",
                    "logoURL": "HolaCoffee.png",
                    "description": "Our cafeteria was born as a need to put into practice everything experienced in recent years and as a way to better explain our ideas and coffees. We want to bring specialty coffee in a friendly and democratic way, while maintaining very high standards behind the bar."
                }
            },
            {
                "$type": "FullStockDTO",
                "id": "5df167a143121e1f7c2c9780",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9773",
                "productId": "5df167a143121e1f7c2c977f",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 7,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a143121e1f7c2c977f",
                    "rowVersion": 0,
                    "name": "Spinach Sandwich",
                    "displayName": "Spinach Sandwich",
                    "kind": "food",
                    "subKind": "",
                    "ingredients": "Hand made sandwich with spinaches for the iron, duck for the swiming and cheese for the gluttony",
                    "priceCost": 7,
                    "vatKind": "R",
                    "pictureURL": "/holaCoffee/spinachesSandwich.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9773",
                    "rowVersion": 0,
                    "name": "Hola Coffee",
                    "displayName": "Hola Coffee",
                    "address": "",
                    "backgroundPictureURL": "bgHolaCoffee.jpg",
                    "logoURL": "HolaCoffee.png",
                    "description": "Our cafeteria was born as a need to put into practice everything experienced in recent years and as a way to better explain our ideas and coffees. We want to bring specialty coffee in a friendly and democratic way, while maintaining very high standards behind the bar."
                }
            },
            {
                "$type": "FullStockDTO",
                "id": "5df167a143121e1f7c2c9782",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9773",
                "productId": "5df167a143121e1f7c2c9781",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 16,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a143121e1f7c2c9781",
                    "rowVersion": 0,
                    "name": "Bahn Mi",
                    "displayName": "Bahn Mi",
                    "kind": "food",
                    "subKind": "",
                    "ingredients": "Our new creation for vegan people and anyone else, a sandwich made with roasted potatoes, beet, romaine lettuce and a spicy garlic sauce",
                    "priceCost": 16,
                    "vatKind": "R",
                    "pictureURL": "/holaCoffee/veganBahnMi.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9773",
                    "rowVersion": 0,
                    "name": "Hola Coffee",
                    "displayName": "Hola Coffee",
                    "address": "",
                    "backgroundPictureURL": "bgHolaCoffee.jpg",
                    "logoURL": "HolaCoffee.png",
                    "description": "Our cafeteria was born as a need to put into practice everything experienced in recent years and as a way to better explain our ideas and coffees. We want to bring specialty coffee in a friendly and democratic way, while maintaining very high standards behind the bar."
                }
            }
        ]
    },
    {
        "$type": "FullCoffeeShopDTO",
        "id": "5df167a143121e1f7c2c9783",
        "rowVersion": 0,
        "name": "Cup & Cake",
        "displayName": "Cup & Cake",
        "address": "",
        "backgroundPictureURL": "bgCupAndCake.jpg",
        "logoURL": "CupAndCake.png",
        "description": "We are passionate about simple things made with the utmost love and with the best products available. An extension of my way of understanding life. Our stores are places where people perceive quality and honesty. There are few things in life more beautiful than sharing a good meal in a beautiful environment. I would love to share my passion with as many people as possible.",
        "stocks": [{
                "$type": "FullStockDTO",
                "id": "5df167a143121e1f7c2c9785",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9783",
                "productId": "5df167a143121e1f7c2c9784",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 3,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a143121e1f7c2c9784",
                    "rowVersion": 0,
                    "name": "Carrot CupCake",
                    "displayName": "Carrot CupCake",
                    "kind": "food",
                    "subKind": "",
                    "ingredients": "Flour, sugar, baking soda, powder, salt, cinnamon, nutmeg, eggs, vanilla extract, milk, carrots and cream cheese",
                    "priceCost": 3,
                    "vatKind": "R",
                    "pictureURL": "/cupAndcake/carrotCupCake.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9783",
                    "rowVersion": 0,
                    "name": "Cup & Cake",
                    "displayName": "Cup & Cake",
                    "address": "",
                    "backgroundPictureURL": "bgCupAndCake.jpg",
                    "logoURL": "CupAndCake.png",
                    "description": "We are passionate about simple things made with the utmost love and with the best products available. An extension of my way of understanding life. Our stores are places where people perceive quality and honesty. There are few things in life more beautiful than sharing a good meal in a beautiful environment. I would love to share my passion with as many people as possible."
                }
            },
            {
                "$type": "FullStockDTO",
                "id": "5df167a143121e1f7c2c9787",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9783",
                "productId": "5df167a143121e1f7c2c9786",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 3,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a143121e1f7c2c9786",
                    "rowVersion": 0,
                    "name": "Chocolate CupCake",
                    "displayName": "Chocolate CupCake",
                    "kind": "food",
                    "subKind": "",
                    "ingredients": "Flour, sugar, baking soda, powder, salt, eggs, vanilla extract, milk, 90% chocolate for topping",
                    "priceCost": 3,
                    "vatKind": "R",
                    "pictureURL": "/cupAndcake/chocolateCupCake.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9783",
                    "rowVersion": 0,
                    "name": "Cup & Cake",
                    "displayName": "Cup & Cake",
                    "address": "",
                    "backgroundPictureURL": "bgCupAndCake.jpg",
                    "logoURL": "CupAndCake.png",
                    "description": "We are passionate about simple things made with the utmost love and with the best products available. An extension of my way of understanding life. Our stores are places where people perceive quality and honesty. There are few things in life more beautiful than sharing a good meal in a beautiful environment. I would love to share my passion with as many people as possible."
                }
            },
            {
                "$type": "FullStockDTO",
                "id": "5df167a143121e1f7c2c9789",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9783",
                "productId": "5df167a143121e1f7c2c9788",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 3,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a143121e1f7c2c9788",
                    "rowVersion": 0,
                    "name": "Lemon CupCake",
                    "displayName": "Lemon CupCake",
                    "kind": "food",
                    "subKind": "",
                    "ingredients": "Flour, sugar, baking soda, powder, salt, eggs, vanilla extract, milk, lemon cream for topping",
                    "priceCost": 3,
                    "vatKind": "R",
                    "pictureURL": "/cupAndcake/lemonCupCake.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9783",
                    "rowVersion": 0,
                    "name": "Cup & Cake",
                    "displayName": "Cup & Cake",
                    "address": "",
                    "backgroundPictureURL": "bgCupAndCake.jpg",
                    "logoURL": "CupAndCake.png",
                    "description": "We are passionate about simple things made with the utmost love and with the best products available. An extension of my way of understanding life. Our stores are places where people perceive quality and honesty. There are few things in life more beautiful than sharing a good meal in a beautiful environment. I would love to share my passion with as many people as possible."
                }
            },
            {
                "$type": "FullStockDTO",
                "id": "5df167a243121e1f7c2c978b",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9783",
                "productId": "5df167a243121e1f7c2c978a",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 3,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a243121e1f7c2c978a",
                    "rowVersion": 0,
                    "name": "Matcha CupCake",
                    "displayName": "Matcha CupCake",
                    "kind": "food",
                    "subKind": "",
                    "ingredients": "Flour, sugar, baking soda, powder, salt, eggs, vanilla extract, milk, matcha for topping",
                    "priceCost": 3,
                    "vatKind": "R",
                    "pictureURL": "/cupAndcake/matchaCupCake.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9783",
                    "rowVersion": 0,
                    "name": "Cup & Cake",
                    "displayName": "Cup & Cake",
                    "address": "",
                    "backgroundPictureURL": "bgCupAndCake.jpg",
                    "logoURL": "CupAndCake.png",
                    "description": "We are passionate about simple things made with the utmost love and with the best products available. An extension of my way of understanding life. Our stores are places where people perceive quality and honesty. There are few things in life more beautiful than sharing a good meal in a beautiful environment. I would love to share my passion with as many people as possible."
                }
            },
            {
                "$type": "FullStockDTO",
                "id": "5df167a243121e1f7c2c978d",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9783",
                "productId": "5df167a243121e1f7c2c978c",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 3,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a243121e1f7c2c978c",
                    "rowVersion": 0,
                    "name": "Pistacho CupCake",
                    "displayName": "Pistacho CupCake",
                    "kind": "food",
                    "subKind": "",
                    "ingredients": "Flour, sugar, baking soda, powder, salt, eggs, vanilla extract, milk, pistacho cream for topping",
                    "priceCost": 3,
                    "vatKind": "R",
                    "pictureURL": "/cupAndcake/pistachoCupCake.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9783",
                    "rowVersion": 0,
                    "name": "Cup & Cake",
                    "displayName": "Cup & Cake",
                    "address": "",
                    "backgroundPictureURL": "bgCupAndCake.jpg",
                    "logoURL": "CupAndCake.png",
                    "description": "We are passionate about simple things made with the utmost love and with the best products available. An extension of my way of understanding life. Our stores are places where people perceive quality and honesty. There are few things in life more beautiful than sharing a good meal in a beautiful environment. I would love to share my passion with as many people as possible."
                }
            },
            {
                "$type": "FullStockDTO",
                "id": "5df167a243121e1f7c2c978f",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9783",
                "productId": "5df167a243121e1f7c2c978e",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 3,
                "product": {
                    "$type": "ProductDTO",
                    "id": "5df167a243121e1f7c2c978e",
                    "rowVersion": 0,
                    "name": "Beet CupCake",
                    "displayName": "Beet CupCake",
                    "kind": "food",
                    "subKind": "",
                    "ingredients": "Flour, sugar, baking soda, powder, salt, eggs, vanilla extract, milk, beet cream for topping",
                    "priceCost": 3,
                    "vatKind": "R",
                    "pictureURL": "/cupAndcake/remolachaCupCake.png"
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9783",
                    "rowVersion": 0,
                    "name": "Cup & Cake",
                    "displayName": "Cup & Cake",
                    "address": "",
                    "backgroundPictureURL": "bgCupAndCake.jpg",
                    "logoURL": "CupAndCake.png",
                    "description": "We are passionate about simple things made with the utmost love and with the best products available. An extension of my way of understanding life. Our stores are places where people perceive quality and honesty. There are few things in life more beautiful than sharing a good meal in a beautiful environment. I would love to share my passion with as many people as possible."
                }
            },
            {
                "$type": "FullStockDTO",
                "id": "5df167a243121e1f7c2c9791",
                "rowVersion": 0,
                "coffeeShopId": "5df167a143121e1f7c2c9783",
                "productId": "5df167a243121e1f7c2c9790",
                "quantityAcc": 0,
                "quantityCon": 0,
                "priceSell": 2,
                "product": {
                    "$type": "ProductDTO",
                    "id": "",
                    "rowVersion": 0,
                    "name": "",
                    "displayName": "Not found, 5df167a243121e1f7c2c9790",
                    "kind": "",
                    "subKind": "",
                    "ingredients": "",
                    "priceCost": 0,
                    "vatKind": "R",
                    "remarks": "",
                    "pictureURL": ""
                },
                "coffeeShop": {
                    "$type": "CoffeeShopDTO",
                    "id": "5df167a143121e1f7c2c9783",
                    "rowVersion": 0,
                    "name": "Cup & Cake",
                    "displayName": "Cup & Cake",
                    "address": "",
                    "backgroundPictureURL": "bgCupAndCake.jpg",
                    "logoURL": "CupAndCake.png",
                    "description": "We are passionate about simple things made with the utmost love and with the best products available. An extension of my way of understanding life. Our stores are places where people perceive quality and honesty. There are few things in life more beautiful than sharing a good meal in a beautiful environment. I would love to share my passion with as many people as possible."
                }
            }
        ]
    }
];

var productsMock = [{
        "$type": "ProductDTO",
        "id": "5df167a143121e1f7c2c9757",
        "rowVersion": 0,
        "name": "Cold Brew",
        "displayName": "Cold Brew",
        "kind": "Coffee",
        "subKind": "SIMBI - RUANDA",
        "ingredients": "coffee",
        "priceCost": 5,
        "vatKind": "R",
        "remarks": "tangerine, apricot, orange blossom, honey flower",
        "pictureURL": "/holaCoffee/coldBrew.png"
    },
    {
        "$type": "ProductDTO",
        "id": "5df167a143121e1f7c2c975a",
        "rowVersion": 0,
        "name": "Flat White",
        "displayName": "Flat White",
        "kind": "Coffee",
        "subKind": "MUJERES DE HICHOZAL - HONDURAS",
        "ingredients": "coffee",
        "priceCost": 4.5,
        "vatKind": "R",
        "remarks": "Kiwi, Passion Fruit, Lima",
        "pictureURL": "/holaCoffee/flatWhite.png"
    },
    {
        "$type": "ProductDTO",
        "id": "5df167a143121e1f7c2c975d",
        "rowVersion": 0,
        "name": "Kombucha",
        "displayName": "Kombucha",
        "kind": "food",
        "subKind": "",
        "ingredients": "cookies, cream, lemon, sugar, jelly, butter, flowers",
        "priceCost": 7,
        "vatKind": "R",
        "pictureURL": "/satans/kombucha.png"
    },
    {
        "$type": "ProductDTO",
        "id": "5df167a143121e1f7c2c9760",
        "rowVersion": 0,
        "name": "omelette",
        "displayName": "omelette",
        "kind": "food",
        "subKind": "",
        "ingredients": "omelette filled with white rice and tomato sauce, topped with sour cream",
        "priceCost": 14,
        "vatKind": "R",
        "pictureURL": "/satans/omelette.png"
    },
    {
        "$type": "ProductDTO",
        "id": "5df167a143121e1f7c2c9762",
        "rowVersion": 0,
        "name": "sandwich",
        "displayName": "sandwich",
        "kind": "food",
        "subKind": "",
        "ingredients": "Duck rillette sandwich with pickles and a 7' egg",
        "priceCost": 20,
        "vatKind": "R",
        "pictureURL": "/satans/waffles.png"
    },
    {
        "$type": "ProductDTO",
        "id": "5df167a143121e1f7c2c9767",
        "rowVersion": 0,
        "name": "English Toast",
        "displayName": "English Toast",
        "kind": "food",
        "subKind": "",
        "ingredients": "A toasted slice of bread with a soft butter with fine herbs and orange marmalade",
        "priceCost": 12,
        "vatKind": "R",
        "pictureURL": "/nomad/englishToast.png"
    },
    {
        "$type": "ProductDTO",
        "id": "5df167a143121e1f7c2c9769",
        "rowVersion": 0,
        "name": "Ice Cream",
        "displayName": "Ice Cream",
        "kind": "food",
        "subKind": "",
        "ingredients": "Hand made vanilla ice cream with dark 90% chocolate inside",
        "priceCost": 3,
        "vatKind": "R",
        "pictureURL": "/nomad/iceCream.png"
    },
    {
        "$type": "ProductDTO",
        "id": "5df167a143121e1f7c2c976b",
        "rowVersion": 0,
        "name": "Pistacho Frappé",
        "displayName": "Pistacho Frappé",
        "kind": "drink",
        "subKind": "",
        "ingredients": "Iced pistacho frappé made at the moment with notes of JS vanilla",
        "priceCost": 5,
        "vatKind": "R",
        "pictureURL": "/nomad/pistachoFrappe.png"
    },
    {
        "$type": "ProductDTO",
        "id": "5df167a143121e1f7c2c976e",
        "rowVersion": 0,
        "name": "Shoot and Brownie",
        "displayName": "Shoot and Brownie",
        "kind": "coffee and food",
        "subKind": "",
        "ingredients": "Expresso shoot from desired coffee with a hand made brownie made with butter, dark 90% chocolate, flour and suggar",
        "priceCost": 7,
        "vatKind": "R",
        "pictureURL": "/nomad/shootAndBrownie.png"
    },
    {
        "$type": "ProductDTO",
        "id": "5df167a143121e1f7c2c9771",
        "rowVersion": 0,
        "name": "Txipirones",
        "displayName": "Txipirones",
        "kind": "food",
        "subKind": "",
        "ingredients": "Fresh daily squid, seasoned with rosemary and marinated with a teriyaki sauce",
        "priceCost": 10,
        "vatKind": "R",
        "pictureURL": "/nomad/txipirones.png"
    },
    {
        "$type": "ProductDTO",
        "id": "5df167a143121e1f7c2c977b",
        "rowVersion": 0,
        "name": "Avocato Toast",
        "displayName": "Avocato Toast",
        "kind": "food",
        "subKind": "",
        "ingredients": "A toasted bimbo toast accompanied with an avocato basement, softly cutted radish, fresh blue cheese and green peas",
        "priceCost": 11,
        "vatKind": "R",
        "pictureURL": "/holaCoffee/avocatoToast.png"
    },
    {
        "$type": "ProductDTO",
        "id": "5df167a143121e1f7c2c977d",
        "rowVersion": 0,
        "name": "Bagel",
        "displayName": "Bagel",
        "kind": "food",
        "subKind": "",
        "ingredients": "A review of the classic bagel ripened with canela, honey and 99% chocolate ",
        "priceCost": 6,
        "vatKind": "R",
        "pictureURL": "/holaCoffee/bagel.png"
    },
    {
        "$type": "ProductDTO",
        "id": "5df167a143121e1f7c2c977f",
        "rowVersion": 0,
        "name": "Spinach Sandwich",
        "displayName": "Spinach Sandwich",
        "kind": "food",
        "subKind": "",
        "ingredients": "Hand made sandwich with spinaches for the iron, duck for the swiming and cheese for the gluttony",
        "priceCost": 7,
        "vatKind": "R",
        "pictureURL": "/holaCoffee/spinachesSandwich.png"
    },
    {
        "$type": "ProductDTO",
        "id": "5df167a143121e1f7c2c9781",
        "rowVersion": 0,
        "name": "Bahn Mi",
        "displayName": "Bahn Mi",
        "kind": "food",
        "subKind": "",
        "ingredients": "Our new creation for vegan people and anyone else, a sandwich made with roasted potatoes, beet, romaine lettuce and a spicy garlic sauce",
        "priceCost": 16,
        "vatKind": "R",
        "pictureURL": "/holaCoffee/veganBahnMi.png"
    },
    {
        "$type": "ProductDTO",
        "id": "5df167a143121e1f7c2c9784",
        "rowVersion": 0,
        "name": "Carrot CupCake",
        "displayName": "Carrot CupCake",
        "kind": "food",
        "subKind": "",
        "ingredients": "Flour, sugar, baking soda, powder, salt, cinnamon, nutmeg, eggs, vanilla extract, milk, carrots and cream cheese",
        "priceCost": 3,
        "vatKind": "R",
        "pictureURL": "/cupAndcake/carrotCupCake.png"
    },
    {
        "$type": "ProductDTO",
        "id": "5df167a143121e1f7c2c9786",
        "rowVersion": 0,
        "name": "Chocolate CupCake",
        "displayName": "Chocolate CupCake",
        "kind": "food",
        "subKind": "",
        "ingredients": "Flour, sugar, baking soda, powder, salt, eggs, vanilla extract, milk, 90% chocolate for topping",
        "priceCost": 3,
        "vatKind": "R",
        "pictureURL": "/cupAndcake/chocolateCupCake.png"
    },
    {
        "$type": "ProductDTO",
        "id": "5df167a143121e1f7c2c9788",
        "rowVersion": 0,
        "name": "Lemon CupCake",
        "displayName": "Lemon CupCake",
        "kind": "food",
        "subKind": "",
        "ingredients": "Flour, sugar, baking soda, powder, salt, eggs, vanilla extract, milk, lemon cream for topping",
        "priceCost": 3,
        "vatKind": "R",
        "pictureURL": "/cupAndcake/lemonCupCake.png"
    },
    {
        "$type": "ProductDTO",
        "id": "5df167a243121e1f7c2c978a",
        "rowVersion": 0,
        "name": "Matcha CupCake",
        "displayName": "Matcha CupCake",
        "kind": "food",
        "subKind": "",
        "ingredients": "Flour, sugar, baking soda, powder, salt, eggs, vanilla extract, milk, matcha for topping",
        "priceCost": 3,
        "vatKind": "R",
        "pictureURL": "/cupAndcake/matchaCupCake.png"
    },
    {
        "$type": "ProductDTO",
        "id": "5df167a243121e1f7c2c978c",
        "rowVersion": 0,
        "name": "Pistacho CupCake",
        "displayName": "Pistacho CupCake",
        "kind": "food",
        "subKind": "",
        "ingredients": "Flour, sugar, baking soda, powder, salt, eggs, vanilla extract, milk, pistacho cream for topping",
        "priceCost": 3,
        "vatKind": "R",
        "pictureURL": "/cupAndcake/pistachoCupCake.png"
    },
    {
        "$type": "ProductDTO",
        "id": "5df167a243121e1f7c2c978e",
        "rowVersion": 0,
        "name": "Beet CupCake",
        "displayName": "Beet CupCake",
        "kind": "food",
        "subKind": "",
        "ingredients": "Flour, sugar, baking soda, powder, salt, eggs, vanilla extract, milk, beet cream for topping",
        "priceCost": 3,
        "vatKind": "R",
        "pictureURL": "/cupAndcake/remolachaCupCake.png"
    }
];

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

//#endregion

//#region  Aux Function
//localizamos el headerDAO


//#endregion
class MainMock {
    constructor() {
        this.currentCaddy = null;
    }

    calculateTotals() {
        //Ponemos a 0 los totales
         this.currentCaddy.amountDue = 0;
         this.currentCaddy.amountPayed = 0;
    
         this.currentCaddy.taxBaseR = 0;
         this.currentCaddy.taxBaseS = 0;
         this.currentCaddy.taxBaseN = 0;
         this.currentCaddy.totalItems = 0;
    
        //recorremos todos los detalles
        for (let docDetail of  this.currentCaddy.docDetails) {
             this.currentCaddy.totalItems += docDetail.quantity;
            //vamos acumulando en taxBaseX += docDetail.price * docDetail.quantity;
            switch (docDetail.vatKind) {
                case "N":
                     this.currentCaddy.taxBaseN += docDetail.price * docDetail.quantity
                    break;
                case "S":
                     this.currentCaddy.taxBaseS += docDetail.price * docDetail.quantity
                    break;
                case "R":
                default:
                     this.currentCaddy.taxBaseR += docDetail.price * docDetail.quantity
                    break;
            }
        }
         this.currentCaddy.amountDue =
             this.currentCaddy.taxBaseR * (1 +  this.currentCaddy.percentageBaseR) +
             this.currentCaddy.taxBaseN * (1 +  this.currentCaddy.percentageBaseN) +
             this.currentCaddy.taxBaseS * (1 +  this.currentCaddy.percentageBaseS);
    
         this.currentCaddy.rowVersion++;
    }

     async refreshCoffeeShops(cbDisplayCoffeeShops, cbDisplayErrors) {
        cbDisplayCoffeeShops(coffeeShopsMock);
    }

     async refreshCoffeeShop(cofeeShopId, cbDisplayCoffeeShop, cbDisplayErrors) {
        var errors = [];
        for (let fullCoffeeShopMock of fullCoffeeShopsMock) {
            if (fullCoffeeShopMock.id == cofeeShopId) {
                cbDisplayCoffeeShop(fullCoffeeShopMock);
                return;
            }
        }
        errors.push('coffeeShopID Not Found!');
        cbDisplayErrors(errors);
    }

     async  newCaddy(cofeeShopId, cbDisplayCaddy, cbDisplayErrors) {
        var errors = [];
        for (let coffeeShop of coffeeShopsMock) {
            if (coffeeShop.id == cofeeShopId) {
                let caddyMock = new CaddyMock();
                caddyMock.coffeeShopId = cofeeShopId;
                caddyMock.coffeeShop = coffeeShop;
                 this.currentCaddy = caddyMock;
                this.calculateTotals();
                cbDisplayCaddy(caddyMock);
                return;
            }
        }
        errors.push('Imposible to create a new Caddy, coffeeShopId not found!');
        cbDisplayErrors(errors);
    }

     async closeCaddy(caddyId, cbDisplayOrder, cbDisplayErrors) {
        var errors = [];
        if (! this.currentCaddy) {
            errors.push('Caddy not created already, call newCaddy() first');
        } else {

            if ( this.currentCaddy.id == caddyId) {
                 this.currentCaddy.docState = "close";
                 this.currentCaddy.rowVersion++;
                cbDisplayOrder( this.currentCaddy);
                return;
            }

            errors.push('Imposible to close a Caddy, caddyId not found!');
        }
        cbDisplayErrors(errors);
    }

     async  addProduct(caddyId, productId, quantity, price, cbDisplayCaddy, cbDisplayErrors) {
        var errors = [];
        console.log(`addProduct()`,caddyId, productId, quantity, price);
        if (! this.currentCaddy) {
            errors.push('Caddy not created already, call newCaddy() first');
        } else {
            if ( this.currentCaddy.id == caddyId) {
                for (let docDetail of  this.currentCaddy.docDetails) {
                    if (docDetail.productId == productId) {
                        docDetail.quantity += quantity;
                        docDetail.rowVersion++;
                        this.calculateTotals();
                        cbDisplayCaddy( this.currentCaddy);
                        return;
                    }
                }
                console.log(`productsMock`, productsMock);
                for (let productMock of productsMock) {
                    if (productMock.id == productId) {
                        let docDetail = {
                            "$type": "FullDocDetailDTO",
                            "id": Math.random() * 1000000000,
                            "rowVersion": 0,
                            "docHeaderId": caddyId,
                            "productId": productId,
                            "quantity": quantity,
                            "price": price,
                            "percentageDiscount": 0,
                            "vatKind": "R",
                            "title": productMock.displayName,
                            "remarks": productMock.ingredients,
                            "product": productMock
                        };
                         this.currentCaddy.docDetails.push(docDetail);
                         this.calculateTotals();
                        cbDisplayCaddy( this.currentCaddy);
                        return;
                    }
                }
                errors.push('productId not found!');
            } else {
                errors.push('Imposible to close a Caddy, caddyId not found!');
            }
        }
        cbDisplayErrors(errors);
    }

     async  removeProduct(caddyId, productId, quantity, cbDisplayCaddy, cbDisplayErrors) {
        var errors = [];
        if (! this.currentCaddy) {
            errors.push('Caddy not created already, call newCaddy() first');
        } else {
            if ( this.currentCaddy.id == caddyId) {
                let index = 0;
                for (let docDetail of  this.currentCaddy.docDetails) {
                    if (docDetail.productId == productId) {
                        let tmp = docDetail.quantity - quantity;
                        if (tmp <= 0) {
                             this.currentCaddy.docDetails.splice(index, 1);
                        } else {
                            docDetail.quantity = tmp;
                            docDetail.rowVersion++;
                        }
                        this.calculateTotals();
                        cbDisplayCaddy( this.currentCaddy);
                        return;
                    }
                    index++;
                }
                errors.push('productId not found!');
            } else {
                errors.push('Imposible to removeProducta product, caddyId not found!');
            }
        }
        cbDisplayErrors(errors);
    }

     async  removeSelection(docDetailid, cbDisplayCaddy, cbDisplayErrors) {
        var errors = [];
        if (! this.currentCaddy) {
            errors.push('Caddy not created already, call newCaddy() first');
        } else {
            let index = 0;
            for (let docDetail of  this.currentCaddy.docDetails) {
                if (docDetail.id == docDetailid) {
                     this.currentCaddy.docDetails.splice(index, 1);

                     this.calculateTotals();
                    cbDisplayCaddy( this.currentCaddy);
                    return;
                }
                index++;
                errors.push('docDetailid not found!');
            }
        }
        cbDisplayErrors(errors);
    }
}

export {MainMock};