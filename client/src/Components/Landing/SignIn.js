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
                    this.props.userLogIn();
                    this.setState({
                        submitted: true
                    });
                } else {
                   this.props.history.push("/error");
                }
            })
            .catch((err) => this.props.history.push("/error"));
    }

    render() {
        if (this.state.submitted) {
            return <Redirect to="/home" />
        }
        return (
            <div className="col-sm-4 order-sm-2">
                <div className="row justify-content-end">
                    <div className="col-4 uiTop mt-4">
                    
                    </div>
                    <div className="col-2 border border-dark uiTop mr-4 mt-4">
                    
                    </div>
                </div>
                <br />
                <div className="row justify-content-center mb-2">
                    <h4 className="text-center font-weight-bold">Sign In</h4>
                </div>
                <div className="row justify-content-center">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="signInEmail" className="font-weight-bold">Email address</label>
                            <input type="email" className="form-control" id="signInEmail" name="signInEmail" value={this.state.signInEmail} onChange={this.handleInputChange} aria-describedby="emailHelp" placeholder="example@email.com" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signInPassword" className="font-weight-bold">Password</label>
                            <input type="password" className="form-control" id="signInPassword" name="signInPassword" value={this.state.signInPassword} onChange={this.handleInputChange} placeholder="Password" required />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className="row justify-content-center my-4">
                    <p className="font-weight-bold">
                        Not a member?
                        <button type="button" className="btn btn-primary ml-3" data-toggle="modal" data-target="#registerModal">
                            Register Now
                        </button>
                    </p>
                </div>
            </div>
        );
    }
}

export default withRouter(SignIn);