const recipe = require('../localStorage/recipe')
var LocalStorage = require('node-localstorage').LocalStorage;

localStorage = new LocalStorage('./scratch');



const recipeServer = {
    GetAllRecipe: (_req, res) => {
        let recipees = JSON.parse(localStorage.getItem('recipe') | [])
        if (!recipees.length) {
            localStorage.setItem('recipe', JSON.stringify(recipe))
            recipees = recipe;
        }
        res.send(recipees);
    },

    addRecipy: (req, res) => {
        const {
            Name, UserId, CategoryId, Img, Duration, Difficulty, Description,
            Ingrident, Instructions } = req.body;
        let recipees = JSON.parse(localStorage.getItem('recipe') | [])
        if (!recipees.length) {
            localStorage.setItem('recipe', JSON.stringify(recipe))
            recipees = recipe;
        }

        if (!Name || !UserId || !CategoryId || !Img || !Duration || !Difficulty || !Description || !Ingrident || !Instructions) {
            // לא נשלח מידע
            res.status(400)
            return res.send('המידע שנשלח לא תקין')
        };

        const Id = recipees[recipees.length - 1].Id + 1;
        const newRecipe = {
            Id, Name, UserId, CategoryId, Img, Duration, Difficulty, Description,
            Ingrident, Instructions
        };
        recipees.push(newRecipe)
        localStorage.setItem('recipe', JSON.stringify(recipees))

        res.send(newRecipe);
    },

    EditRecipy: (req, res) => {
        const { Id,
            Name, UserId, CategoryId, Img, Duration, Difficulty, Description,
            Ingrident, Instructions } = req.body;
        let recipees = JSON.parse(localStorage.getItem('recipe') | [])
        if (!recipees.length) {
            localStorage.setItem('recipe', JSON.stringify(recipe))
            recipees = recipe;
        }

        if (!Id || !Name || !UserId || !CategoryId || !Img || !Duration || !Difficulty || !Description || !Ingrident || !Instructions) {
            // לא נשלח מידע
            res.status(400)
            return res.send('המידע שנשלח לא תקין')
        };
        const foundIndex = recipees.findIndex(x => x.Id == Id);
        if (foundIndex < 0) {
            res.status(400)
            res.send('לא נמצא מתכון מתאים');
        }
        const updateRecipe = {
            ...recipees[foundIndex],
            Name, CategoryId, Img, Duration, Difficulty, Description,
            Ingrident, Instructions
        };
        recipees[foundIndex] = updateRecipe;
        localStorage.setItem('recipe', JSON.stringify(recipees))
        return res.send(updateRecipe);
    },
    Delete: (req, res) => {
        const { Id } = req.params;
        // console.log(Id)
        let recipees = JSON.parse(localStorage.getItem('recipe') | [])
        if (!recipees.length) {
            localStorage.setItem('recipe', JSON.stringify(recipe))
            recipees = recipe;
        }
        // recipees = recipees.filter(x => x.Id != Id);
        // console.log(recipees);

        let index = -1;
        for (let i = 0; i < recipees.length; i++) {
            console.log(recipees[i].Id);
            console.log({ Id });
            if (recipees[i].Id == Id) {
                index = i;
                break;
            }
        }
        console.log(index);
        if (index != -1)
            recipees.splice(index, 1)

        localStorage.setItem('recipe', JSON.stringify(recipees))
        res.send('ok');
    },



}
localStorage.setItem('stateServer', JSON.stringify(recipeServer))
module.exports = recipeServer;