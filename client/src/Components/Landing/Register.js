import React, { Component } from 'react';
import axios from 'axios';

// Icon Imports
import airplaneIcon from '../../icons/airplane.svg';
import truckIcon from '../../icons/truck.svg';
import rocketIcon from '../../icons/truck.svg';
import earthIcon from '../../icons/earth.svg';

class Register extends Component {
    
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        icon: airplaneIcon,
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
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div className="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="registerModal" aria-hidden="true">
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
                                    <label for="email">Email address</label>
                                    <input type="email" className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleInputChange} aria-describedby="emailHelp" placeholder="example@email.com" required />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" value={this.state.password} onChange={this.handleInputChange} placeholder="Password" required />
                                </div>
                                <div className="form-group">
                                    <label for="confirmPassword">Confirm password</label>
                                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInputChange} placeholder="Please confirm your password" required />
                                </div>
                                <div className="form-group">
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
                                        <label className="form-check-label" for="radio1">
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
                                        <label className="form-check-label" for="radio2">
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
                                        <label className="form-check-label" for="radio3">
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
                                        <label className="form-check-label" for="radio4">
                                            <img className="img-fluid" src={earthIcon} alt="earth" />
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;