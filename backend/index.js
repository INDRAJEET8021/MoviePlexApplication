const express = require("express");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors"); // For handling CORS
require('dotenv').config();  // Load environment variables
const fs = require('fs');


const app = express();
const port = process.env.PORT


app.use(express.json());
app.use(cors());

// Set up MySQL connection
const db = mysql.createConnection({
  // host: "localhost", // Your database host (usually localhost)
  // user: "details", // Your database username
  // password: "12345", // Your database password
  // database: "movie", // The name of your database

  // Setup for cloud data base
  host: process.env.HOST,       // Use the database host from .env
  user: 'avnadmin',             // Your database username
  password: process.env.DB_PASSWORD, // Use the database password from .env
  database: 'defaultdb',        // The name of your database
  port: 14234,
  ssl: {
    ca: fs.readFileSync(process.env.ssl_cert_path)  // Assuming 'ssl_cert_path' points to the certificate file
  }
});


// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + db.threadId);
});

const JWT_SECRET = "jkhibdsiub67657";

// Register Route: Hashing the password before saving to the database
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Check if username already exists
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "Email already exists Login" });
    }

    // Hash the password using bcrypt
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error hashing password" });
      }

      // Insert the new user into the database with the hashed password
      db.query(
        "INSERT INTO users (username,email, password) VALUES (?, ?,?)",
        [username, email, hashedPassword],
        (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error saving user" });
          }

          // Send structured success response
          res
            .status(201)
            .json({ success: true, message: "User registered successfully" });
        }
      );
    });
  });
});

// Login Route: Comparing the hashed password
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    // If email or password is missing, return a 400 error
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Query MySQL to find the user by email
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // If no user is found, return a 401 Unauthorized error
    if (results.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = results[0];

    // Compare the provided password with the hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ error: "Error comparing passwords" });
      }

      // If the passwords don't match, return a 401 Unauthorized error
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }

      // If passwords match, generate a JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      console.log("Login successful");

      // Send the token in a JSON response
      res.json({ token });
    });
  });
});

// Middleware to authenticate using JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Expect token in Authorization header

  if (!token) {
    return res.status(403).send("Token is required");
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid or expired token");
    }

    req.user = user;
    next(); // Proceed to the next route handler
  });
};

app.post("/addFavorite", (req, res) => {
  const { userId, movieId } = req.body;

  const query = `INSERT INTO favorites (user_id, movie_id) VALUES (?, ?)`;

  db.query(query, [userId, movieId], (err, results) => {
    if (err) {
      console.error("Error adding to favorites:", err);
      return res.status(500).send("Error adding to favorites");
    }

    res.send("Movie added to favorites");
  });
});

app.post("/removeFavorite", (req, res) => {
  const { userId, movieId } = req.body;

  const query = `DELETE FROM favorites WHERE user_id = ? AND movie_id = ?`;

  db.query(query, [userId, movieId], (err, results) => {
    if (err) {
      console.error("Error removing from favorites:", err);
      return res.status(500).send("Error removing from favorites");
    }

    res.send("Movie removed from favorites");
  });
});

app.get("/getFavorites/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `SELECT movie_id FROM favorites WHERE user_id = ?`;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error retrieving favorites:", err);
      return res.status(500).send("Error retrieving favorites");
    }

    const movieIds = results.map((row) => row.movie_id);
    res.json({ favorites: movieIds });
  });
});

// Check Details(Optional)Postman Check
app.get("/users", authenticateJWT, (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching data");
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
