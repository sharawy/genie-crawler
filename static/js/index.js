import '../css/front.css';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import CrawlingTools from './layouts/CrawlingTools'
import SpiderForm from './components/SpiderForm'
import CrawlTask from "./components/CrawlTask";

class App extends Component {

	render() {
		return (
			<div>
			  <main>
				  <Route
				  	path='/'
				  	exact
				  	component={SpiderForm}

				  />
				 <Route
				  	path='/tools/:spiderId'
				  	exact
				  	component={CrawlingTools}

				  />
				   <Route
				  	path='/run/:spiderId'
				  	exact
				  	component={CrawlTask}

				  />
			  </main>
			</div>
		)
	};
};
ReactDOM.render(
    <HashRouter>
        <div>
            <App />
        </div>
    </HashRouter>
    , document.getElementById('root'));