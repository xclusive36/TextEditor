const express = require('express'); // Require express plugin

const app = express(); // Create express app
const PORT = process.env.PORT || 3000; // Set port

app.use(express.static('../client/dist')); // Serve static files from client/dist
app.use(express.urlencoded({ extended: true })); // Parse urlencoded data
app.use(express.json()); // Parse json data

require('./routes/htmlRoutes')(app); // Require htmlRoutes module

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`)); // Listen on port and log port number
