import * as firebase from "firebase-admin";
import { generateAccessCode } from "../helpers/accessCode.helper";

interface ReturnResult {
  success: boolean;
  data?: any;
  message?: string | object;
}

export const saveAndGenerateCodeAccess = async (phoneNumber: string) => {
  try {
    const store = firebase.firestore();

    const otp = generateAccessCode();

    const result: ReturnResult = await store
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
  } catch (exception: any) {
    throw new Error(exception);
  }
};

export const validateCodeAccess = async (phoneNumber: string, otp: string) => {
  try {
    const store = firebase.firestore();
    const result = await store
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
  } catch (exception: any) {
    throw new Error(exception);
  }
};
