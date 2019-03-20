import React, { Component } from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import axios from 'axios';
import '../css/App.css';

// Components
import Landing from './Landing/Landing';
import Home from './Home/Home';
import Errors from './Error/Errors';

class App extends Component {

  state = {
    loading: false,
    searched: false,
    searchResults: []
  };

  switchLoadAndSearch = () => {
    this.setState({
      loading: true,
      searched: false
    });
  }

  performSearch = async (start, dest) => {
    axios.get(`api/v1/postcard?start=${start}&dest=${dest}`)
      .then( response => {
        this.setState({ 
          searchResults: response.data,
          loading: false,
          searched: true
        });
      })
      .catch(function (error) {
        console.log('Parsing error', error);
    });
  }

  render() {
    return (
      <BrowserRouter>
          <Route exact path='/' component={Landing} />
          <Route exact path='/home' 
            render={() => 
              <Home 
                searched={this.state.searched}
                loading={this.state.loading}
                performSearch={this.performSearch}
                switchStates={this.switchLoadAndSearch}
              />
            } 
          />
          <Route exact path='/error' 
          render={(props) =>
              <Errors {...props} />
            } 
          />
      </BrowserRouter>
    );
  }
}

export default App;
