import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

class SignIn extends Component {
    
    state = {
        signInEmail: '',
        signInPassword: '',
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
        axios.post('/login', {
            email: this.state.signInEmail,
            password: this.state.signInPassword
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
            <div className="col-sm-4 order-sm-2">
                <div className="row justify-content-end">
                    <div className="col-4">
                    
                    </div>
                    <div className="col-2 border border-dark">
                    
                    </div>
                </div>
                <br />
                <div className="row justify-content-center">
                    <h5 className="text-center">Sign In</h5>
                </div>
                <div className="row justify-content-center">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="signInEmail">Email address</label>
                            <input type="email" className="form-control" id="signInEmail" name="signInEmail" value={this.state.signInEmail} onChange={this.handleInputChange} aria-describedby="emailHelp" placeholder="example@email.com" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signInPassword">Password</label>
                            <input type="password" className="form-control" id="signInPassword" name="signInPassword" value={this.state.signInPassword} onChange={this.handleInputChange} placeholder="Password" required />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <hr className="my-4" />
                    <p className="text-center">
                        Not a member?
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#registerModal">
                            Register Now
                        </button>
                    </p>
                </div>
            </div>
        );
    }
}

export default withRouter(SignIn);