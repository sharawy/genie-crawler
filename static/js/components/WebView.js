import React, {Component} from 'react';

import {API} from '../common/constants'
import Extractor from "./Extractor";

class XpathValue {
    constructor(name, xpath) {
        this.name = name;
        this.xpath = xpath;
    }
}

class WebView extends Component {
    FETCH_WEBVIEW = API + "fetch_website/?url=";

    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            html: '',
            view: null,
            attributes: [],
            item: {},
            extract : props.extract
        }

    }

    componentDidMount() {
        fetch(this.FETCH_WEBVIEW + this.state.url)
            .then(response => response.text())
            .then(data => {
                this.setState({html: data});
            });
        this.load = this.load.bind(this)
    }



    load(e) {
        console.log(window.find('#iframe_id'))
        var view = this
        $(e.target).contents().on('click', function (e) {
            e.preventDefault()
            console.log(view.state.extract(e))

        });
        $(e.target).contents().mouseover(function (e) {
            $(e.target).css('border', '1px solid red');
        });
        $(e.target).contents().mouseout(function (e) {
            $(e.target).css('border', '0px solid white');
        });

    }


    render() {

        let html = this.state.html
        let blob = new Blob([html], {type: 'text/html'});
        let src = URL.createObjectURL(blob);

        return (
                <iframe id="iframe_id" onLoad={this.load.bind(this)}
                        className="embed-responsive embed-responsive-16by9" src={src}
                        width="100%" height="1000px" scrolling="yes"></iframe>
        )
    }
}

export default WebView;