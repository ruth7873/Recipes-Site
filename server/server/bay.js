const bay = require('../localStorage/bay')
var LocalStorage = require('node-localstorage').LocalStorage;

localStorage = new LocalStorage('./scratch');



const BayService = {
    GetMaList: (req, res) => {
        const { UserId } = req.params;
        let bayList = JSON.parse(localStorage.getItem('bay') | [])
        if (!bayList.length) {
            localStorage.setItem('bay', JSON.stringify(bay))
            bayList = bay;
        }

        let myList = bayList.filter(x => x.UserId == UserId);
        if (!myList.length) {
            res.status(400);
            return res.send('לא נמצאו נתונים')
        }
        console.log(myList);
        res.send(myList);
    },

    AddToList: (req, res) => {
        const { Name, UserId, Count } = req.body;
        let bayList = JSON.parse(localStorage.getItem('bay') | [])
        if (!bayList.length) {
            localStorage.setItem('bay', JSON.stringify(bay))
            bayList = bay;
        }
        if (!Name || !UserId || !Count) {
            // לא נשלח מידע
            res.status(400)
            return res.send('לא נשלח שם מוצר או כמות תקינה או שם משתמש')
        };
        console.log(bayList);
        const foundIndex = bayList.findIndex(x => x.Name == Name && x.UserId == UserId);
        if (foundIndex >= 0) {
            bayList[foundIndex].Count += Count;
            localStorage.setItem('bay', JSON.stringify(bayList))
            return res.send(bayList[foundIndex]);
        }
        else {
            const Id = bayList[bayList.length - 1].Id + 1;
            const newBay = { Name, Id, UserId, Count };
            bayList.push(newBay)
            localStorage.setItem('bay', JSON.stringify(bayList))
            res.send(newBay);
        }


    },
    Delete: (req, res) => {
        const { Id } = req.params;
        let bayList = JSON.parse(localStorage.getItem('bay') | [])

        if (!bayList.length) {
            localStorage.setItem('bay', JSON.stringify(bay))
            bayList = bay;
        }


        // bayList = bayList.filter(x => x.Id != Id);
        let index = -1;
        for (let i = 0; i < bayList.length; i++) {
            if (bayList[i].Id == Id) {
                index = i;
                break;
            }
        }
        if (index != -1)
            bayList.splice(index, 1);
        console.log(index);
        console.log(bayList, Id);
        localStorage.setItem('bay', JSON.stringify(bayList))
        res.send('ok');
    },
}

module.exports = BayService;