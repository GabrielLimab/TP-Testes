import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Movie from "./components/Movie/Movie";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Profile from "./components/Profile/Profile";
import { SearchProvider } from "./components/Ranking/SearchContext";
import SearchPage from "./components/Ranking/SearchPage";
import Review from "./components/Review/Review";
import UserPage from "./components/UserPage/UserPage";

function App() {
  return (
    <div className="App">
      <Router>
        <SearchProvider>
          <Layout>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route element={<Home />} path="/" />
                <Route element={<Profile />} path="users/:teste" />
                <Route element={<Movie />} path="movies/:id" />
                <Route element={<h1>Not Found</h1>} path="*" />
                <Route element={<UserPage />} path="user" />
                <Route element={<SearchPage />} path="search" />
                <Route element={<Review />} path="review" />
              </Route>
              <Route element={<Auth />} path="auth" />
            </Routes>
          </Layout>
        </SearchProvider>
      </Router>
    </div>
  );
}

export default App;
