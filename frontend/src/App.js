import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import Home from './components/pages/HomePage/Home';
import Matching from './components/pages/Matching/Matching';
import Groups from './components/pages/Groups/Groups';
import Settings from './components/pages/Settings/Settings';
import Tutorial from './components/pages/Tutorial/Tutorial'
import SignUp from './components/pages/SignUp/SignUp';
import Navbar from './components/assets/Navbar/Navbar';
import Footer from './components/assets/Footer/Footer';
import Logout from './components/assets/SignIn/Logout';
import Error404 from './components/assets/Error/Error404';
import UserStore from './components/assets/stores/UserStore';

function App() {

  const isLoggedIn = UserStore.isLoggedIn;

  if (isLoggedIn) {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/groups' component={Groups} />
          <Route path='/settings' component={Settings} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/logout' component={Logout} />
          <Route path='/tutorial' component={Tutorial} />
          <Route path='/match' component={Matching} />
          <Route component={Error404} ><Redirect to="/" /></Route>
        </Switch>
        <Footer />
      </Router>
    );
  } else {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/sign-up' component={SignUp} />
          <Route component={Error404} ><Redirect to="/" /></Route>
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
