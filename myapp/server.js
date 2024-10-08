let express = require('express');
let path = require('path');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let app = express();

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve the index.html file
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Serve the profile picture
app.get('/profile-picture', function (req, res) {
    let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
});

// MongoDB connection settings
const mongoUrl = "mongodb://admin:password@localhost:27017"; // Update with your actual URL if necessary
const databaseName = "user-account";
const collectionName = "users";

// API to get profile
app.get('/get-profile', async (req, res) => {
    try {
        const client = await MongoClient.connect(mongoUrl);
        const db = client.db(databaseName);
        const userProfile = await db.collection(collectionName).findOne({ userid: 1 }); // Assuming userid is used to identify users
        client.close();

        if (userProfile) {
            res.json(userProfile);
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// API to update profile
app.post('/update-profile', async (req, res) => {
    const { name, email, interests } = req.body;

    try {
        const client = await MongoClient.connect(mongoUrl);
        const db = client.db(databaseName);
        const userObj = { userid: 1, name, email, interests }; // Assuming userid is used to identify users

        const myquery = { userid: 1 };
        const newvalues = { $set: userObj };

        await db.collection(collectionName).updateOne(myquery, newvalues, { upsert: true });
        client.close();

        // Respond with the updated profile
        res.json(userObj);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Start the server
app.listen(3000, function () {
    console.log("app listening on port 3000!");
});
