const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const notesRoutes = require("./routes/noteRoutes");
const { connectDB } = require("./config/db");
const rateLimiter = require("./middleware/rateLimiter");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
app.use(express.json()); // this middleware parses req.body
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
});
