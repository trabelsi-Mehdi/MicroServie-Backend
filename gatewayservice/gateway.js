const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
    next();
});

app.use(
    "/api/users",
    createProxyMiddleware({
        target: "http://localhost:5000/api/users",
        changeOrigin: true,
    })
);

app.use(
    "/api/posts",
    createProxyMiddleware({
        target: "http://localhost:5000/api/posts",
        changeOrigin: true, 
    })
);

app.use(
    "/api/comments",
    createProxyMiddleware({
        target: "http://localhost:5001/api/comments",
        changeOrigin: true,
    })
);

app.get("/", (req, res) => {
    res.send("API Gateway is running...");
});

app.use((req, res) => {
    console.log(`404 - Not Found: ${req.originalUrl}`);
    res.status(404).json({ error: "Requested resource could not be found." });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});
