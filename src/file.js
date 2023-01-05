const fs = require("fs");

function getUniversityFilePath(name) {
  return `data/${name}.html`;
}

function getUniversityContent(name) {
  return fs.readFileSync(getUniversityFilePath(name)).toString();
}
function saveUniveriityContent(name, data) {
  return fs.writeFile(
    getUniversityFilePath(name),
    data,
    { flag: "w" },
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
}

function getEmailHtml(html) {
  return fs.readFileSync("email.html").toString().replace("${body}", html);
}

module.exports = {
  getUniversityContent,
  saveUniveriityContent,
  getEmailHtml,
};
