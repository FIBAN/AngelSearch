'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite3');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const randomUUID = () => uuidv4(null, new Buffer(16), 0).toString('base64');

const authCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://fiban.eu.auth0.com/.well-known/jwks.json"
    }),
    audience: 'daily-deals-api',
    issuer: "https://fiban.eu.auth0.com/",
    algorithms: ['RS256']
});

app.get('/api/angels', (req, res) => {

    db.all('SELECT * FROM angels', (err, rows) => {
        if(err) {
            console.error(err);
            res.json({status: 500, message: err}).status(500);
        } else {
            res.json(rows);
        }
    })

});

app.post('/api/angels', (req, res) => {

    db.run('INSERT INTO angels (id, name, email, age, city) VALUES (?, ?, ?, ?, ?)',
        randomUUID(),
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.city,
        (err) => {
            if(err) {
                console.error(err);
                res.json({status: 500, message: err}).status(500);
            } else {
                res.json({status: 201, message: 'Created'});
            }
        }
    );

});

app.get('/api/angels/:angelId', (req, res) => {

    db.get('SELECT * FROM angels WHERE id = ?', req.params.angelId,
        (err, row) => {
            if(err) {
                console.error(err);
                res.json({status: 500, message: err}).status(500);
            } else {
                res.json(row);
            }
        }
    );

});



app.put('/api/angels/:angelId', (req, res) => {

    db.run('UPDATE angels SET name = ?, email = ?, age = ?, city = ? WHERE id = ?',
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.city,
        req.params.angelId,
        (err) => {
            if(err) {
                console.error(err);
                res.json({status: 500, message: err}).status(500);
            } else {
                res.json({status: 200, message: 'Updated'});
            }
        }
    );

});

app.delete('/api/angels/:angelId', (req, res) => {

    db.run('DELETE FROM angels WHERE id = ?', req.params.angelId,
        (err) => {
            if(err) {
                console.error(err);
                res.json({status: 500, message: err}).status(500);
            } else {
                res.json({status: 200, message: 'Deleted'});
            }
        }
    );

});

app.get('/api/me', (req, res) => {

});


app.get('/api/deals/public', function (req, res) {
    let deals = [
        {
            id: 12231,
            name: 'Playstation 4 500GB Console',
            description: 'The Playstation 4 is the next gen console to own. With the best games and online experience.',
            originalPrice: 399.99,
            salePrice: 299.99
        },
        {
            id: 12234,
            name: 'Galaxy Note 7',
            description: 'The Note 7 has been fixed and will no longer explode. Get it an amazing price!',
            originalPrice: 899.99,
            salePrice: 499.99
        },
        {
            id: 12245,
            name: 'Macbook Pro 2016',
            description: 'The Macbook Pro is the de-facto standard for best in breed mobile computing.',
            originalPrice: 2199.99,
            salePrice: 1999.99
        },
        {
            id: 12267,
            name: 'Amazon Echo',
            description: 'Turn your home into a smart home with Amazon Echo. Just say the word and Echo will do it.',
            originalPrice: 179.99,
            salePrice: 129.99
        },
        {
            id: 12288,
            name: 'Nest Outdoor Camera',
            description: 'The Nest Outdoor camera records and keeps track of events outside your home 24/7.',
            originalPrice: 199.99,
            salePrice: 149.99
        },
        {
            id: 12290,
            name: 'GoPro 4',
            description: 'Record yourself in first person 24/7 with the GoPro 4. Show everyone how exciting your life is.',
            originalPrice: 299.99,
            salePrice: 199.99
        },
    ];
res.json(deals);
});

app.get('/api/deals/private', authCheck, (req,res)=>{
    let deals = [
        {
            id: 14423,
            name: 'Tesla S',
            description: 'Ride in style and say goodbye to paying for gas. The Tesla S is the car of the future.',
            originalPrice: 90000.00,
            salePrice: 75000.00
        },
        {
            id: 14553,
            name: 'DJI Phantom 4',
            description: 'The Drone revolution is here. Take to the skies with the DJI Phantom 4.',
            originalPrice: 1299.99,
            salePrice: 749.99
        },
        {
            id: 15900,
            name: 'iPhone 7 - Jet Black',
            description: 'Get the latest and greatest iPhone in the limited edition jet black.',
            originalPrice: 899.99,
            salePrice: 799.99
        },
        {
            id: 16000,
            name: '70" Samsung 4K HDR TV',
            description: 'Watch as if you were there with the latest innovations including 4K and HDR.',
            originalPrice: 2999.99,
            salePrice: 2499.99
        },
        {
            id: 17423,
            name: 'Canon t8i DSLR',
            description: 'Capture life\'s moments with the amazing Canon t8i DSLR',
            originalPrice: 999.99,
            salePrice: 549.99
        },
        {
            id: 17423,
            name: 'Xbox One S',
            description: 'Get the latest Xbox and play the best first party games including Gears of War and Forza.',
            originalPrice: 299.99,
            salePrice: 279.99
        },
    ];
res.json(deals);
});

app.get('/api/angels', authCheck, (req, res) => {
    fs.readFile('mock_angels.json', 'utf8', function (err, data) {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.get('/api/test', authCheck, (req, res) => {
    res.json(req.user);
});

app.get('/api/dbtest', (req, res) => {

    db.serialize(function () {
        db.run("CREATE TABLE lorem (info TEXT)", (err) => console.log(err));

        let stmt = db.prepare("INSERT INTO lorem VALUES (?)");
        for (let i = 0; i < 10; i++) {
            stmt.run("Ipsum " + i);
        }
        stmt.finalize();

        db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
            console.log(row.id + ": " + row.info);
        });
    });

    res.json({msg: "Done"});
});

const initDatabase = function () {

    db.run("CREATE TABLE angels (id TEXT, name TEXT, email TEXT, age INTEGER, city TEXT)", (err) => console.log(err));

};

initDatabase();

app.listen(3001);
console.log('Listening on localhost:3001');