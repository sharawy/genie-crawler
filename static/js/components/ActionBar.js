import React from 'react';
import {DragDropContainer} from '../../../node_modules/react-drag-drop-container';

import Item from './Item';

const ActionBar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <a className="navbar-brand js-scroll-trigger" href="#page-top">Genie Crawler</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <DragDropContainer>
                            <li className="nav-item dropdown show">
                                <button className="btn btn-dark my-4 my-sm-2 dropdown-toggle" href="http://example.com"
                                        id="dropdown01"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Item to scrape
                                </button>
                                <div className="dropdown-menu row  left80"  aria-labelledby="dropdown01">
                                    <Item/>
                                </div>
                            </li>
                        </DragDropContainer>
                        <li className="nav-item">
                            <button className="btn btn-dark my-2 my-sm-0">Run</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-dark my-2 my-sm-0">Export</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default ActionBar;