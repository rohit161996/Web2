import express from "express";

/* Get the Instance of the pg library */
import { Client } from "pg";

/* Initialize the pgClient */
const pgClient = new Client({
    user: "postgres",
    password: "mysecretpassword",
    port: 5432,
    host: "localhost",
    database: "postgres"
});
pgClient.connect();

const app = express();
app.use(express.json());
app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    try {
        // const insertQuery = `INSERT INTO 
        // users 
        // (username, email, password)
        // VALUES 
        // ('${username}', '${email}', '${password}');`;

        const insertQuery = `INSERT INTO 
        users 
        (username, email, password)
        VALUES 
        ('$1', '$2', '$3');`;

        const response = await pgClient.query(insertQuery, [username, email, password]);
    }
    catch (err) {
        console.log(err);
    }

    res.json({
        message: "You have signed up"
    })
});

app.listen(3000);