import React, {Component} from 'react'
import {API} from '../common/constants'

class SpiderForm extends Component {
    CREATE_SPIDER_URL = API + "spiders/";

    constructor(props) {
        super(props);
        this.createSpider = this.createSpider.bind(this);
    }

    createSpider(event) {
        event.preventDefault()
        const data = new FormData(event.target);
        data.append('name', data.get('url'))
        fetch(this.CREATE_SPIDER_URL, {
            method: 'POST',
            body: data,
        }).then(response => response.json())
            .then(data => {
                console.log(data)
            });
        ;
    }

    render() {


        return (
            <section>
                <div className="content">
                    <div className="overlay"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 mx-auto">
                                <h1 className="mb-4">Ready to get started? Crawl Now!</h1>
                            </div>
                            <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                                <form method="post" onSubmit={this.createSpider}>
                                    <div className="form-row">
                                        <div className="col-12 col-md-12 mb-2 mb-md-0">
                                            <input type="url" name='url' className="form-control form-control-lg"
                                                   placeholder="Enter website url..."/>

                                        </div>
                                        <div className="col-12 col-md-12">
                                            <button type="submit" className="btn btn-block btn-lg btn-primary">Create
                                                Crawler Spider
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default SpiderForm;



