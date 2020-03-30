const fs = require('fs');
const pdf = require('pdf-parse');

const changeToText = async filename => {
  const dataBuffer = fs.readFileSync(filename);
  const data = await pdf(dataBuffer);
  return data.text;
};
module.exports = changeToText;
