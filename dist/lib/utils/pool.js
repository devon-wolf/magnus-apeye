"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = __importDefault(require("pg"));
var PGSSLMODE = process.env.PGSSLMODE ? true : false;
var pool = new pg_1.default.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: PGSSLMODE && { rejectUnauthorized: false },
});
pool.on('connect', function () { return console.log('Postgres connected'); });
exports.default = pool;
