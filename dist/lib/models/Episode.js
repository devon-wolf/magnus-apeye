"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var pool_1 = __importDefault(require("../database/pool"));
var ingestMarkdown_1 = require("../ingestion/ingestMarkdown");
var marked_1 = require("marked");
var Episode = /** @class */ (function () {
    function Episode(_a) {
        var id = _a.id, episode_number = _a.episode_number, title = _a.title, season = _a.season, release_date = _a.release_date, official = _a.official, transcript = _a.transcript;
        this.id = id;
        this.episodeNumber = episode_number;
        this.title = title;
        this.season = season;
        this.releaseDate = release_date;
        this.official = official;
        this.transcript = transcript;
    }
    Episode.shapeInput = function (rawTranscript) {
        var splitFileContents = rawTranscript.split('---\n\n');
        var metadata = splitFileContents[0];
        var transcript = marked_1.marked
            .parse(splitFileContents[1], { headerIds: false })
            .split('\n')
            .join('');
        var episodeNumber = Number(metadata.split('episode_number:')[1].trim().slice(1, 4));
        var season = episodeNumber <= 40
            ? 1
            : episodeNumber <= 80
                ? 2
                : episodeNumber <= 120
                    ? 3
                    : episodeNumber <= 160
                        ? 4
                        : 5;
        var title = metadata.split('episode_title:')[1].split('\n')[0].trim();
        var releaseDate = new Date(metadata.split('date:')[1].trim().slice(0, 10));
        var official = metadata.split('official:')[1].trim().startsWith('true');
        return {
            episodeNumber: episodeNumber,
            season: season,
            title: title,
            releaseDate: releaseDate,
            official: official,
            transcript: transcript,
        };
    };
    Episode.triggerSeed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('Database seeding triggered...');
                        return [4 /*yield*/, (0, ingestMarkdown_1.seedEpisodesIntoDb)()];
                    case 1:
                        _a.sent();
                        console.log('Database seeding complete.');
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Episode.create = function (rawEpisode) {
        return __awaiter(this, void 0, void 0, function () {
            var input, episodeNumber, title, season, releaseDate, official, transcript, rows, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input = this.shapeInput(rawEpisode);
                        episodeNumber = input.episodeNumber, title = input.title, season = input.season, releaseDate = input.releaseDate, official = input.official, transcript = input.transcript;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, pool_1.default.query("\n            INSERT INTO episodes (episode_number, title, season, release_date, official, transcript)\n            VALUES ($1, $2, $3, $4, $5, $6)\n            RETURNING *\n        ", [episodeNumber, title, season, releaseDate, official, transcript])];
                    case 2:
                        rows = (_a.sent()).rows;
                        return [2 /*return*/, new Episode(rows[0])];
                    case 3:
                        error_2 = _a.sent();
                        console.error(error_2);
                        return [2 /*return*/, error_2];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Episode.bulkCreate = function (episodes) {
        return __awaiter(this, void 0, void 0, function () {
            var bulkEpisodes, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.all(episodes.map(function (episode) { return Episode.create(episode); }))];
                    case 1:
                        bulkEpisodes = _a.sent();
                        return [2 /*return*/, { success: true, count: bulkEpisodes.length }];
                    case 2:
                        error_3 = _a.sent();
                        console.error(error_3);
                        return [2 /*return*/, { success: false, error: error_3 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Episode.getEpisodeCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rows, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, pool_1.default.query("SELECT COUNT(*) FROM episodes")];
                    case 1:
                        rows = (_a.sent()).rows;
                        return [2 /*return*/, rows[0]];
                    case 2:
                        error_4 = _a.sent();
                        console.error(error_4);
                        return [2 /*return*/, {
                                count: error_4,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Episode.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rows, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, pool_1.default.query("\n            SELECT\n            id,\n            episode_number,\n            title,\n            season,\n            release_date,\n            official\n            FROM episodes\n          ")];
                    case 1:
                        rows = (_a.sent()).rows;
                        return [2 /*return*/, rows.map(function (row) {
                                return new Episode(__assign(__assign({}, row), { transcript: "GET /episodes/".concat(row.episode_number, " for transcript") }));
                            })];
                    case 2:
                        error_5 = _a.sent();
                        console.error(error_5);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Episode.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, pool_1.default.query('SELECT * FROM episodes WHERE id=$1', [
                                id,
                            ])];
                    case 1:
                        rows = (_a.sent()).rows;
                        return [2 /*return*/, new Episode(rows[0])];
                    case 2:
                        error_6 = _a.sent();
                        console.error(error_6);
                        return [2 /*return*/, error_6];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Episode.getByEpisodeNumber = function (episodeNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, pool_1.default.query('SELECT * FROM episodes WHERE episode_number=$1', [episodeNumber])];
                    case 1:
                        rows = (_a.sent()).rows;
                        return [2 /*return*/, new Episode(rows[0])];
                    case 2:
                        error_7 = _a.sent();
                        console.error(error_7);
                        return [2 /*return*/, error_7];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Episode;
}());
exports.default = Episode;
