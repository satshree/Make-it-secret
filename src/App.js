import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'

import './App.css'

class App extends Component {
  state = {
    file:{
      name:null,
      size:0,
      type:null
    },
    path:null,
    encrypt:true
  }

  uploadFile = (metadata) => {
    this.setState(metadata)
  }

  resetState = (state) => {
    this.setState(state)
  }

  render() {
    return (
        <div className="App">
          <BrowserRouter>
          <Header />
            {/* <Route path="/" render={() => ( */}
              <React.Fragment>
                <Home uploadFile={ this.uploadFile }
                file={ this.state.file } 
                path={ this.state.path }
                encrypt= { this.state.encrypt } 
                resetState={ this.resetState }/>
              </React.Fragment>
            {/* )} /> */}
          </BrowserRouter>
        </div>
      )
  };
}

export default App;
