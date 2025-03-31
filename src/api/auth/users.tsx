import axios from "axios";
import { BASE_URL } from "./commons";
import { AuthSuccessRequest, ForgotPasswordData, RegisterData, ResetForgotPasswordData } from "../../types/auth";

export async function register(data: RegisterData) {
  try {
    const response = await axios.post(`${BASE_URL}/users`, data);

    return response.data;
  } catch (error: any) {
    console.error(error)
    throw error.response?.data || "An unexpected error occurred";
  }
}

export async function sendForgotPasswordEmail(data: ForgotPasswordData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/forgot-password`,
      data
    );

    return response.data;
  } catch (error: any) {
    console.error(error)
    throw error.response.data;
  }
}

export async function resendEmailActivationToken(token: string) {

  try {
    const response = await axios.post(`${BASE_URL}/users/resend/${token}`)

    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function resetForgotPassword(data: ResetForgotPasswordData, token: string): Promise<AuthSuccessRequest> {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/forgot-password/${token}`,
      data
    );

    return response.data;
  } catch (error) {
    console.error(error)
    throw error;
  }
}

export async function activateUser(token: string) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/activate/${token}`);
    return response.data;
  } catch (error: any) {
    console.error(error)
    throw error
  }
}
