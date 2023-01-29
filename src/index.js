const Diff = require("diff");
const Diff2Html = require("diff2html");
const {
  saveUniveriityContent,
  getUniversityContent,
  getEmailHtml,
  updateLog,
} = require("./file");
const beautify = require("js-beautify").html;
const Crawler = require("crawler");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const { universities, selectors, ignoreSelectors } = require("./config");
const { isEqual } = require("./diff");
const { email } = require("./email");
const [fromEmail, fromEmailPass, toEmail] = process.argv.slice(2);

const diffs = [];
const c = new Crawler({
  jQuery: jsdom,
  maxConnections: 10,
  // This will be called for each crawled page
  callback: (error, res, done) => {
    const req = res.request;
    const { uri } = req;
    // const url = new URL(uri);
    const hostname = uri.hostname;

    if (error) {
      console.log(error);
    } else {
      const body = res.body;
      const { document: doc } = new JSDOM(body).window;
      const selector = selectors[hostname];
      const ignoreSelector = ignoreSelectors[hostname];
      if (ignoreSelector) {
        ignoreSelector.forEach((s) => {
          doc.querySelector(s)?.remove();
        });
      }
      // remove scritps and style
      const scripts = [
        ...doc.getElementsByTagName("script"),
        ...doc.getElementsByTagName("style"),
      ];
      scripts.forEach((s) => {
        s.parentNode.removeChild(s);
      });

      const newHtml = beautify(doc.querySelector(selector).outerHTML, {
        indent_size: 2,
        max_preserve_newlines: 0,
      });
      const name = res.options.name;
      const oldHmtl = getUniversityContent(name);

      var diff = Diff.createTwoFilesPatch(name, name, oldHmtl, newHtml);
      if (isEqual(diff, name)) {
        // console.log("EQUAL", name);
      } else {
        html = Diff2Html.html(diff, {
          inputFormat: "diff",
          showFiles: false,
          matching: "lines",
          outputFormat: "side-by-side",
        });

        diffs.push(
          html +
            `\n <p>Source: <a target="_blank" href="${uri.href}">${uri.href}</a></p>\n`
        );
        saveUniveriityContent(name, newHtml);
      }
    }
    done();
  },
});

c.queue(universities);

c.on("drain", () => {
  const time = new Date().toGMTString();
  const log = time + " | " + diffs.length + " diffs\n";
  if (diffs.length) {
    email(getEmailHtml(diffs.join("\n")), {
      from: fromEmail,
      pass: fromEmailPass,
      to: toEmail,
    });
  }
  console.log(log);
  updateLog(log);
});
