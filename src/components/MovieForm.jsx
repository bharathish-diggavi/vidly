import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Joi from "joi-browser";
import Form from "./common/Form";

class Movieform extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  async populateMovies() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId && movieId.toLowerCase() === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  mapToViewModel({ _id, title, genre, numberInStock, dailyRentalRate }) {
    return {
      _id,
      title,
      genreId: genre._id,
      numberInStock,
      dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.replace("/movies");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Movie</h1>
          {this.renderInputFiels("title", "Title", true)}
          {this.renderSelect("genreId", "Genere", this.state.genres)}
          {this.renderInputFiels("numberInStock", "Number In Stock")}
          {this.renderInputFiels("dailyRentalRate", "Rate")}
          {this.renderSubmitButton("Save")}
        </form>
      </div>
    );
  }
}

export default Movieform;
