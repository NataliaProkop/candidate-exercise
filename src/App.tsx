import React from "react";
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { StoreContextProvider } from './components/ContexProvider'
import Dashboard from './views/Dashboard'
import Login from './views/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
const history = createBrowserHistory();

function App() {
  return (
    <>
      <StoreContextProvider>
        <Router history={history}>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <ProtectedRoute path="/">
              <Dashboard />
            </ProtectedRoute>
          </Switch>
        </Router>
      </StoreContextProvider>
    </>
  );
}

export default App;
