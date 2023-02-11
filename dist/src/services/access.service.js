"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.validateCodeAccess = exports.saveAndGenerateCodeAccess = void 0;
const firebase = __importStar(require("firebase-admin"));
const accessCode_helper_1 = require("../helpers/accessCode.helper");
const saveAndGenerateCodeAccess = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = firebase.firestore();
        const otp = (0, accessCode_helper_1.generateAccessCode)();
        const result = yield store
            .collection("accessVerification")
            .doc(phoneNumber)
            .create({ phoneNumber, otp })
            .then((result) => ({
            data: {
                result,
                otp,
            },
            success: true,
        }))
            .catch((error) => ({
            message: error.message,
            success: false,
        }));
        return result;
    }
    catch (exception) {
        throw new Error(exception);
    }
});
exports.saveAndGenerateCodeAccess = saveAndGenerateCodeAccess;
const validateCodeAccess = (phoneNumber, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = firebase.firestore();
        const result = yield store
            .collection("accessVerification")
            .doc(phoneNumber)
            .get()
            .then((result) => {
            const data = result.data() || { otp: "", phoneNumber };
            const { otp: originOTP } = data;
            if (originOTP.toString() !== otp) {
                return false;
            }
            return true;
        })
            .catch(() => false);
        return result;
    }
    catch (exception) {
        throw new Error(exception);
    }
});
exports.validateCodeAccess = validateCodeAccess;
