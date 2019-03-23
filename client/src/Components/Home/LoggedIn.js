import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import postmark from '../../icons/appIcons/postmark.svg';



class LoggedIn extends Component {
    
    state = {
        startLocation: '',
        destination: '',
        // userIcon: cookies.get('icon'),
        // userPreviousSearches: cookies.get('searches'),
        loggedOut: false
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
        console.log(this.state);
        return (
            <div className="col-sm-4 order-sm-2">
                <div className="row justify-content-end">
                    <div className="col-4">
                        { this.props.searched && 
                            <img className="img-fluid" src={postmark} alt="Travel stamp" />
                        }
                    </div>
                    <div className="col-2 border border-dark">
                        <img className="img-fluid" src={this.state.userIcon} alt="Profile icon" />
                    </div>
                </div>
                <br />
                <div className="row">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="startLocation" className="col-sm-2 col-form-label">To:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="startLocation" name="startLocation" value={this.state.startLocation} onChange={this.handleInputChange} placeholder="City, State" required />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="destination" className="col-sm-2 col-form-label">For:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="destination" name="destination" value={this.state.destination} onChange={this.handleInputChange} placeholder="City, State" required />
                            </div>
                        </div>
                        <div className="row justify-content-around">
                            <div className="col-3">
                                <button type="submit" className="btn btn-primary">Send</button>
                            </div>
                            <div className="col-3">
                                <button type="button" className="btn btn-primary" onClick={this.handleLogOut}>Log Out</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="col">
                        <h5 className="text-center">Previous Trips</h5>
                        <hr className="my-4" />
                        <ol>
                            {this.state.userPreviousSearches &&
                                this.state.userPreviousSearches.map((search, index) => {
                                    return <li key={`a${index}`} className="text-capitalize">`to ${search[0]} from ${search[1]}`</li>
                            })}
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoggedIn;