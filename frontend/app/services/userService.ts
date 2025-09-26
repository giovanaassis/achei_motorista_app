import { UserType } from "@/@types/user";
import axios from "axios";
import { API_URL } from "../axios/config";

export const registerUser = async (user: UserType) => {
  try {
    const res = await axios.post("api/auth/register", {
      ...user,
      username: user.email,
    });
    localStorage.setItem("token", res.data.jwt);

    const userId = res.data.user.id;
    const loggedUser = await axios.put(
      `${API_URL}/users/${userId}`,
      { name: user.username },
      { headers: { Authorization: `Bearer ${res.data.jwt}` } }
    );

    return loggedUser.data;
  } catch (error) {
    console.log("Error at service registerUser: ", error);
  }
};

export const loginUser = async (user: UserType, confirmPassword: string) => {
  try {
    // confirm password
    if (confirmPassword !== user.password) {
      alert("The passwords have to be the same!");
      return;
    }

    const res = await axios.post("api/auth/login", {
      identifier: user?.email,
      password: user?.password,
    });
    localStorage.setItem("token", res.data.jwt);

    return res.data.user;
  } catch (error) {
    console.log("Error at service loginUser: ", error);
  }
};

export const getMe = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await axios.get(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
    
  } catch (error) {
    console.log("Error at service getMe: ", error);
  }
};
