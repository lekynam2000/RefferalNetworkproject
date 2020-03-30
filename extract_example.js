const extractor = require('./utils/extract_text');
const filename = './resume/sample.doc';
const resultFunc = async filename => {
  const result = await extractor(filename);
  console.log(result);
};
resultFunc(filename);
