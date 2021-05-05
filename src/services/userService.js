import http from "./HttpService";

const ENDPOINT = "/users";

export function getUsers() {
  return http.get(ENDPOINT);
}

export function getUser(id) {
  return http.get(ENDPOINT + "/" + id);
}

export function register(user) {
  return http.post(ENDPOINT, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}

export function deleteUser(user) {}
