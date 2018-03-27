import React, {Component} from 'react';
import WebView from "../components/WebView";
import Extractor from "../components/Extractor";

class CrawlingTools extends Component {
    constructor(props) {
        super(props)
        this.state = {
            extracted: [],

        }
        this.extract = this.extract.bind(this)
        this.getElementXPath = this.getElementXPath.bind(this)
    }

    getElementXPath(elt) {
        var path = "";
        let attr_name = 'Non named attribute'
        console.log(elt.className)
        if ('itemProp' in elt.attributes) {
            attr_name = elt.getAttribute('itemProp')
        } else if ('class' in elt.attributes) {
            attr_name = elt.className
        } else if ('id' in elt.attributes) {
            attr_name = elt.getAttribute('id')
        }
        for (; elt && elt.nodeType == 1; elt = elt.parentNode) {
            if (elt.tagName === "BODY")
                break;
            let xname = elt.tagName.toLowerCase();
            path = "//" + xname + path;


        }


        return {xpath: path, name: attr_name};
    }


    extract(e) {
        let state = {...this.state};
        state.extracted.push(this.getElementXPath(e.target));

        this.setState(state)
    }

    remove_attr(index) {
        let state = this.state;
        state.extracted = state.extracted.filter((attr, i) => i != index);
        //
        this.setState({...state})
    }

    run() {

    }

    export() {

    }

    render() {
        let state = this.state
        return (

            <div className="container">


                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand js-scroll-trigger" href="#page-top">Genie Crawler</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarResponsive"
                                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <button className="btn btn-dark my-2 my-sm-0">Web view</button>
                                </li>
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
                <div className="row d-flex justify-content-center">
                <Extractor extracted={state.extracted} removeHandler={this.remove_attr.bind(this)}/>
                </div>
                <div className="iframe_wrap" id="div1">
                    <div className="iframe_wrap" id="div1">

                        <WebView extract={this.extract} url="http://quotes.toscrape.com/"/>
                    </div>
                </div>
            </div>
        )
    }

}


export default CrawlingTools;