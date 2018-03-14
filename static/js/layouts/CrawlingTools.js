import React, {Component} from 'react';
import ActionBar from '../components/ActionBar';

class CrawlingTools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            html: ''
        }
    }

    componentDidMount() {
        fetch('/fetch_website?url=http://quotes.toscrape.com/')
            .then(response => response.text())
            .then(data => {
                this.setState({html: data});});

    }

    load(e) {

            $('#iframe_id').contents().on('click', function (e) {
                console.log(e);

            })

    }

    render() {

        let html = this.state.html
        let blob = new Blob([html], {type: 'text/html'});
        let src = URL.createObjectURL(blob);
        return (

            <div>
                <ActionBar/>
                <div className="iframe_wrap" id="div1">
                    <iframe id="iframe_id" style={{marginTop: '3.3em'}} onLoad={this.load}
                            className="embed-responsive embed-responsive-16by9" src={src}
                            width="100%" height="1000px" scrolling="yes"></iframe>
                </div>
            </div>
        )
    }

}


export default CrawlingTools;