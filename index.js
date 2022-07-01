const http = require("http");

const puppeteer = require("puppeteer");

puppeteer.launch().then((browser) => {
  const requestListener = function (req, res) {
    const chunks = [];

    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(Buffer.concat(chunks).toString("utf8"));

        createScreenshot(browser, data)
          .then((buffer) => {
            res.writeHead(200, {
              "Content-Type": "image/" + (data.imageProperties?.type ?? "jpeg"),
            });

            res.end(buffer);
          })
          .catch((err) => {
            console.error(err);

            res.writeHead(500);

            res.end(err.toString());
          });
      } catch (err) {
        console.error(err);

        res.writeHead(500);

        res.end(err.toString());
      }
    });
  };

  const server = http.createServer(requestListener);

  const port = Number(process.env.FM_SAV_HTTP_PORT || 8080);

  server.listen(port, () => {
    console.log(`Listening on port ${port}.`);
  });
});

/**
 *
 * @param {puppeteer.Browser} browser
 * @param {*} options
 * @returns
 */
async function createScreenshot(
  browser,
  {
    viewport = {},
    url,
    imageProperties = { type: "jpeg", quality: 90 },
    searchResultStyle = {}
  }
) {
  const page = await browser.newPage();

  await page.setViewport(viewport);

  await page.evaluateOnNewDocument(`
    Object.defineProperty(window, 'fmHeadless', {
      get() {
        return ${JSON.stringify({ searchResultStyle })}
      }
    })
  `);

  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  const buffer = await page.screenshot(imageProperties);

  await page.close();

  return buffer;
}

// await browser.close();
