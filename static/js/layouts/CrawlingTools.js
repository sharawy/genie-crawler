import React, {Component} from 'react';
import ActionBar from '../components/ActionBar';
import WebView from "../components/WebView";
import Extractor from "../components/Extractor";

class CrawlingTools extends Component {
    constructor(props) {
        super(props)
        this.state = {
            extracted: '',

        }
        this.extract = this.extract.bind(this)
        this.getElementXPath = this.getElementXPath.bind(this)
    }

    getElementXPath(elt) {
        var path = "";
        console.log(elt.parentNode)
        for (; elt && elt.nodeType == 1; elt = elt.parentNode) {
            if (elt.tagName === "BODY")
                break;
            let xname = elt.tagName.toLowerCase();
            path = "//" + xname + path;


        }

        return path;
    }


    extract(e) {
        console.log(e)
        let state = {...this.state}
        state.extracted = this.getElementXPath(e.target);

        this.setState(state)
    }

    render() {
        let state = this.state
        return (

            <div>
                <ActionBar/>
                <div className="iframe_wrap" id="div1">
                    <div className="iframe_wrap" id="div1">
                        <Extractor extracted={state.extracted} a/>
                        <WebView extractor={this.extract} url="http://quotes.toscrape.com/"/>
                    </div>
                </div>
            </div>
        )
    }

}


export default CrawlingTools;