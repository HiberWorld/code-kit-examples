"use strict";
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-loop-func */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var process_1 = require("process");
var child_process_1 = require("child_process");
// setTimeout(() => {
//   console.log("Error: Watchdog triggered.");
//   exit(1);
// }, 60000);
var promise = new Promise(function (resolve) {
    console.log("...");
    (0, child_process_1.exec)("npm i && cd ./node_modules/puppeteer && npm run postinstall", function (error, stdout, stderr) {
        if (error) {
            console.log("error: ".concat(error.message));
            return;
        }
        if (stderr) {
            console.log("stderr: ".concat(stderr));
            return;
        }
        console.log("stdout: ".concat(stdout));
        resolve();
    });
});
var promise2 = new Promise(function (resolve) {
    console.log("Listing");
    (0, child_process_1.exec)("pwd && ls && ls node_modules", function (error, stdout, stderr) {
        if (error) {
            console.log("error: ".concat(error.message));
            return;
        }
        if (stderr) {
            console.log("stderr: ".concat(stderr));
            return;
        }
        console.log("stdout: ".concat(stdout));
        resolve();
    });
});
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Waiting for install...");
                return [4 /*yield*/, promise];
            case 1:
                _a.sent();
                console.log("Waiting for listing...");
                return [4 /*yield*/, promise2];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
var puppeteer_1 = __importDefault(require("puppeteer"));
var open = function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, retry, url;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer_1["default"].launch()];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                page.on("console", function (msg) { return console.log("PAGE LOG:", msg.text()); });
                page.on("error", function (msg) {
                    console.error("Page crashed:", msg);
                    (0, process_1.exit)(1);
                });
                page.on("pageerror", function (msg) {
                    console.error("Uncaught exception in page:", msg);
                    (0, process_1.exit)(1);
                });
                retry = 10;
                _a.label = 3;
            case 3:
                if (!retry) return [3 /*break*/, 5];
                url = "http://localhost:5173/";
                console.log("Trying " + url);
                return [4 /*yield*/, page
                        .goto(url)
                        .then(function () {
                        retry = 0;
                    })["catch"](function () {
                        retry--;
                        if (!retry) {
                            (0, process_1.exit)(1);
                        }
                        return new Promise(function (resolve) { return setTimeout(resolve, 3000); });
                    })];
            case 4:
                _a.sent();
                return [3 /*break*/, 3];
            case 5: return [2 /*return*/];
        }
    });
}); };
console.log("Starting up...");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Trying open...");
                return [4 /*yield*/, open()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
