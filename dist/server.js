"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./lib/app"));
var pool_1 = __importDefault(require("./lib/database/pool"));
var PORT = process.env.PORT || 7890;
app_1.default.listen(PORT, function () {
    console.log("Started on ".concat(PORT));
});
process.on('exit', function () {
    console.log('Goodbye!');
    pool_1.default.end();
});
