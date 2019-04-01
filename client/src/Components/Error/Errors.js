import React from 'react';
import errIcon from '../../icons/appIcons/error.svg';

const Errors = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col">
                    <img className="img-fluid mx-auto d-block" src={errIcon} alt="Error icon" />
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                <div className="col text-center">
                    <h1>Oh no!</h1>
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

export default Errors;