"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const promises_1 = require("fs/promises");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        let details = core.getInput("details");
        let pointsString = core.getInput("points");
        let stop_if_fail = core.getInput("stop-if-fail") == "true";
        console.log(`details: ${details}`);
        console.log(`points: ${pointsString}`);
        console.log(`stop-if-fail: ${stop_if_fail}`);
        console.log(`\n`);
        let latestJsonFile = yield (0, promises_1.readFile)('latest.json');
        let timed = new Date().toISOString().replace(/T/, '_').substring(0, 19).replace('-', '_').replace(':', '_');
        let ref = github.context.ref;
        console.log(`timed ${timed}`);
        console.log(`ref ${ref}`);
        console.log(`latestJSONFile: ${latestJsonFile}`);
        console.log(timed);
        if (stop_if_fail)
            core.error('not get the all points.');
    });
}
run();
