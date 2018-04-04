import React, {Component} from 'react';
import WebView from "../components/WebView";
import Extractor from "../components/Extractor";
import ActionBar from "../components/ActionBar";
import {API} from "../common/constants";

class CrawlingTools extends Component {
    GET_SPIDER_URL = API + 'spiders/';
    EXTRACTOR_URL = API + 'extractors/';

    constructor(props) {
        super(props);
        this.state = {
            extracted: [],
            url: null,
            spiderId: props.match.params.spiderId,
            extractorId: null

        };
        this.extract = this.extract.bind(this)
        this.getElement = this.getElement.bind(this)
    }

    getElement(elt) {
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
        let attribute = this.getElement(e.target);
        let data = new FormData();
        data.append('name', attribute.name)
        data.append('xpath', attribute.xpath)
        fetch(this.EXTRACTOR_URL + state.extractorId + "/add_attribute/",
            {
                method: 'POST',
                body: data,
            }).then(response => response.json())
            .then(data => {
                attribute['id'] = data.id;
                state.extracted.push(attribute);
                this.setState(state)
            });

    }

    remove_attr(id) {
        let state = this.state;

        //
        fetch(this.EXTRACTOR_URL + state.extractorId + "/remove_attribute/" + id,
            {
                method: 'DELETE',
            })
            .then(data => {
                state.extracted = state.extracted.filter((attr, i) => attr.id != id);
                this.setState({...state})
            });

    }

    componentDidMount() {
        let state = this.state;
        fetch(this.GET_SPIDER_URL + this.state.spiderId).then(response => response.json())
            .then(data => {
                state.url = data.url;
                let extractors = data.extractors;// TODO: handle multiple extractors

                if (extractors.length == 1) {
                    state.extracted = extractors[0].attributes
                    state.extractorId = extractors[0].id
                }
                this.setState({...state})
            });

    }

    render() {
        let state = this.state;
        return (

            <div className="container">

                <ActionBar spiderId={this.state.spiderId}/>

                <div className="row d-flex justify-content-center extractor">
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