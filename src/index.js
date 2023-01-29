const Diff = require("diff");
const Diff2Html = require("diff2html");
const {
  saveUniveriityContent,
  getUniversityContent,
  getEmailHtml,
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
        doc.querySelector(ignoreSelector)?.remove();
      }
      const newHtml = beautify(doc.querySelector(selector).outerHTML);
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
  if (diffs.length) {
    console.log(`==EMAIL with ${diffs.length} diffs==`);
    // email(getEmailHtml(diffs.join("\n")), {
    //   from: fromEmail,
    //   pass: fromEmailPass,
    //   to: toEmail,
    // });
  } else {
    console.log("==NO UPDATE==");
  }
});
