import jwtDecode from "jwt-decode";
import http from "./HttpService";

const ENDPOINT = "/auth";
const TOKEN_KEY = "token";

http.setJwtToken(getJwtToken());

async function login(email, password) {
  const { data: jwt } = await http.post(ENDPOINT, { email, password });
  localStorage.setItem(TOKEN_KEY, jwt);
}

function loginWithJwt(jwt) {
  localStorage.setItem(TOKEN_KEY, jwt);
}

async function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

function getCurrentUser() {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

function getJwtToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export default { login, logout, getCurrentUser, loginWithJwt, getJwtToken };
