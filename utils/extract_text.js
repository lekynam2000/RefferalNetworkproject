const pdfToText = require('./pdftotext');
const WordExtractor = require('word-extractor');
const docx = require('./docx');

module.exports = async filename => {
  const filenameExtension = filename.split('.')[filename.split('.').length - 1];
  var execute;
  try {
    switch (filenameExtension) {
      case 'pdf':
        async function executePdf() {
          text = await pdfToText(filename);
          return text;
        }
        execute = executePdf;
        break;
      case 'doc':
        var extractor = new WordExtractor();
        async function executeDoc() {
          var extracted = await extractor.extract(filename);
          var text = extracted.getBody();
          return text;
        }
        execute = executeDoc;
        break;
      case 'docx':
        console.log(3);
        async function executeDocx() {
          var text = await docx.extract(filename);
          return text;
        }
        execute = executeDocx;
        break;

      default:
        text = 'Not Supported Format';
    }
    text = await execute();
    // console.log(text);
    return text;
  } catch (error) {
    console.error(error.message);
  }
};
