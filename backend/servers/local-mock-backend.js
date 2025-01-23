'use strict';
const express = require('express');
const mockRoutes = require('../servers/mocks/routes/index');
const cors = require('cors');

// Config
const port = 3344;

// Create app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: 8192 }));

const  whitelist = [
    'http://localhost:3344',
    'http://localhost:4200'
]; // white list Origins

const corsOptions = {
    origin: async (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true, // credentials are cookies, authorization headers or TLS client certificates.
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "device-remember-token",
        "Access-Control-Allow-Origin",
        "Origin",
        "Accept",
        'Verify'
    ]
};

// Configure CORS for our server
app.use(cors(corsOptions))

// Use routes to API
app.use('/', mockRoutes);

// Start server
app.listen(port, () => {
    console.log(`Node Express server for ${'web-app'} listening on http://localhost:${port}`);
});
