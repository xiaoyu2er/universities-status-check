const fs = require("fs");

function getSiteFilePath(name) {
  return `data/${name}.html`;
}

function getSiteContent(name) {
  const filePath = getSiteFilePath(name);
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(getSiteFilePath(name)).toString();
  } else {
    return "";
  }
}
function saveSiteContent(name, data) {
  return fs.writeFile(getSiteFilePath(name), data, { flag: "w" }, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function getEmailHtml(html) {
  return fs.readFileSync("email.html").toString().replace("${body}", html);
}

function updateLog(content) {
  return fs.appendFileSync("./data/log.txt", content);
}
module.exports = {
  getSiteContent,
  saveSiteContent,
  getEmailHtml,
  updateLog,
};
