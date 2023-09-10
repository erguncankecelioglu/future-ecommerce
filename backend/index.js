const express = require('express');
const db = require('./db');
const cors = require('cors');


db.serialize(() => {
    db.run('DROP TABLE IF EXISTS user');
    db.run('DROP TABLE IF EXISTS cart');
    db.run('DROP TABLE IF EXISTS product');
    db.run('DROP TABLE IF EXISTS orders');
    db.run('CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, items TEXT, totalValue REAL, date TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS product (id INTEGER PRIMARY KEY, name TEXT, description TEXT, price REAL,category TEXT, image TEXT)');

    db.run(`INSERT INTO product (id, name, description, price, category, image) VALUES (1, 'Minecraft', 'Build, mine, and explore', 26.95, 'games', 'minecraft.jpg')`);
    db.run(`INSERT INTO product (id, name, description, price, category, image) VALUES (2, 'Among Us', 'Find the Imposter!', 4.99, 'games', 'amongus.jpg')`);
    db.run(`INSERT INTO product (id, name, description, price, category, image) VALUES (3, 'Cyberpunk 2077', 'Open-world, action', 59.99, 'games', 'cyberpunk2077.jpg')`);
    db.run(`INSERT INTO product (id, name, description, price, category, image) VALUES (4, 'WhatsApp', 'Messaging app', 0.0, 'apps', 'whatsapp.jpg')`);
    db.run(`INSERT INTO product (id, name, description, price, category, image) VALUES (5, 'Zoom', 'Video conferencing', 0.0, 'apps', 'zoom.jpg')`);
    db.run(`INSERT INTO product (id, name, description, price, category, image) VALUES (6, 'Spotify', 'Music streaming', 9.99, 'apps', 'spotify.jpg')`);
    db.run(`INSERT INTO product (id, name, description, price, category, image) VALUES (7, 'Call of Duty: Warzone', 'Battle Royale', 0.0, 'games', 'callofduty.jpg')`);
    db.run(`INSERT INTO product (id, name, description, price, category, image) VALUES (8, 'Fortnite', 'Survival and Building', 0.0, 'games', 'fortnite.jpg')`);
    db.run(`INSERT INTO product (id, name, description, price, category, image) VALUES (9, 'Animal Crossing: New Horizons', 'Life simulation', 59.99, 'games', 'animalcrossing.jpg')`);
    db.run(`INSERT INTO product (id, name, description, price, category, image) VALUES (10, 'Genshin Impact', 'Action RPG', 0.0, 'games', 'genshinimpact.jpg')`);
    db.run(`INSERT INTO product (id, name, description, price, category, image) VALUES (11, 'Instagram', 'Photo and video sharing', 0.0, 'apps', 'instagram.jpg')`);
    db.run(`INSERT INTO product (id, name, description, price, category, image) VALUES (12, 'Twitter', 'Microblogging and social networking', 0.0, 'apps', 'twitter.jpg')`);
    db.run(`INSERT INTO product (id, name, description, price, category, image) VALUES (13, 'TikTok', 'Short-form videos', 0.0, 'apps', 'tiktok.jpg')`);
    db.run(`INSERT INTO product (id, name, description, price, category, image) VALUES (14, 'Slack', 'Team collaboration', 6.67, 'apps', 'slack.jpg')`);
    db.run(`INSERT INTO product (id, name, description, price, category, image) VALUES (15, 'Reddit', 'Social news aggregation', 0.0, 'apps', 'reddit.jpg')`);
    db.run(`INSERT INTO product (id, name, description, price, category, image) VALUES (16, 'Google Drive', 'Cloud storage', 0.0, 'apps', 'googledrive.jpg')`);

});

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());


app.use(cors({
}));

app.get('/products', (req, res) => {
    db.all('SELECT * FROM product', [], (err, rows) => {
        if (err) {
            return res.status(400).json({"error": err.message});
        }
        return res.status(200).json(rows);
    });
});

app.get('/product/:id', (req, res) => {
    const id = req.params.id;

    // Parameterized SQL query to avoid SQL injection
    db.get('SELECT * FROM product WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(400).json({"error": err.message});
        }
        if (row) {
            return res.status(200).json(row);
        } else {
            return res.status(404).json({"message": "Product not found"});
        }
    });
});

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Registration
app.post('/register', (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.run(`INSERT INTO user (username, password) VALUES (?, ?)`, [username, hashedPassword], function (err) {
        if (err) {
            return res.status(400).json({error: "Username exists."});
        }

        // Generate JWT here and respond
        const token = jwt.sign({id: this.lastID}, 'your_jwt_secret');

        return res.status(201).json({message: 'User created', id: this.lastID, token, username});


    });
});


function authenticateJWT(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>

    if (token) {
        jwt.verify(token, 'your_jwt_secret', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

app.post('/orders', authenticateJWT, (req, res) => {
    const {username, totalValue, items} = req.body;
    const date = new Date().toISOString();
    // Stringify items and log it for debugging
    const itemsString = JSON.stringify(items);
    if (items.length === 0) {
        return res.status(400).json({error: "No items in cart."});
    }

    db.run(`INSERT INTO orders (username, items, totalValue, date) VALUES (?, ?, ?, ?)`, [username, itemsString, totalValue, date], function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        return res.status(201).json({message: 'Order created', id: this.lastID});
    });
});


app.get('/orders', authenticateJWT, (req, res) => {
    const username = req.headers['x-username'];
    db.all(`SELECT * FROM orders WHERE username = ?`, [username], (err, rows) => {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        return res.status(200).json(rows);
    });
});


// User Login
app.post('/login', (req, res) => {
    const {username, password} = req.body;

    db.get(`SELECT * FROM user WHERE username = ?`, [username], (err, row) => {
        if (err) {
            return res.status(400).json({error: "Wrong username or password."});
        }
        if (!row) return res.status(400).json({message: 'User not found'});

        const validPassword = bcrypt.compareSync(password, row.password);
        if (validPassword) {
            const token = jwt.sign({id: row.id}, 'your_jwt_secret');
            return res.json({token, username});
        } else {
            return res.status(401).json({message: 'Password incorrect'});
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



