import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Views/Home";
import Search from "./Views/Search";
import About from "./Views/About";
import Login from "./Views/Login";
import Register from "./Views/Register";
import Test from "./Views/Test";
import Nft from "./Components/Nft";
import Seller from "./Components/Seller";
import UserProfile from "./Views/UserProfile";
import ScrollToTop from "./Components/ScrollToTop";
import PrivateRoute from "./Components/PrivateRoute";
import Create from "./Views/Create";
import Settings from "./Views/Settings";
import Error from "./Components/Error";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search" exact component={Search} />
        <Route path="/about" component={About} />
        <Route path="/nft/:id" component={Nft} />
        <Route path="/user/:username" component={Seller} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/test" component={Test} />
        
        <PrivateRoute path="/profile" exact>
          <UserProfile />
        </PrivateRoute>
        <PrivateRoute path="/create" exact>
          <Create />
        </PrivateRoute>
        <PrivateRoute path="/settings" exact>
          <Settings />
        </PrivateRoute>

        <Route path="*">
          <Error msg="Page not found!" status="404" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
