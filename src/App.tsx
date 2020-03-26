import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import NotificationContainer from './components/notification/NotificationContainer';
import { Switch, Redirect, Route, useLocation } from 'react-router';
import { useTypeSelector } from './redux/helper/selector.helper';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

const App: React.FC = () => (
  <Provider store={configureStore()}>
    <div>
      <NotificationContainer />
      <BrowserRouter>
        <Switch>
          <AuthRoute path="/home" component={Home} exact />{' '}
          {/*<AuthRoute path="/decision/new" component={NewDecisionPage} exact />*/}
          <Route path="/login" component={LoginPage} exact />
          <Route path="/register" component={RegisterPage} exact />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/error" exact component={ErrorPage} />
          <Redirect to="/error" />
        </Switch>
      </BrowserRouter>
    </div>
  </Provider>
);

export default App;

const AuthRoute = ({ component: Component, ...rest }: any) => {
  const { authUser } = useTypeSelector(s => s.authState);
  const location = useLocation();
  return (
    <Route
      {...rest}
      render={props =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
