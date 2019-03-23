import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

// Icon Imports
import airplaneIcon from '../../icons/userIcons/airplane.svg';
import truckIcon from '../../icons/userIcons/truck.svg';
import rocketIcon from '../../icons/userIcons/rocket.svg';
import earthIcon from '../../icons/userIcons/earth.svg';

class Register extends Component {
    
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        icon: airplaneIcon,
        submitted: false
    }

    handleInputChange = (event) => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/register', {
            emailAddress: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            icon: this.state.icon
        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        submitted: true
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    render() {
        if (this.state.submitted) {
            return <Redirect to="/home" />
        }
        return (
            <div className="modal fade" id="registerModal" tabIndex="-1" role="dialog" aria-labelledby="registerModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="registerModalLabel">Register</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleInputChange} aria-describedby="emailHelp" placeholder="example@email.com" required />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" value={this.state.password} onChange={this.handleInputChange} placeholder="Password" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm password</label>
                                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInputChange} placeholder="Please confirm your password" required />
                                </div>
                                <div className="form-group">
                                    <label>Please select a user icon:</label>
                                    <br />
                                    <div className="form-check form-check-inline">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="icon"
                                            id='radio1' 
                                            value={airplaneIcon} 
                                            checked={this.state.icon === airplaneIcon} 
                                            onChange={this.handleInputChange} 
                                        />
                                        <label className="form-check-label" htmlFor="radio1">
                                            <img className="img-fluid" src={airplaneIcon} alt='airplane' />
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="icon"
                                            id='radio2' 
                                            value={truckIcon}
                                            checked={this.state.icon === truckIcon} 
                                            onChange={this.handleInputChange} 
                                        />
                                        <label className="form-check-label" htmlFor="radio2">
                                            <img className='img-fluid' src={truckIcon} alt='truck' />
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="icon"
                                            id='radio3' 
                                            value={rocketIcon} 
                                            checked={this.state.icon === rocketIcon} 
                                            onChange={this.handleInputChange} 
                                        />
                                        <label className="form-check-label" htmlFor="radio3">
                                            <img className="img-fluid" src={rocketIcon} alt="rocket" />
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="icon"
                                            id='radio4' 
                                            value={earthIcon} 
                                            checked={this.state.icon === earthIcon} 
                                            onChange={this.handleInputChange} 
                                        />
                                        <label className="form-check-label" htmlFor="radio4">
                                            <img className="img-fluid" src={earthIcon} alt="earth" />
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);