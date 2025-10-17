const sqLite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../storeDb.sqlaite');

const db = new sqLite3.Database(dbPath, (err) => {
    if(err){
        console.error('Error Opening database', err.message);
    } else {
        console.log('Connected to sqlite database');
    }
});

module.exports = db;