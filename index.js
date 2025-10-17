const express = require('express');
const sqLite = require('sqlite3').verbose();
const productsRouter = require('./routes/Products');

const app = express();
const db = new sqLite.Database('./storeDb.sqlite');
app.use('/api/Products', productsRouter)

app.get('/', (req, res) => {
   
 db.serialize(() => {
       db.all('SELECT * FROM  Products', [], (err, items) => {
        if(err) {
            res.status(500).send(err.message);
        } else {
            res.json(items);
        }
       });
 })

})

app.listen(3000, () => {
    console.log('server ${port}');
})

