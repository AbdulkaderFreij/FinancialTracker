import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Welcome from '../pages/welcome';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import ForgotPassword from '../pages/auth/forgot-password';
import ResetPassword from '../pages/auth/reset-password';
import NotFound from '../pages/404';
import Dashboard from '../pages/home';
import Profile from '../pages/Profile';
import AuthRoute from './auth-route';
import GuestRoute from './guest-route';
import { useAuth } from '../context/auth';
import FullPageSpinner from '../components/full-page-spinner';
import Transactions from '../pages/Transactions';
import Goals from '../pages/Goals';
// import Reports from '../pages/Reports';

function App () {
  let { initializing } = useAuth();
  return (
    initializing
      ? <FullPageSpinner />
      : <Router>
        <div className="min-h-screen">
          <Switch>
            <GuestRoute exact path="/" component={Welcome} title="welcome" />
            <GuestRoute path="/register" component={Register} title="register" />
            <GuestRoute path="/login" component={Login} title="login"/>
            <GuestRoute path="/forgot-password" component={ForgotPassword} title="forgot password"/>
            <GuestRoute path="/password/reset/:token" component={ResetPassword} title="reset password"/>
            <AuthRoute path="/dashboard" component={Dashboard} title="dashboard"/>
            <AuthRoute path="/transactions" component={Transactions} title="transactions"/>
            <AuthRoute path="/goals" component={Goals} title="goals"/>
            {/* <AuthRoute path="/reports" component={Reports} title="reports"/> */}
            <AuthRoute path="/profile/:id" component={Profile} title="profile"/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Router>
  );
};

export default App;
