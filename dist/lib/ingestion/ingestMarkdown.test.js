"use strict";
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
var ingestMarkdown_1 = require("./ingestMarkdown");
var expectedTranscripts_1 = require("../../constants/test-data/expectedTranscripts");
var setup_1 = __importDefault(require("../database/setup"));
var pool_1 = __importDefault(require("../database/pool"));
describe('data ingestion unit tests', function () {
    var TEST_MARKDOWN_PATH = "".concat(__dirname, "/../../constants/test-markdown");
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, setup_1.default)(pool_1.default)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); });
    it('reads the contents of a file', function () { return __awaiter(void 0, void 0, void 0, function () {
        var expected, actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expected = expectedTranscripts_1.transcriptOne;
                    return [4 /*yield*/, (0, ingestMarkdown_1.readRawFile)('2016-03-23-001.md', TEST_MARKDOWN_PATH)];
                case 1:
                    actual = _a.sent();
                    expect(actual).toEqual(expected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets the names of the files in the target directory', function () { return __awaiter(void 0, void 0, void 0, function () {
        var expected, actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expected = [
                        '2016-03-23-001.md',
                        '2016-03-25-002.md',
                        '2016-03-27-003.md',
                        '2016-11-30-041.md',
                        '2016-12-07-042.md',
                        '2016-12-14-043.md',
                        '2017-11-22-081.md',
                        '2017-11-29-082.md',
                        '2017-12-06-083.md',
                        '2019-01-09-121.md',
                        '2019-01-16-122.md',
                        '2019-01-23-123.md',
                        '2020-04-02-161.md',
                        '2020-04-09-162.md',
                        '2020-04-16-163.md',
                        'LICENSE.md',
                    ];
                    return [4 /*yield*/, (0, ingestMarkdown_1.getAssetNames)(TEST_MARKDOWN_PATH)];
                case 1:
                    actual = _a.sent();
                    expect(actual).toEqual(expected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns the contents of all files in the asset directory, ignoring the license', function () { return __awaiter(void 0, void 0, void 0, function () {
        var expected, actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expected = [
                        expectedTranscripts_1.transcriptOne,
                        expectedTranscripts_1.transcriptTwo,
                        expectedTranscripts_1.transcriptThree,
                        expectedTranscripts_1.transcriptFortyOne,
                        expectedTranscripts_1.transcriptFortyTwo,
                        expectedTranscripts_1.transcriptFortyThree,
                        expectedTranscripts_1.transcriptEightyOne,
                        expectedTranscripts_1.transcriptEightyTwo,
                        expectedTranscripts_1.transcriptEightyThree,
                        expectedTranscripts_1.transcriptOneTwentyOne,
                        expectedTranscripts_1.transcriptOneTwentyTwo,
                        expectedTranscripts_1.transcriptOneTwentyThree,
                        expectedTranscripts_1.transcriptOneSixtyOne,
                        expectedTranscripts_1.transcriptOneSixtyTwo,
                        expectedTranscripts_1.transcriptOneSixtyThree,
                    ];
                    return [4 /*yield*/, (0, ingestMarkdown_1.readAllAssets)(TEST_MARKDOWN_PATH)];
                case 1:
                    actual = _a.sent();
                    expect(actual).toEqual(expected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('seeds the contents of a directory to the database', function () { return __awaiter(void 0, void 0, void 0, function () {
        var expected, actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expected = { success: true, count: 15 };
                    return [4 /*yield*/, (0, ingestMarkdown_1.seedEpisodesIntoDb)(TEST_MARKDOWN_PATH)];
                case 1:
                    actual = _a.sent();
                    expect(actual).toEqual(expected);
                    return [2 /*return*/];
            }
        });
    }); });
});
