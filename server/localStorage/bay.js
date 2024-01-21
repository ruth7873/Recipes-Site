// const { LocalStorage } = require("node-localstorage");
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const bay = [
    {
        "Id": 1,
        "Name": "Bamba",
        "UserId": 1,
        "Count": 1

    },
    {
        "Id": 2,
        "Name": "Dark Chocolate",
        "UserId": 1,
        "Count": 2

    },
    {
        "Id": 3,
        "Name": "Beasley",
        "UserId": 1,
        "Count": 5

    },
    {
        "Id": 4,
        "Name": "flour",
        "UserId": 2,
        "Count": 8

    },

]
localStorage.setItem('bay',JSON.stringify(bay));

module.exports = bay;