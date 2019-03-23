import React, { Component } from 'react';

class Result extends Component {

    render(props) {
        return (
            <div className="col-sm-8 order-sm-1">
                <div className="row justify-content-between">
                    <div className="col-sm-7">
                        <h2 className="text-capitalize">`Greetings From ${props.searchResults[4]}!`</h2>
                    </div>
                    <div className="col-sm-3">
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <th scope="row">Distance:</th>
                                    <td>{props.searchResults[0].tripDistance}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Travel Time:</th>
                                    <td>{props.searchResults[0].tripDuration}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <h3>Weather:</h3>
                    </div>
                    <div className="col-sm-8">
                        <p>{props.searchResults[1].dailySummary}</p>
                    </div>
                </div>
                <div className="row">
                    {props.weatherIcons.map((icon, index) => {
                        return (
                            <div className="col-sm-4">
                                <div className="card h-100">
                                    <img className="card-img-top" src={icon} alt="Weather icon" />
                                    <div className="card-body">
                                        <h4 className="card-title">{props.searchResults[1].dailyData[index].summary}</h4>
                                        <p className="card-text">`High: ${Math.round(props.searchResults[1].dailyData[index].highTemp)} &#8457;`</p>
                                        <br />
                                        <p className="card-text">`Low: ${Math.round(props.searchResults[1].dailyData[index].lowTemp)} &#8457;`</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    
                </div>
                <div className="row">
                    <h3>Explore:</h3>
                </div>
                <div className="row justify-content-around">
                    <div className="col-sm-5">
                        <p>Check these places out</p>
                        <ol>
                            {props.searchResults[2].placeData.map((place,index) => {
                                return (
                                    <li key={`b${index}`}>
                                        <a href={place.link} className="text-reset">{place.title}</a>
                                        <br />
                                        <p className="text-muted">{place.address.toString().replace(/,(?!\s)/g, ', ')}</p>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                    <div className="col-sm-5">
                        <p>I hope you're hungry</p>
                        <ol>
                            {props.searchResults[3].foodData.map((restaurant, index) => {
                                return (
                                    <li key={`c${index}`}>
                                        <a href={restaurant.link} className="text-reset">{restaurant.title}</a>
                                        <br />
                                        <p className="text-muted">{restaurant.address.toString().replace(/,(?!\s)/g, ', ')}</p>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
   
}

export default Result;