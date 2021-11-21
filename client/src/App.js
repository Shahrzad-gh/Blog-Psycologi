import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Article from "./components/Article/Article";
import AddPost from "./components/Article/AddPost";
import SignIn from "./components/signIn/SignIn";
import Settings from "./pages/Settings";
import Edit from "./components/Posts/Edit";
import axios from "axios";
import { authUser, clearState, userSelector } from "./redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

//to save token in cookies
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const { isSuccess } = useSelector(userSelector);

  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar user={isSuccess} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/post/:postId" component={Article} />
          <Route path="/create">{isSuccess ? <AddPost /> : <SignIn />}</Route>
          <Route path="/edit">{isSuccess ? <Edit /> : <SignIn />}</Route>
          <Route path="/signin" component={SignIn} />
          <Route path="/settings">
            {isSuccess ? <Settings /> : <SignIn />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
