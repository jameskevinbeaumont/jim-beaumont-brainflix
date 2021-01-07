import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import VideoUpload from "./components/VideoUpload/VideoUpload";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact render={(routerProps) => (<Home {...routerProps} />)} />
            <Route path="/videoupload" component={VideoUpload} />
            {/* <Route path="/videoupload" render={(routerProps) => (<VideoUpload {...routerProps} />)} /> */}
            <Route path="/:id" render={(routerProps) => (<Home {...routerProps} />)} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;