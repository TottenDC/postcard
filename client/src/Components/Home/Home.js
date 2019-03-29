import React from 'react';

// Components
import Blank from './Blank';
import Result from './Result';
import LoggedIn from './LoggedIn';
import Loading from './Loading';

const Home = (props) => {
    // Handle conditional display of left-side
    let display;
    if (props.loading) {
        display = <Loading />;
    } else if (props.searched) {
        display = 
            <Result 
                weatherIcons={props.weatherIcons}
                searchResults={props.searchResults}
            />;
    } else {
        display = <Blank />;
    }
    
    return (
        <div className="container">
            <div className="row">
                <LoggedIn 
                    {...props}
                    searched={props.searched}
                    switchStates={props.switchStates}
                    performSearch={props.performSearch}
                />
                {display}
            </div>
        </div> 
    );
}

export default Home;