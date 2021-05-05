import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/movieService";
import { useState } from "react";
import MoviesTable from "./MoviesTable";
import Pagination from "./Pagination";
import { paginate } from "../utils/paginate";
import Sort from "./Sort";
import { getGenres } from "../services/genreService";
import _ from "lodash";
// import './css/movies.css'
import { SearchBox } from "./common/FormFeilds";
import { toast } from "react-toastify";

const Movies = ({ user }) => {
  //states
  const [movies, setMovies] = useState();
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");

  //component mount
  useEffect(async () => {
    const { data: genres } = await getGenres([]);
    const { data: movies } = await getMovies([]);
    setGenres([{ name: "All Genres" }, ...genres]);
    setMovies(movies);
  }, []);

  //handle delete
  const handleDelete = async (movie) => {
    const originalMovies = movies;
    const moviesAfter = originalMovies.filter((m) => m._id !== movie._id);
    setMovies(moviesAfter);
    try {
      console.log(movie);
      const data = await deleteMovie(movie._id);
      console.log(data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Couldn't find movie. It may have been deleted already");
      }
      setMovies(originalMovies);
    }
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
    setSearchQuery("");
  };

  //handeling sort
  const handleSort = (sort) => {
    setSortColumn(sort);
  };

  const getPageData = () => {
    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? movies.filter((movie) => movie.genre._id === selectedGenre._id)
        : movies;

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const filteredUsingSearchQuery = sorted.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return {
      movieCount: filteredUsingSearchQuery.length,
      moviesToDisplay: paginate(
        filteredUsingSearchQuery,
        pageSize,
        currentPage
      ),
    };
  };

  //handleling search
  const handleSearch = (query) => {
    setSelectedGenre("");
    setSearchQuery(query);
    setCurrentPage(1);
  };
  const { movieCount, moviesToDisplay } = getPageData();
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
          {user && (
            <Link to="/movies/new">
              <button
                className="btn btn-primary"
                style={{ padding: ".5em 2em", margin: ".5em" }}
              >
                New
              </button>
            </Link>
          )}
          <SearchBox
            value={searchQuery}
            placeholder="Search..."
            onChange={handleSearch}
          />
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
