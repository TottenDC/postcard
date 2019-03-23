import React from 'react';
import About from './About';
import SignIn from './SignIn';
import Register from './Register';

const Landing = (props) => {
    return (
        <div className="container">
            <div className="row">
                <SignIn {...props} />
                <About />
            </div>
            <Register {...props} />
        </div> 
    );
}

export default Landing;