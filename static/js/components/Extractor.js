import React, {Component} from 'react'
import ItemAttribute from './ItemAttribute'
import {DragDropContainer} from '../../../node_modules/react-drag-drop-container';

class Extractor extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            itemXpath: '',
            attributes: props.attributes,
            id: props.id
        };
        this.remove_attr = props.removeHandler
    }

    componentWillReceiveProps(nextProps) {
        let state = {
            itemXpath: '',
            attributes: nextProps.attributes,
            id: nextProps.id
        };
        this.setState({...state})
    }


    render() {

        let state = this.state;
        console.log(state);
        let attrs = state.attributes.map((attr, index) =>
            <ItemAttribute key={attr.id} removeHandler={(e) => this.remove_attr(attr.id)} xpath={attr.xpath}
                           name={attr.name}/>
        );

        return (
            <DragDropContainer>
                <div className="nav-item dropdown show">
                    <button className="btn btn-dark my-4 my-sm-2 dropdown-toggle" href="http://example.com"
                            id="dropdown01"
                    >Extractor
                    </button>
                    <div className="dropdown-menu show row  left80" aria-labelledby="dropdown01">
                        <h5 className="text-center">Click on element to add xpath</h5>
                        <div className="text-center">
                            <span type="text" className="col-4 d-inline-block form-control">Data</span>
                            :
                            <span className="col-4 d-inline-block form-control">Path</span>
                            <div className="col-3 d-inline-block form-control text-danger">Remove</div>
                            <br/>
                        </div>
                        <form className="p-2 text-center">
                            <div className="form-group">

                                {/*<input type="text" value={state.itemXpath} className="form-control"*/}
                                {/*id="formGroupExampleInput"*/}
                                {/*placeholder="Item Xpath"/>*/}
                            </div>

                            {attrs}

                        </form>
                    </div>
                </div>
            </DragDropContainer>
        )
    }
}

export default Extractor;