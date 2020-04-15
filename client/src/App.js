import React from 'react';
import PdfState from './context/pdf/PdfState';
import FilmState from './context/film/FilmState';
import AuthState from './context/auth/AuthState';
import WrappedAddNewPdfForm from './components/pages/AddPdf';
import WrappedAddNewFilmForm from './components/pages/AddFilm';
import WrappedEditPdfForm from './components/pages/EditPdf';
import WrappedEditFilmForm from './components/pages/EditFilm';
import AllPdfs from './components/pages/AllPdfs';
import Login from './components/auth/Login';
import AllFilms from './components/pages/AllFilms';
import Home from './components/pages/Home';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
require('dotenv/config');

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={process.env.ALERT_WAIT_TIME}
    >
      <div className='App'>
        <Router>
          <AuthState>
            <PdfState>
              <FilmState>
                <Switch>
                  <Route exact path='/login' component={Login}></Route>
                  <Route exact path='/' component={Home}></Route>

                  <Route
                    exact
                    path='/newpdf'
                    component={WrappedAddNewPdfForm}
                  ></Route>
                  <Route
                    exact
                    path='/newfilm'
                    component={WrappedAddNewFilmForm}
                  ></Route>
                  <Route exact path='/allpdfs' component={AllPdfs}></Route>
                  <Route exact path='/allfilms' component={AllFilms}></Route>
                  <Route
                    exact
                    path='/editpdf'
                    component={WrappedEditPdfForm}
                  ></Route>
                  <Route
                    exact
                    path='/editfilm'
                    component={WrappedEditFilmForm}
                  ></Route>
                </Switch>
              </FilmState>
            </PdfState>
          </AuthState>
        </Router>
      </div>
    </SnackbarProvider>
  );
}

export default App;
