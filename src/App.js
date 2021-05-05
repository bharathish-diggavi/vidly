import { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LoginForm from "./components/LoginForm";
import Movies from "./components/Movies";
import NotFound from "./components/NotFound";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NavBar from "./components/NavBar";
import Movieform from "./components/MovieForm";
import RegistrationForm from "./components/RegistrationForm";
import Logout from "./components/Logout";
import auth from "./services/authService";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/ProtectedRoute";

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  return (
    <>
      <ToastContainer />
      <NavBar user={user} />
      <main className="App container">
        <Switch>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/logout" component={Logout}></Route>
          <ProtectedRoute path="/movies/:id" component={Movieform} />
          <Route
            path="/movies"
            render={(props) => <Movies {...props} user={user} />}
          ></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/register" component={RegistrationForm}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" to="/movies" exact></Redirect>
          <Redirect to="/not-found" />
          {/* <Movies /> */}
        </Switch>
      </main>
    </>
  );
};

export default App;
