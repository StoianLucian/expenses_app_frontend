import axios from "axios";
import { BASE_URL } from "./commons";
import { ForgotPasswordData, RegisterData } from "../../types/auth";

export async function register(data: RegisterData) {
  try {
    const response = await axios.post(`${BASE_URL}/users`, data);

    return response.data;
  } catch (error: any) {
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
    throw error.response.data;
  }
}

export async function resendEmailActivationToken(token: string | undefined) {

  try {
    const response = await axios.post(`${BASE_URL}/users/resend/${token}`)

    return response
  } catch (error) {
    throw error
  }
}

export async function resetForgotPassword(data: any) {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/forgot-password/${data.token}`,
      data
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function activateUser(token: string | undefined) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/activate/${token}`);
    return response.data;
  } catch (error: any) {

    throw error
  }
}
