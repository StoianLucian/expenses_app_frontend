import axios from "axios";
import { BASE_URL } from "./commons";
import { ForgotPasswordData, RegisterData } from "../../types/auth";

async function register(data: RegisterData) {
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

export { register };
