// Use '@babel/preset-env'  to transpile to ES6.
require("@babel/register")({
    presets: ["@babel/preset-env"]
});

// Import the rest of the app.
module.exports = require('./backend/server.js');
