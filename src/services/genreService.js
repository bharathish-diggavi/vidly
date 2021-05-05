import http from "./HttpService";

const ENDPOINT = "/genres";

export function getGenres() {
  return http.get(ENDPOINT);
}

export function getGenre(id) {
  return http.get(ENDPOINT + "/" + id);
}
