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
var setup_1 = __importDefault(require("../lib/database/setup"));
var Episode_1 = __importDefault(require("../lib/models/Episode"));
var pool_1 = __importDefault(require("../lib/database/pool"));
var expectedTranscripts_1 = require("../constants/test-data/expectedTranscripts");
var expectedEpisodes_1 = require("../constants/test-data/expectedEpisodes");
// TODO fix dates
describe('Episode model', function () {
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, setup_1.default)(pool_1.default)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('exists', function () {
        expect(Episode_1.default).toBeTruthy();
    });
    it('creates a new episode in the db', function () { return __awaiter(void 0, void 0, void 0, function () {
        var expected, actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expected = __assign(__assign({}, expectedEpisodes_1.episodeOne), { id: expect.any(String), releaseDate: expect.any(Date) });
                    return [4 /*yield*/, Episode_1.default.create(expectedTranscripts_1.transcriptOne)];
                case 1:
                    actual = _a.sent();
                    expect(actual).toEqual(expected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('creates episodes in bulk', function () { return __awaiter(void 0, void 0, void 0, function () {
        var expected, actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expected = { success: true, count: 3 };
                    return [4 /*yield*/, Episode_1.default.bulkCreate([
                            expectedTranscripts_1.transcriptOne,
                            expectedTranscripts_1.transcriptTwo,
                            expectedTranscripts_1.transcriptThree,
                        ])];
                case 1:
                    actual = _a.sent();
                    expect(actual).toEqual(expected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets a count of all episodes', function () { return __awaiter(void 0, void 0, void 0, function () {
        var expected, actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expected = { count: expect.any(String) };
                    return [4 /*yield*/, Episode_1.default.getEpisodeCount()];
                case 1:
                    actual = _a.sent();
                    expect(actual).toEqual(expected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets all episodes', function () { return __awaiter(void 0, void 0, void 0, function () {
        var expected, actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expected = [
                        __assign(__assign({}, expectedEpisodes_1.episodeOne), { id: '1', releaseDate: expect.any(Date), transcript: "GET /episodes/1 for transcript" }),
                        __assign(__assign({}, expectedEpisodes_1.episodeTwo), { id: '2', releaseDate: expect.any(Date), transcript: "GET /episodes/2 for transcript" }),
                        __assign(__assign({}, expectedEpisodes_1.episodeThree), { id: '3', releaseDate: expect.any(Date), transcript: "GET /episodes/3 for transcript" }),
                    ];
                    return [4 /*yield*/, Episode_1.default.bulkCreate([expectedTranscripts_1.transcriptOne, expectedTranscripts_1.transcriptTwo, expectedTranscripts_1.transcriptThree])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, Episode_1.default.getAll()];
                case 2:
                    actual = _a.sent();
                    expect(actual).toEqual(expected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets an episode by its id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var episode, expected, actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Episode_1.default.create(expectedTranscripts_1.transcriptOne)];
                case 1:
                    episode = (_a.sent());
                    expected = __assign(__assign({}, expectedEpisodes_1.episodeOne), { id: episode.id, releaseDate: expect.any(Date) });
                    return [4 /*yield*/, Episode_1.default.getById(episode.id)];
                case 2:
                    actual = _a.sent();
                    expect(actual).toEqual(expected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets an episode by episode number', function () { return __awaiter(void 0, void 0, void 0, function () {
        var expected, actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expected = __assign(__assign({}, expectedEpisodes_1.episodeTwo), { id: expect.any(String), releaseDate: expect.any(Date) });
                    return [4 /*yield*/, Episode_1.default.bulkCreate([expectedTranscripts_1.transcriptOne, expectedTranscripts_1.transcriptTwo, expectedTranscripts_1.transcriptThree])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, Episode_1.default.getByEpisodeNumber(2)];
                case 2:
                    actual = _a.sent();
                    expect(actual).toEqual(expected);
                    return [2 /*return*/];
            }
        });
    }); });
});
