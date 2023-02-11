import { Request, Response } from "express";
import {
  saveAndGenerateCodeAccess,
  validateCodeAccess,
} from "../services/access.service";
import { sendSMSService } from "../twilio/sms.twilio-services";

export const createNewAccessCode = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;

    const result = await saveAndGenerateCodeAccess(phoneNumber);

    if (!result.success) {
      return res.status(400).json({
        message: "Phone number is already exist",
      });
    }

    sendSMSService(phoneNumber, result.data.otp);

    return res.status(200).json({
      data: { phoneNumber: phoneNumber },
      message: "Access Code Generated! ",
    });
  } catch (exception: any) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const validateAccessCode = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, otp } = req.body;

    const result = await validateCodeAccess(phoneNumber, otp);

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
  } catch (exception: any) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
