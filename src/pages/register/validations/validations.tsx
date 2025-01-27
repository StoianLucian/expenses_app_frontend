import axios from "axios";
import { BASE_URL } from "../../../api/auth/commons";

export async function checkEmail(email: string) {
  try {
    const response = await axios.post(`${BASE_URL}/users/unique`, { email });

    return response.data;
  } catch (error: any) {
    throw error.response?.data || "An unexpected error occurred";
  }
}
