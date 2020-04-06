import React from 'react';
import DocState from './context/doc/DocState';
import WrappedAddNewDocForm from './components/pages/AddDoc';
import WrappedEditDocForm from './components/pages/EditDoc'
import AllCards from './components/Cards/AllCards';
import Home from './components/pages/Home';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
require('dotenv/config');

function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={process.env.ALERT_WAIT_TIME}>
      <div className='App'>
        <DocState>
          <Router>
            <Switch>
              <Route exact path='/' component={Home}></Route>
              <Route
                exact
                path='/newdoc'
                component={WrappedAddNewDocForm}
              ></Route>
              Edit <Route exact path='/alldocs' component={AllCards}></Route>
              <Route
                exact
                path='/editdoc/:id'
                component={WrappedEditDocForm}
              ></Route>
            </Switch>
          </Router>
        </DocState>
      </div>
    </SnackbarProvider>
  );
}

export default App;
