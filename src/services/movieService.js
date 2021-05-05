import http from "./HttpService";

const apiEndPoint = "/movies";

function movieUrl(id) {
  return `${apiEndPoint}/${id}`;
}
export function getMovies() {
  return http.get(apiEndPoint);
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    http.put(movieUrl(movie._id), body);
  } else {
    http.post(apiEndPoint, movie);
  }
}

export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}
