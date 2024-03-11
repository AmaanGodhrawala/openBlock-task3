"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mostSignificantBit = void 0;
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const constant_1 = require("./constant");
const TWO = 2n;
const POWERS_OF_2 = [128, 64, 32, 16, 8, 4, 2, 1].map((pow) => [pow, TWO ** BigInt(pow)]);
function mostSignificantBit(x) {
    (0, tiny_invariant_1.default)(x > constant_1.ZERO, 'ZERO');
    (0, tiny_invariant_1.default)(x <= constant_1.MaxUint256, 'MAX');
    let msb = 0;
    for (const [power, min] of POWERS_OF_2) {
        if (x >= min) {
            // eslint-disable-next-line operator-assignment
            x = x >> BigInt(power);
            msb += power;
        }
    }
    return msb;
}
exports.mostSignificantBit = mostSignificantBit;
