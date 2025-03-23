import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

// Get the token
const token = getUserFromStorage();

// Fetch user profile
export const getUserProfileAPI = async () => {
  const response = await axios.get(`${BASE_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Login
export const loginAPI = async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}/users/login`, {
    email,
    password,
  });
  return response.data;
};

// Register
export const registerAPI = async ({ email, password, username }) => {
  const response = await axios.post(`${BASE_URL}/users/register`, {
    email,
    password,
    username,
  });
  return response.data;
};

// Change password
export const changePasswordAPI = async (newPassword) => {
  const response = await axios.put(
    `${BASE_URL}/users/change-password`,
    { newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Update profile
export const updateProfileAPI = async ({ email, username }) => {
  const response = await axios.put(
    `${BASE_URL}/users/update-profile`,
    { email, username },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
