import React from 'react';
import About from './About';
import SignIn from './SignIn';
import Register from './Register';

const Landing = () => {
    return (
        <div className="container">
            <div className="row">
                <SignIn />
                <About />
            </div>
            <Register />
        </div> 
    );
}

export default Landing;