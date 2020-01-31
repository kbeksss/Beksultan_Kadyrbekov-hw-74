const express = require('express');
const fs = require('fs');
const router = express.Router();
router.get('/', (req, res) => {
    const path = './app/messages';
    let messages = [];
    const paths = fs.readdirSync(path).reverse();
    const lastFive = paths.length < 5 ? paths.length : 5;
    for(let i = 0; i < lastFive; i++){
        const data = fs.readFileSync(path + '/' + paths[i]);
        messages.push(JSON.parse(data));
    }
    res.send(messages);
});
router.post('/',(req, res) => {
    const date = new Date();
    console.log(req.body);
    fs.writeFile(`./app/messages/${date.toISOString()}.txt`, JSON.stringify({...req.body, datetime: date.toISOString()}), (error) => {
        if(error){
            res.send('Your message wasn\'t saved');
            console.error('Error while saving data', error)
        } else{
            res.send('Added a new message');
            console.log('Message was saved');
        }
    })
});

module.exports = router;
