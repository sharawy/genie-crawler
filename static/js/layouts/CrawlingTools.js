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
            url: null,
            spiderId: props.match.params.spiderId,
            extractor: null

        };
        this.extract = this.extract.bind(this);
        this.getElement = this.getElement.bind(this);
        this.createExtractor = this.createExtractor.bind(this);
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
        data.append('name', attribute.name);
        data.append('xpath', attribute.xpath);
        fetch(this.EXTRACTOR_URL + state.extractor.id + "/add_attribute/",
            {
                method: 'POST',
                body: data,
            }).then(response => response.json())
            .then(data => {
                state.extractor.attributes.push(data);
                console.log(state);
                this.setState(state)
            });

    }

    remove_attr(id) {
        let state = this.state;

        //
        fetch(this.EXTRACTOR_URL + state.extractor.id + "/remove_attribute/" + id,
            {
                method: 'DELETE',
            })
            .then(data => {
                state.extractor.attributes = state.extractor.attributes.filter((attr, i) => attr.id != id);
                this.setState({...state})
            });

    }

    createExtractor() {
        let state = this.state;
        let data = new FormData();
        data.append('spider', state.spiderId)
        fetch(this.EXTRACTOR_URL, {
            method: "POST",
            body: data
        }).then(response => response.json())
            .then(data => {
                state.extractor = data;
                this.setState({...state})
            });
    }

    componentDidMount() {
        let state = this.state;
        fetch(this.GET_SPIDER_URL + state.spiderId).then(response => response.json())
            .then(data => {
                state.url = data.url;
                let extractors = data.extractors;// TODO: handle multiple extractors

                if (extractors.length > 0) {
                    state.extractor = extractors[0];
                    this.setState({...state})
                } else {
                    this.createExtractor()
                }

            });

    }

    render() {
        let state = this.state;
        let extractor = null;
        if (state.extractor) {
            console.log(state.extractor)
            extractor = <Extractor id={state.extractor.id} attributes={state.extractor.attributes}
                                   removeHandler={this.remove_attr.bind(this)}/>;
        }

        return (

            <div className="container">

                <ActionBar spiderId={this.state.spiderId}/>

                <div className="row d-flex justify-content-center extractor">
                    {extractor}
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