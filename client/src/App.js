import React from 'react';
import PdfState from './context/pdf/PdfState';
import FilmState from './context/film/FilmState';
import WrappedAddNewPdfForm from './components/pages/AddPdf';
import WrappedAddNewFilmForm from './components/pages/AddFilm';
import WrappedEditPdfForm from './components/pages/EditPdf';
import WrappedEditFilmForm from './components/pages/EditFilm';
import AllPdfs from './components/Cards/AllPdfs';
import AllFilms from './components/Cards/AllFilms';
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
        <PdfState>
          <FilmState>
            <Router>
              <Switch>
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
            </Router>
          </FilmState>
        </PdfState>
      </div>
    </SnackbarProvider>
  );
}

export default App;
