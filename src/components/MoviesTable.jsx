import Like from "./Like";
import TableHeader from "./common/TableHeader";
import TableBody from "./common/TableBody";
const MovieRow = ({ movies, onLike, onDelete, onSort, sortedColumn }) => {
  const columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like isLiked={movie.liked} onToggleLike={() => onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button className="btn btn-danger" onClick={() => onDelete(movie)}>
          {" "}
          Delete
        </button>
      ),
    },
  ];
  return (
    <table className="table">
      <TableHeader columns={columns} sortColum={sortedColumn} onSort={onSort} />
      <TableBody data={movies} columns={columns} />
    </table>
  );
};

export default MovieRow;
