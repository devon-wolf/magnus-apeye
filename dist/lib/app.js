"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var episodes_1 = __importDefault(require("./controllers/episodes"));
var pool_1 = __importDefault(require("./database/pool"));
var setup_1 = __importDefault(require("./database/setup"));
var error_handling_1 = require("./middleware/error-handling");
var app = (0, express_1.default)();
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// TODO replace this, should work for now
app.post('/setup-db', function (req, res, next) {
    return (0, setup_1.default)(pool_1.default)
        .then(function () { return res.send('Database setup complete.'); })
        .catch(next);
});
app.use('/episodes', episodes_1.default);
app.use(error_handling_1.handleNotFound);
app.use(error_handling_1.handleError);
exports.default = app;
