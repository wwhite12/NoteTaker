const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const authWare = require("../../client/middleware/authware");

module.exports = function (app) {

    app.post("/notes/convert", function (req, res) {
        console.log('********* hit')


        const vision = require('@google-cloud/vision');

        // Creates a client
        const client = new vision.ImageAnnotatorClient();


        const fileName = "./client/public/images/googleHandTest.jpeg";
        async function convertText() {
            // Read a local image as a text document
            const [result] = await client.documentTextDetection(fileName);
            const fullTextAnnotation = result.fullTextAnnotation;
            console.log(`Full text: ${fullTextAnnotation.text}`);
            fullTextAnnotation.pages.forEach(page => {
                page.blocks.forEach(block => {
                    console.log(`Block confidence: ${block.confidence}`);
                    block.paragraphs.forEach(paragraph => {
                        console.log(`Paragraph confidence: ${paragraph.confidence}`);
                        paragraph.words.forEach(word => {
                            const wordText = word.symbols.map(s => s.text).join('');
                            console.log(`Word text: ${wordText}`);
                            console.log(`Word confidence: ${word.confidence}`);
                            // word.symbols.forEach(symbol => {
                            //console.log(`Symbol text: ${symbol.text}`);
                            //console.log(`Symbol confidence: ${symbol.confidence}`);
                            //});
                        });
                    });
                });
            });
        }
        convertText();
    })

    app.post("/api/signup", function(req, res) {
        User.create(req.body)
          .then(function(result) {
            res.json({ message: "user created" });
          })
          .catch(function(err) {
            res.status(500).json({ error: err.message });
          });
      });
      
      app.post("/api/authenticate", function(req, res) {
        const { username, password } = req.body;
        User.findOne({ username: username }).then(function(dbUser) {
          if (!dbUser)
            return res
              .status(401)
              .json({ message: "Username or password incorrect" });
          if (dbUser.comparePassword(password)) {
            const token = jwt.sign(
              {
                data: dbUser._id
              },
              "supersecret"
            );
            res.json({
              id: dbUser._id,
              username: dbUser.username,
              token: token
            });
          } else {
            res.status(401).json({ message: "Username or password incorrect" });
          }
        });
      });
      
      app.get("/api/protected", authWare, function(req, res) {
          const user = req.user;
          res.json({ message: user.username + ", is authenticated!" });
      });
      
      app.get("/api/public", function(req, res) {
          res.json({ message: "You have access to all pages!" });
      });
      
      app.get("api/public", function(req, res) {
          res.json({ message: "public pages only" });
      });
      
      app.get("/api/me", authWare, function (req, res) {
          User.findById(req.user._id).then(dbUser => {
              res.json(dbUser);
              console.log(dbUser);
          })
      });
}