import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import VideoUpload from "./components/VideoUpload/VideoUpload";

class App extends React.Component {

  render() {
    // Router page information for both the main video page and
    // the video upload page
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact render={(routerProps) => (<Home {...routerProps} />)} />
            <Route path="/videoupload" component={VideoUpload} />
            <Route path="/:id" render={(routerProps) => (<Home {...routerProps} />)} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;