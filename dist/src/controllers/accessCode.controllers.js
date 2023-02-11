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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAccessCode = exports.createNewAccessCode = void 0;
const access_service_1 = require("../services/access.service");
const sms_twilio_services_1 = require("../twilio/sms.twilio-services");
const createNewAccessCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phoneNumber } = req.body;
        const result = yield (0, access_service_1.saveAndGenerateCodeAccess)(phoneNumber);
        if (!result.success) {
            return res.status(400).json({
                message: "Phone number is already exist",
            });
        }
        (0, sms_twilio_services_1.sendSMSService)(phoneNumber, result.data.otp);
        return res.status(200).json({
            data: { phoneNumber: phoneNumber },
            message: "Access Code Generated! ",
        });
    }
    catch (exception) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.createNewAccessCode = createNewAccessCode;
const validateAccessCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phoneNumber, otp } = req.body;
        const result = yield (0, access_service_1.validateCodeAccess)(phoneNumber, otp);
        if (!result) {
            return res.status(401).json({
                success: false,
                message: "OTP is incorrect!",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Login successfully!",
        });
    }
    catch (exception) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.validateAccessCode = validateAccessCode;
