import { UserType } from "@/@types/user";
import axios from "axios";
import { API_URL } from "../axios/config";
import { createDriver, getDriver } from "./driverService";
import { DriverType } from "@/@types/driver";

export const registerUser = async (
  user: UserType,
  update: (driver: DriverType) => void
) => {
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

    // CREATE AND SAVES DRIVER
    await createDriver(userId, update);

    return loggedUser.data;
  } catch (error) {
    console.log("Error at service registerUser: ", error);
  }
};


export const loginUser = async (
  user: UserType,
  confirmPassword: string,
  update: (driver: DriverType) => void
) => {
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
    // SAVES EXISTING DRIVER
    await getDriver(res.data.user.id, update);

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

type newUser = {
  id?: number;
  name?: string;
  email?: string;
  currentPassword: string;
  newPassword?: string;
};

export const updateUser = async (user: newUser) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  if (!user.currentPassword) return;

  try {
    const res = await axios.put(`${API_URL}/users/${user.id}`, user, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    console.log("Error at service updateUser: ", error);
  }
};
