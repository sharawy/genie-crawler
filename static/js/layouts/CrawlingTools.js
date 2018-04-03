import React, {Component} from 'react';
import WebView from "../components/WebView";
import Extractor from "../components/Extractor";
import ActionBar from "../components/ActionBar";
import {API} from "../common/constants";

class CrawlingTools extends Component {
    GET_SPIDER_URL = API + 'spiders/';

    constructor(props) {
        super(props);
        this.state = {
            extracted: [],
            url: null,
            spiderId: props.match.params.spiderId,

        };
        this.extract = this.extract.bind(this)
        this.getElementXPath = this.getElementXPath.bind(this)
    }

    getElementXPath(elt) {
        var path = "";
        let attr_name = 'Non named attribute';
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

    componentDidMount() {
        let state = this.state;
        fetch(this.GET_SPIDER_URL + this.state.spiderId).then(response => response.json())
            .then(data => {
                state.url = data.url;
                this.setState({...state})
            });
    }

    render() {
        let state = this.state;
        return (

            <div className="container">

                <ActionBar spiderId={this.state.spiderId}/>

                <div className="row d-flex justify-content-center">
                    <Extractor extracted={state.extracted} removeHandler={this.remove_attr.bind(this)}/>
                </div>
                <div className="iframe_wrap" id="div1">
                    <div className="iframe_wrap" id="div1">

                        {state.url ? <WebView extract={this.extract} url={state.url}/> : <div>Wait a moment....</div>}
                    </div>
                </div>
            </div>
        )
    }

}


export default CrawlingTools;