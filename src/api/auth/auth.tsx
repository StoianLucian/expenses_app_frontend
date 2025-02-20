import axios from "axios";
import { BASE_URL } from "./commons";
import { LoginData } from "../../types/auth";

async function login(data: LoginData) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, data, {
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}

export { login };
