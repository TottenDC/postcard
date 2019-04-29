import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

//Images
import postmark from '../../icons/appIcons/postmark.svg';
import yelpLogo from '../../icons/appIcons/Yelp_trademark_RGB.png';

class LoggedIn extends Component {

    componentDidMount() {
        this.updateUserInfo();
        let docBody = document.querySelector('body');
        if (docBody.getAttribute('class') === 'modal-open') {
            docBody.setAttribute('class', '');
            const modalHideDiv = document.querySelector('.modal-backdrop');
            modalHideDiv.style.display = 'none';
        }
    }
    
    state = {
        startLocation: '',
        destination: '',
        userIcon: '',
        userPreviousSearches: [],
        loggedOut: false
    }

    updateUserInfo() {
        axios.get('/user')
            .then(response => {
                let userInfo = response.data;
                this.setState({
                    userIcon: userInfo.icon,
                    userPreviousSearches: userInfo.searches
                });
            })
            .catch(err => this.props.history.push("/error"));
    }

    handleInputChange = (event) => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.switchStates();
        this.props.performSearch(this.state.startLocation, this.state.destination);
        this.updateUserInfo();
    }

    handleLogOut = (event) => {
        event.preventDefault();
        axios.get('/logout')
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        loggedOut: true
                    });
                }
            })
            .catch(err => this.props.history.push("/error"));
    }

    render() {
        if (this.state.loggedOut) {
            return <Redirect to="/" />
        }
        return (
            <div className="col-md-4 order-md-2">
                <div className="row justify-content-end">
                    <div className="col-auto col-md-4 uiTop mt-4">
                        { this.props.searched && 
                            <img className="img-fluid" src={postmark} alt="Travel stamp" />
                        }
                    </div>
                    <div className=" col-2 uiTop mt-4 stamp text-center">
                        <img src={this.state.userIcon} alt="Profile icon" />
                    </div>
                </div>
                <br />
                <div className="row justify-content-center">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="destination" className="titleText font-weight-bold col-sm-2 col-form-label">To:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="destination" name="destination" value={this.state.destination} onChange={this.handleInputChange} placeholder="City, State" required />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="startLocation" className="titleText font-weight-bold col-sm-2 col-form-label">From:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="startLocation" name="startLocation" value={this.state.startLocation} onChange={this.handleInputChange} placeholder="City, State" required />
                            </div>
                        </div>
                        <div className="row justify-content-end">
                            <div className="col-5 col-sm-4 col-md-5">
                                <button type="submit" className="btn btn-primary">Send</button>
                            </div>
                            <div className="col-5 col-sm-6 col-md-5">
                                <button type="button" className="btn btn-primary btn-logout" onClick={this.handleLogOut}>Log Out</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row my-5">
                    <div className="col">
                        <h3 className="text-center titleText font-weight-bold">Previous Trips</h3>
                        <hr className="my-2" />
                        <ol>
                            {this.state.userPreviousSearches &&
                                this.state.userPreviousSearches.map((search, index) => {
                                    return <li key={`a${index}`} className="text-capitalize">
                                                <p>to {search[1]}</p>
                                                <p>from {search[0]}</p>
                                            </li>
                            })}
                        </ol>
                    </div>
                </div>
                <div className="row justify-content-between">
                    <div className="col-8 px-0 px-sm-1 col-md-6 col-lg-7 align-self-center text-center">
                        <p className="mb-0 my-auto"><a href="https://darksky.net/" target="_blank" rel="noopener noreferrer" className="text-reset">Weather powered by Darksky</a></p>
                    </div>
                    <div className="my-auto col-4 yelpContainer align-self-center mr-md-3">
                        <a href="https://www.yelp.com/" target="_blank" rel="noopener noreferrer">
                            <img className="img-fluid" src={yelpLogo} alt="Yelp logo" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(LoggedIn);