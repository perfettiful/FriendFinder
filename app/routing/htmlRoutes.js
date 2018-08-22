const path = require('path');
// Routes
// =============================================================
module.exports = function (app) {

        app.get("/", function (req, res) {
            res.sendFile(path.join(__dirname, "../public/home.html"));
        });

        app.get("/survey", function (req, res) {
            res.sendFile(path.join(__dirname, "../public/survey.html"));
       
        });

          // If no matching route is found - redirect to home - API route is already taken care by precedence.
          app.get("*", function (req, res) {
              res.sendFile(path.join(__dirname, "../public/home.html"));
          });

};
