const path = require('path'); // Require path plugin

module.exports = (app) => // Export module as a function
  app.get('/', (req, res) => // Set route for root path
    res.sendFile(path.join(__dirname, '../client/dist/index.html')) // Send index.html file
  );
