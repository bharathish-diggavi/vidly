import { getMovies } from "../services/fakeMovieService";
import { useState } from "react";
import MoviesTable from "./MoviesTable";
import Pagination from "./Pagination";
import { paginate } from "../utils/paginate";
import Sort from "./Sort";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";
// import './css/movies.css'

const Movies = () => {
  //states
  const [movies, setMovies] = useState(getMovies());
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([
    { name: "All Genres" },
    ...getGenres(),
  ]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  //handle delete
  const handleDelete = (movie) => {
    setMovies([...movies].filter((m) => m._id !== movie._id));
  };

  //handle like
  const handleLike = (movie) => {
    setMovies(
      [...movies].map((m) =>
        m._id === movie._id ? { ...m, liked: !movie.liked } : m
      )
    );
  };

  //handeling page click
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //handling filter
  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  //handeling sort
  const handleSort = (sort) => {
    // if (path === sortColumn.path) {
    //   setSortColumn({
    //     path,
    //     order: sortColumn.order === "asc" ? "desc" : "asc",
    //   });
    // } else {
    //   setSortColumn({ path, order: "asc" });
    // }
    setSortColumn(sort);
  };

  const filteredMovies =
    selectedGenre && selectedGenre._id
      ? movies.filter((movie) => movie.genre._id === selectedGenre._id)
      : movies;

  const sorted = _.orderBy(
    filteredMovies,
    [sortColumn.path],
    [sortColumn.order]
  );
  // console.log(
  //   sortColumn.path,
  //   sorted.map((s) => s)
  // );
  const { length: movieCount } = filteredMovies;

  const moviesToDisplay = paginate(sorted, pageSize, currentPage);
  return (
    <>
      <div className="movies__container row">
        <div className="sidebar__container col-3">
          <Sort
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={handleGenreSelect}
          />
        </div>
        <div className="movies__Table__container col">
          <h2>There are {movieCount} available</h2>
          <MoviesTable
            movies={moviesToDisplay}
            onLike={handleLike}
            onDelete={handleDelete}
            onSort={handleSort}
            sortedColumn={sortColumn}
          />
        </div>
      </div>
      <Pagination
        totalCount={movieCount}
        pageSize={pageSize}
        onPageClick={handlePageClick}
        currentPage={currentPage}
      />
    </>
  );
};

export default Movies;
