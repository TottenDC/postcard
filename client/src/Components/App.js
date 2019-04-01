import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import axios from 'axios';
import '../css/App.css';

// Components
import Landing from './Landing/Landing';
import Home from './Home/Home';
import Errors from './Error/Errors';
import NotFound from './Error/NotFound';

// Weather Icons
import weatherIcons from '../icons/weatherIcons';

class App extends Component {

  state = {
    loading: false,
    userLoggedIn: false,
    searched: false,
    searchResults: [],
    weatherIcons: []
  };

  displayWeatherIcons = (weatherArray) => {
    const dataList = ['clear-day', 'clear-night', 'rain', 'snow', 'sleet', 'wind', 'fog', 'cloudy', 'partly-cloudy-day', 'partly-cloudy-night'];
    const iconList = [weatherIcons.clearDay, weatherIcons.clearNight, weatherIcons.rain, weatherIcons.snow, weatherIcons.snow, weatherIcons.wind, weatherIcons.fog, weatherIcons.overcast, weatherIcons.cloudyDay, weatherIcons.cloudyNight];
    const icons = [];
    weatherArray.forEach((day) => {
      if (day.icon) {
        const index = dataList.findIndex(data => data === day.icon);
        if (index === -1) {
          icons.push(weatherIcons.error);
        } else {
          icons.push(iconList[index]);
        }
      } else {
        icons.push(weatherIcons.error);
      }
    });
    this.setState({
      weatherIcons: icons
    });
  }

  switchLoadAndSearch = () => {
    this.setState({
      loading: true,
      searched: false
    });
  }

  performSearch = (start, dest) => {
    axios.get(`/api/v1/postcard?start=${start}&dest=${dest}`)
      .then( response => {
        this.setState({ 
          searchResults: response.data,
          loading: false,
          searched: true
        });
        this.displayWeatherIcons(this.state.searchResults[1].dailyData);
      })
      .catch(err => <Redirect to="/error" />);
  }

  userLogIn = () => {
    this.setState({
      userLoggedIn: true
    });
  }

  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path='/' 
              render={(props) =>
                <Landing 
                  {...props} 
                  userLogIn={this.userLogIn}
                />
              } 
            />
            <Route exact path='/home' 
              render={(props) => 
                <Home 
                  {...props}
                  searched={this.state.searched}
                  loading={this.state.loading}
                  weatherIcons={this.state.weatherIcons}
                  searchResults={this.state.searchResults}
                  performSearch={this.performSearch}
                  switchStates={this.switchLoadAndSearch}
                  userLoggedIn={this.state.userLoggedIn}
                />
              } 
            />
            <Route exact path='/error' component={Errors} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
