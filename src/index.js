const Diff = require("diff");
const Diff2Html = require("diff2html");
const {
  saveSiteContent,
  getSiteContent,
  getEmailHtml,
  updateLog,
} = require("./file");
const beautify = require("js-beautify").html;
const Crawler = require("crawler");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const { sites, selectors, ignoreSelectors } = require("./config");
const { isEqual } = require("./diff");
const { email } = require("./email");
const [fromEmail, fromEmailPass, toEmail] = process.argv.slice(2);

const diffs = [];
const errors = [];

const c = new Crawler({
  jQuery: jsdom,
  maxConnections: 10,
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  headers: {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "en-US,en;q=0.9,da;q=0.8,zh-TW;q=0.7,zh;q=0.6,ja;q=0.5,de;q=0.4,fr;q=0.3,pt;q=0.2,zh-CN;q=0.1",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "cookie": "__cf_bm=Jx6axE9.9fCxMvkXAMKQH2leCY3QDw8_UUjHWutsStE-1705958633-1-AeQiu1fCUYPAIzNQgyelbRDvALpIMeIURdJf0cJUxO4l0kwnvpvBMiC1TjNsUWMEWCxqRdJfYY9o1pD9vYPCgXY=; _ga=GA1.2.1698023326.1705958634; _gid=GA1.2.33889270.1705958634"
  },
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

      const content = doc.querySelector(selector);
      if (!content) {
        console.log("No content found for", uri.href, body);
        errors.push(`No content found for ${uri.href}`);
        return;
      }
      const newHtml = beautify(content.outerHTML, {
        indent_size: 2,
        max_preserve_newlines: 0,
      });
      const name = res.options.name;
      const oldHmtl = getSiteContent(name);

      var diff = Diff.createTwoFilesPatch(name, name, oldHmtl, newHtml);
      if (isEqual(diff, name)) {
        // console.log("EQUAL", name);
        console.log('No changes for', uri.href)
        // diffs.push(
        //   `<p>No changes for <a target="_blank" href="${uri.href}">${uri.href}</a></p>\n`
        // )
      } else {
        html = Diff2Html.html(diff, {
          inputFormat: "diff",
          showFiles: false,
          matching: "lines",
          outputFormat: "side-by-side",
        });
        console.log("DIFF", name);
        diffs.push(
          html +
          `\n <p>Source: <a target="_blank" href="${uri.href}">${uri.href}</a></p>\n`
        );
        saveSiteContent(name, newHtml);
      }
    }
    done();
  },
});

c.queue(sites);

c.on("drain", () => {
  const time = new Date().toGMTString();
  const log = time + " | " + diffs.length + " diffs\n";
  if (diffs.length) {
    const emailContent = getEmailHtml(diffs.join("\n"));
    // console.log(emailContent);
    email(emailContent, {
      from: fromEmail,
      pass: fromEmailPass,
      to: toEmail,
    });
  }
  if (errors.length) {
    email(errors.join("\n"), {
      from: fromEmail,
      pass: fromEmailPass,
      to: 'zongyanqi@gmail.com',
    });
  }
  console.log(log);
  updateLog(log);
});
