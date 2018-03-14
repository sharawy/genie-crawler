import React, {Component} from 'react';
import decode from 'unescape';
import {API} from '../common/constants'

class WebView extends Component {
    FETCH_WEBVIEW = API + "fetch_website/";

    constructor(props) {
        super(props);
        this.params = "?url=" + props.url
        this.state = {
            htmlResponse: [],
            isLoading: true,
            error: null,

        };
    }

    componentDidMount() {
        this.fetchWebsiteHtml()

    }

    fetchWebsiteHtml() {
        this.setState({isLoading: true});

        fetch(this.FETCH_WEBVIEW + this.params)
            .then(response => response.text())
            .then(data => this.setState({htmlResponse: data, isLoading: false}))
            .catch(error => this.setState({error, isLoading: false}));
    }

    htmlDecode(input) {
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }

    render() {
        const {htmlResponse, isLoading, error} = this.state;
        if (error) {
            return <p>{error.message}</p>;
        }
        console.log(isLoading);
        if (isLoading) {
            return <p>Loading ...</p>;
        }
        console.log(htmlResponse);

        return (
            <div dangerouslySetInnerHTML={{__html: decode(htmlResponse)}}/>
        );
    }
}

export default WebView;