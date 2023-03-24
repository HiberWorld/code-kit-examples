/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-loop-func */

import { exit } from "process";
import { exec } from "child_process";
import puppeteer from "puppeteer";
import * as core from "@actions/core";

// setTimeout(() => {
//   console.log("Error: Watchdog triggered.");
//   exit(1);
// }, 60000);

const cwd = __dirname + "/..";

const open = async () => {
  console.log("Opening page...");

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

const promise = new Promise<void>((resolve) => {
  console.log("...");

  exec(
    `cd ${cwd} && npm i && cd ./node_modules/puppeteer && npm run postinstall`,
    (
      error: import("child_process").ExecException | null,
      stdout: string,
      stderr: string
    ): void => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      resolve();
    }
  );
});

const promise2 = new Promise<void>((resolve) => {
  console.log("Listing");

  exec(
    `cd ${cwd} && ls`,
    (
      error: import("child_process").ExecException | null,
      stdout: string,
      stderr: string
    ): void => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      resolve();
    }
  );
});

(async () => {
  console.log("Waiting for listing...");
  await promise2;

  console.log("Waiting for install...");
  await promise;

  console.log("Trying open...");
  await open();
})();
