/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-loop-func */
import { exit } from "process";
import puppeteer from "puppeteer";
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
    await page
        .goto("http://127.0.0.1:5173/")
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
setTimeout(() => {
    console.log("Error: onRenderDone was not triggered within 60 seconds.");
    exit(1);
}, 60000);
