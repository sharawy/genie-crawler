import '../css/front.css';
import React from 'react';
import ReactDOM from 'react-dom';
import CrawlingTools from './layouts/CrawlingTools'
import SpiderForm from './components/SpiderForm'
import CrawlTask from "./components/CrawlTask";

ReactDOM.render(
        <CrawlTask spider_id='1' />
    , document.getElementById('root'));