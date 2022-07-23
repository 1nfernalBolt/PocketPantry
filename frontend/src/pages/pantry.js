import React from "react";

const Pantry = () => {
    return (
        <div className="main">
            <div className="flex-container">

                <div className="flex-child" >
                    <div className="row">

                        <div className="column">
                            <div >
                                <div className="wrap">
                                    <div className="search">
                                        <input type="text" className="searchTerm" placeholder="Search" />
                                        <button type="submit" className="searchButton">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="pantry-title">
                                    <p>In Your Pantry</p>
                                </div>
                            </div>

                        </div>

                        <div className="column">

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Pantry