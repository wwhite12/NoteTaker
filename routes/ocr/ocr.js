const vision = require('@google-cloud/vision');

module.exports = function (app) {

    app.post("/ocr/convert", async function (req, res) {

        console.log("*********hit*********");

        const fileName = req.body.image;
        
        try {
            const fullText = await convertText(fileName);

            res.json({ message: fullText });
        } catch(err) {
            res.json(err);
        }
    })
}

async function convertText(fileName) {
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    fileName = fileName.replace(/data:image\/(jpeg|png);base64,/, "");
    const imageBuffer = Buffer.from(fileName, 'base64');
    
    // Read a local image as a text document
    try {
        const [result] = await client.documentTextDetection(imageBuffer);

        const fullTextAnnotation = result.fullTextAnnotation;
        console.log(result);

        return fullTextAnnotation.text;
    } catch (err) {
        console.log(err);
    }

    //myArr.push(fullTextAnnotation.text);
    //console.log(myArr)
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