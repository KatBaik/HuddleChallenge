var express = require("express"),
    path = require("path"),
    bodyParser = require('body-parser'),
    pg = require('pg');
const cors = require('cors');

var app = express();

const config = {
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT              
};
var pool = new pg.Pool(config);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.options('*', cors());

app.get('/', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error("Error fetching the client", err);
        }
        client.query('SELECT * FROM "Houses"', function (err, result) {
            if (err) {
                return console.log("Error running the query", err);
            }
            res.json({ data: result.rows });
            done();
        });
    });
});

app.get('/gas/:id', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error("Error fetching the client", err);
        }
        client.query('SELECT * FROM "Utilities" WHERE house_id = $1 AND type=\'electricity\'', [req.params.id], function (err, result) {
            if (err) {
                return console.log("Error running the query", err);
            }
            res.json({ data: result.rows });
            done();
        });
    });
});

app.get('/electricity/:id', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error("Error fetching the client", err);
        }
        client.query('SELECT * FROM "Utilities" WHERE house_id = $1 AND type=\'gas\'', [req.params.id], function (err, result) {
            if (err) {
                return console.log("Error running the query", err);
            }
            res.json({ data: result.rows });
            done();
        });
    });
});

app.listen(4000, function (){
    console.log('Server started on port 4000');
})