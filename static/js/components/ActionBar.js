import React from 'react';
import {Link} from 'react-router-dom';

const ActionBar = (props) => {
    return (


        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand js-scroll-trigger" to="/">Genie Crawler</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarResponsive"
                        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="btn btn-dark my-2 my-sm-0" to={'/tools/' + props.spiderId}>Web view</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="btn btn-dark my-2 my-sm-0" to={'/run/' + props.spiderId}>Run</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>


    )
};
export default ActionBar;