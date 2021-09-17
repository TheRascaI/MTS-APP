import React from 'react';
import './App.css';
import AllPosts from './posts/pages/AllPosts';
import Home from './user/pages/Home';
import Auth from './user/pages/Auth';
import NewPost from './posts/pages/NewPost';
import logo from './assets/svg/logo_bild.svg';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch

} from 'react-router-dom';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import NewChar from './chars/pages/NewChar';
import MyChars from './chars/pages/MyChars';



const App = () => {
  const { token, login, logout, userId, role } = useAuth();

  let routes;
  console.log("userRole:",role);
  
  
  if(token && role !== "OFFI"){
    routes = (
<Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/chars/new" exact>
          <NewChar />
        </Route>
        <Route path="/chars/user/:userId" exact>
          <MyChars />
        </Route>
        <Redirect to="/" />
      </Switch>
);
  }else if(token && role === "OFFI"){
    routes = (
      
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/posts" exact>
          <AllPosts />
        </Route>
        <Route path="/posts/new" exact>
          <NewPost />
        </Route>
        <Route path="/chars/new" exact>
          <NewChar />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        role:role,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
        <footer><img src={logo} width="50" alt="logo" /></footer>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
