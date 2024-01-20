const category = require('../localStorage/category')
var LocalStorage = require('node-localstorage').LocalStorage;

localStorage = new LocalStorage('./scratch');



const categoryServer = {
    GetAllCategory: (_req, res) => {
        let categories = JSON.parse(localStorage.getItem('category') | [])
        if (!categories.length) {
            localStorage.setItem('category', JSON.stringify(category))
            categories = category;
        }
        res.send(categories);
    },

    addCategory: (req, res) => {
        const { Name } = req.body;
        let categories = JSON.parse(localStorage.getItem('category') | [])
        if (!categories.length) {
            localStorage.setItem('category', JSON.stringify(category))
            categories = category;
        }

        if (!Name) {
            // לא נשלח מידע
            res.status(400)
            return res.send('לא נשלח שם לקטגוריה')
        };
        if (categories.filter(x => x.Name == Name).length) {
            // אם כבר קיים
            res.status(400)
            return res.send('קטגוריה קיימת')
        };
        const Id = categories[categories.length - 1].Id + 1;
        const newCategory = { Name, Id };
        categories.push(newCategory)
        localStorage.setItem('category', JSON.stringify(categories))

        res.send(newCategory);
    }
}

module.exports = categoryServer;