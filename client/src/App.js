import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Alert from './component/layout/Alert';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './component/routing/PrivateRoute';
// import AdminRoute from './component/routing/AdminRoute';
import CreateProfile from './component/profile-form/CreateProfile';
import Profiles from './component/profiles/Profiles';
import Profile from './component/profile/Profile';

import Dashboard from './component/dashboard/Dashboard';
import EditProfile from './component/profile-form/EditProfile';
import AddExperience from './component/profile-form/AddExperience';
import AddEducation from './component/profile-form/AddEducation';
import AllProjects from './component/project/AllProjects';
import CreateProject from './component/project-form/CreateProject';
import UpdateProject from './component/project-form/UpdateProject';
import MyProject from './component/project/MyProject';
import Redirection from './component/auth/Redirection';

import Sidebar from './component/layout/Sidebar';
import ClientRoute from './component/routing/ClientRoute';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar></Navbar>
          <Sidebar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />

              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              <Route exact path='/projects' component={AllProjects} />

              <Route
                exact
                path='/redirection/:endpoint'
                component={Redirection}
              />
              <Route
                exact
                path='/client/redirection/:endpoint'
                render={props => <Redirection {...props} usertype='client' />}
              />
              <Route
                exact
                path='client/redirection/:endpoint'
                render={() => <Redirection usertype='client' />}
              />
              <ClientRoute
                exact
                path='/create-project'
                component={CreateProject}
              />
              <ClientRoute
                exact
                path='/edit-project/:id/'
                component={UpdateProject}
              />
              <ClientRoute exact path='/myproject' component={MyProject} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path='/add-experience'
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path='/add-education'
                component={AddEducation}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
