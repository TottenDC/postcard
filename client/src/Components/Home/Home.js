import React from 'react';
import Result from './Result';
import LoggedIn from './LoggedIn';

const Home = (props) => {
    return (
        <div className="container">
            <div className="row">
                <LoggedIn 
                    {...props}
                    searched={props.searched}
                    switchStates={props.switchStates}
                    performSearch={props.performSearch}
                />
                {props.searched &&
                    <Result 
                        weatherIcons={props.weatherIcons}
                        searchResults={props.searchResults}
                    />
                }
                
            </div>
        </div> 
    );
}

export default Home;