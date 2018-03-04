import React, {Component} from 'react';
import ActionBar from '../components/ActionBar';

class CrawlingTools extends Component {
    render() {
        return (
            <div>
                <ActionBar/>
                <div className="frame">
                    <iframe style={{marginTop:'3.3em'}} className="embed-responsive embed-responsive-16by9" src="http://quotes.toscrape.com" width="100%" height="1000px" scrolling="yes"></iframe>
                </div>
            </div>
        )
    }
}


export default CrawlingTools;