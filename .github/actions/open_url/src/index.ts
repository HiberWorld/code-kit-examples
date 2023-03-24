/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-loop-func */

import { exit } from "process";
import puppeteer from "puppeteer";

// setTimeout(() => {
//   console.log("Error: Watchdog triggered.");
//   exit(1);
// }, 60000);

const open = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));

  page.on("error", (msg) => {
    console.error("Page crashed:", msg);
    exit(1);
  });

  page.on("pageerror", (msg) => {
    console.error("Uncaught exception in page:", msg);
    exit(1);
  });

  let retry = 10;

  while (retry) {
    const url = "http://localhost:5173/";
    console.log("Trying " + url);
    await page
      .goto(url)
      .then(() => {
        retry = 0;
      })
      .catch(() => {
        retry--;

        if (!retry) {
          exit(1);
        }

        return new Promise((resolve) => setTimeout(resolve, 3000));
      });
  }
};

console.log("Starting up...");

(async () => {
  console.log("Trying open...");
  await open();
})();
