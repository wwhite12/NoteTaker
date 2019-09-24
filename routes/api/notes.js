
const router = require("express").Router();
const notesController = require("../../controllers/notesController");

// Matches with "/api/notes"
router.route("/")
    .get(notesController.findAll)
    .post(notesController.create);

// Matches with "/api/notes/:id"
router
    .route("/:id")
    .get(notesController.findById)
    .put(notesController.update)
    .delete(notesController.remove);

module.exports = router;
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
}
