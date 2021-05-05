import { Link } from "react-router-dom";
import Like from "./Like";
import Table from "./common/Table";
import auth from "../services/authService";
const MovieTable = ({ movies, onLike, onDelete, onSort, sortedColumn }) => {
  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => {
        return auth.getCurrentUser() ? (
          <Link to={`/movies/${movie._id}`} data={movie}>
            {movie.title}
          </Link>
        ) : (
          movie.title
        );
      },
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) =>
        auth.getCurrentUser() && (
          <Like isLiked={movie.liked} onToggleLike={() => onLike(movie)} />
        ),
    },
    {
      key: "delete",
      content: (movie) =>
        auth.getCurrentUser() &&
        auth.getCurrentUser().isAdmin && (
          <button className="btn btn-danger" onClick={() => onDelete(movie)}>
            Delete
          </button>
        ),
    },
  ];
  return (
    <Table
      columns={columns}
      sortedColumn={sortedColumn}
      onSort={onSort}
      tableData={movies}
    />
    // <table className="table">
    //   <TableHeader columns={columns} sortColum={sortedColumn} onSort={onSort} />
    //   <TableBody data={movies} columns={columns} />
    // </table>
  );
};

export default MovieTable;
