import React, { Component } from 'react';

class Result extends Component {

    render(props) {
        const data = this.props.searchResults;
        return (
            <div className="col-sm-8 order-sm-1">
                <div className="row justify-content-between">
                    <div className="col-md-7 mt-4">
                        <h1 className="text-capitalize">Greetings From {data[4]}!</h1>
                    </div>
                    <div className="col-md-5 mt-4 travelResult typeText">
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <th scope="row">Distance:</th>
                                    <td>{data[0].tripDistance}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Travel Time:</th>
                                    <td>{data[0].tripDuration}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row justify-content-between mt-3">
                    <div className="col-sm-4 col-md-2">
                        <h3 className="font-weight-bold">Weather:</h3>
                    </div>
                    <div className="col-sm-8 col-md-9 largestText">
                        <p>{data[1].dailySummary}</p>
                    </div>
                </div>
                <div className="row">
                    {this.props.weatherIcons.map((icon, index) => {
                        return (
                            <div key={`d${index}`} className="col-md-4">
                                <div className="card h-100 typeText">
                                    <img className="card-img-top" src={icon} alt="Weather icon" />
                                    <div className="card-body">
                                        <p className="card-title">{data[1].dailyData[index].summary}</p>
                                        <p className="card-text">High: {Math.round(data[1].dailyData[index].highTemp)} &#8457;</p>
                                        <p className="card-text">Low: {Math.round(data[1].dailyData[index].lowTemp)} &#8457;</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    
                </div>
                <div className="row mt-3 mb-2">
                    <h3 className="font-weight-bold">Explore:</h3>
                </div>
                <div className="row justify-content-around">
                    <div className="col-sm-5">
                        <p className="largestText">Check these places out</p>
                        <ol className="typeText">
                            {data[2].placeData.map((place,index) => {
                                return (
                                    <li key={`b${index}`}>
                                        <a href={place.link} target="_blank" rel="noopener noreferrer" className="text-reset largerText">{place.title}</a>
                                        <br />
                                        <p>{place.address.toString().replace(/,(?!\s)/g, ', ')}</p>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                    <div className="col-sm-5">
                        <p className="largestText">I hope you're hungry</p>
                        <ol className="typeText">
                            {data[3].foodData.map((restaurant, index) => {
                                return (
                                    <li key={`c${index}`}>
                                        <a href={restaurant.link} target="_blank" rel="noopener noreferrer" className="text-reset largerText">{restaurant.title}</a>
                                        <br />
                                        <p>{restaurant.address.toString().replace(/,(?!\s)/g, ', ')}</p>
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