"use strict";
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-loop-func */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const puppeteer_1 = __importDefault(require("puppeteer"));
const browser = await puppeteer_1.default.launch();
const page = await browser.newPage();
page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
page.on("error", (msg) => {
    console.error("Page crashed:", msg);
    (0, process_1.exit)(1);
});
page.on("pageerror", (msg) => {
    console.error("Uncaught exception in page:", msg);
    (0, process_1.exit)(1);
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
            (0, process_1.exit)(1);
        }
        return new Promise((resolve) => setTimeout(resolve, 3000));
    });
}
setTimeout(() => {
    console.log("Error: onRenderDone was not triggered within 60 seconds.");
    (0, process_1.exit)(1);
}, 60000);
