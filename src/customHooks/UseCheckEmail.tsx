import axios from "axios";
import {  useState } from "react";
import { BASE_URL } from "../api/auth/commons";

export const UseWidth = () => {
  const [error, setError] = useState({ isError: false, message: "" });
  const [isDisabled, setIsDisabled] = useState(false);

  async function checkEmail(email: string) {
    try {
      const response = await axios.post(`${BASE_URL}/users/unique`, email);

      if (response.data.error == true) {
        setError({ isError: true, message: response.data.message });
        setIsDisabled(true);
      } else {
        setError({ isError: false, message: response.data.message });
        setIsDisabled(false);
      }
    } catch (error: any) {
      throw error.response?.data || "An unexpected error occurred";
    }
  }

  return { checkEmail };
};
