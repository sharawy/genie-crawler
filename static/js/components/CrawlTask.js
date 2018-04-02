import React, {Component} from 'react'
import {API} from "../common/constants";
import Modal from "../common/Modal";

class Task {
    constructor({id, logs, spider, status, extracted_items}) {
        this.id = id;
        this.logs = logs;
        this.spider_id = spider;
        this.status = status;
        this.extracted_items = extracted_items;
    }
}

const Row = (props) => {
    let item = props.item;
    let values = Object.keys(item).map((key) => {
        return <td>{item[key]}</td>;
    });
    return (
        <tr key={props.key}>
            {values}
        </tr>);
};

class CrawlTask extends Component {
    TASK_URL = API + 'tasks/';

    constructor(props) {
        super(props)
        this.state = {

            spider_id: props.spider_id,
            task: null,

        }
        this.run = this.run.bind(this);
        this.export = this.export.bind(this);
    }

    componentDidMount() {
        console.log(this.state);
        this.run();
        setInterval(this.getTask.bind(this), 4000);
    }

    run() {
        let state = this.state;
        let start_task_url = 'spiders/' + state.spider_id + '/start_task/';
        fetch(start_task_url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                state.task = new Task(data);
                this.setState({...state});
            });
    }

    export(type) {
        let state = this.state;
        let export_url = this.TASK_URL + state.task.id + '/export/';
        fetch(export_url, {
            method: 'POST',
            body: JSON.stringify({type: type}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.file);
                window.open(data.file);
            });
    };

    getTask() {
        if (this.state.task) {
            if (this.state.task.status === 'finished') {
                return;
            }
            let state = this.state
            console.log(state);
            fetch(this.TASK_URL + state.task.id)
                .then(response => response.json())
                .then(data => {
                    state.task = new Task(data);
                    this.setState({...state});
                });
        }

    }

    render() {
        let state = this.state;
        let status = "Not started";
        let result = "Waiting..";
        if (state.task !== null) {
            console.log(state.task);
            status = state.task.status;
            if (state.task.extracted_items.length > 0) {
                result = state.task.extracted_items.map(function (item, key) {

                    return (

                        <Row item={item} key={key}/>

                    )

                })
            }

        }

        return (
            <div className='container'>
                <div className="btn-toolbar">
                    <Modal title="Export">
                        <div className='text-center'>
                            <button className="btn btn-info" onClick={() => this.export('csv')}>CSV</button>
                            <button className="btn btn-info" onClick={() => this.export('xml')}>XML</button>
                        </div>
                    </Modal>
                    <button className="btn btn-info" disabled>{status}</button>
                </div>
                <div className="well">
                    <table className="table">


                        <tbody>
                        {result}

                        </tbody>
                    </table>
                </div>


            </div>
        )
    }
}

export default CrawlTask;