import React, { Component } from 'react';
import errIcon from '../../icons/appIcons/error.svg';

class NotFound extends Component {

    componentDidMount() {
        let docBody = document.querySelector('body');
        if (docBody.getAttribute('class') === 'modal-open') {
            docBody.setAttribute('class', '');
            const modalHideDiv = document.querySelector('.modal-backdrop');
            modalHideDiv.style.display = 'none';
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col">
                        <img className="img-fluid mx-auto d-block" src={errIcon} alt="Error icon" />
                    </div>
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="col text-center">
                        <h1>404 - Page Not Found</h1>
                        <br />
                        <p className="largestText">There appears to have been an error. Please return home and try again.</p>
                        <button type="button" className="btn btn-primary btn-logout">
                            <a href="/" className="text-reset">Return home</a>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotFound;