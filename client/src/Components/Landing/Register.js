import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        icon: '',
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
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="registerModalLabel">Register</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            [// todo Finish the form]
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;