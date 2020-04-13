import React from 'react';
import PdfState from './context/pdf/PdfState';
import WrappedAddNewPdfForm from './components/pages/AddPdf';
import WrappedEditPdfForm from './components/pages/EditPdf'
import AllPdfs from './components/Cards/AllPdfs';
import AllFilms from './components/Cards/AllFilms';
import Home from './components/pages/Home';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
require('dotenv/config');

function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={process.env.ALERT_WAIT_TIME}>
      <div className='App'>
        <PdfState>
          <Router>
            <Switch>
              <Route exact path='/' component={Home}></Route>

              <Route
                exact
                path='/newpdf'
                component={WrappedAddNewPdfForm}
              ></Route>
              <Route exact path='/allpdfs' component={AllPdfs}></Route>
              <Route exact path='/allfilms' component={AllFilms}></Route>
              <Route
                exact
                path='/editpdf'
                component={WrappedEditPdfForm}
              ></Route>
            </Switch>
          </Router>
        </PdfState>
      </div>
    </SnackbarProvider>
  );
}

export default App;
