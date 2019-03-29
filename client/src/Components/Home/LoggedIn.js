import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import postmark from '../../icons/appIcons/postmark.svg';

class LoggedIn extends Component {

    componentDidMount() {
        this.updateUserInfo();
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
            .catch((err) => console.log(err));
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
            .catch((err) => console.log(err));
    }

    render() {
        if (this.state.loggedOut) {
            return <Redirect to="/" />
        }
        return (
            <div className="col-sm-4 order-sm-2">
                <div className="row justify-content-end">
                    <div className="col-4 uiTop mt-4">
                        { this.props.searched && 
                            <img className="img-fluid" src={postmark} alt="Travel stamp" />
                        }
                    </div>
                    <div className="col-2 uiTop mr-4 mt-4 stamp text-center">
                        <img src={this.state.userIcon} alt="Profile icon" />
                    </div>
                </div>
                <br />
                <div className="row">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="destination" className="col-sm-2 col-form-label">To:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="destination" name="destination" value={this.state.destination} onChange={this.handleInputChange} placeholder="City, State" required />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="startLocation" className="col-sm-2 col-form-label">From:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="startLocation" name="startLocation" value={this.state.startLocation} onChange={this.handleInputChange} placeholder="City, State" required />
                            </div>
                        </div>
                        <div className="row justify-content-end">
                            <div className="col-5">
                                <button type="submit" className="btn btn-primary">Send</button>
                            </div>
                            <div className="col-5">
                                <button type="button" className="btn btn-primary" onClick={this.handleLogOut}>Log Out</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <h5 className="text-center">Previous Trips</h5>
                        <hr className="my-4" />
                        <ol>
                            {this.state.userPreviousSearches &&
                                this.state.userPreviousSearches.map((search, index) => {
                                    return <li key={`a${index}`} className="text-capitalize">to {search[1]} from {search[0]}</li>
                            })}
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoggedIn;