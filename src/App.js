import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import './App.css';

class App extends Component {
  state = {
    file:{
      name:null,
      size:0,
      type:null,
      formData:null
    }
  }

  uploadFile = (metadata) => {
    this.setState({
      file:metadata
    })
  }

  render() {
    return (
        <div className="App">
          <BrowserRouter>
          <Header />
            <Route exact path="/" render={() => (
              <React.Fragment>
                <Home uploadFile={ this.uploadFile }/>
              </React.Fragment>
            )} />
          </BrowserRouter>
        </div>
      )
  };
}

export default App;
