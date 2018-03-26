import React, {Component} from 'react'
import ItemAttribute from './ItemAttribute'
import {DragDropContainer} from '../../../node_modules/react-drag-drop-container';

class Extractor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemXpath: '',
            attributes: props.extracted,
        }
        this.remove_attr = props.removeHandler
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        let state = {
            itemXpath: '',
            attributes: nextProps.extracted
        }
        this.setState({...state})
    }


    render() {

        let state = this.state;
        let attrs = state.attributes.map((attr, index) =>
            <ItemAttribute key={index} removeHandler={(e) => this.remove_attr(index)} xpath={attr.xpath} name={attr.name}/>
        );

        return (
            <DragDropContainer>
                <div className="nav-item dropdown show">
                    <button className="btn btn-dark my-4 my-sm-2 dropdown-toggle" href="http://example.com"
                            id="dropdown01"
                    >Extractor
                    </button>
                    <div className="dropdown-menu show row  left80" aria-labelledby="dropdown01">
                        <h3>Click on element to add xpath</h3>
                        <form>
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