import React, {Component} from 'react'
import ItemAttribute from './ItemAttribute'
import {DragDropContainer} from '../../../node_modules/react-drag-drop-container';

class Extractor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemXpath: props.extracted,
            attributes: []
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        let state = {
            itemXpath: nextProps.extracted,
            attributes: []
        }
        this.setState({...state})
    }

    render() {

        let state = this.state
        return (
            <DragDropContainer>
                <div className="nav-item dropdown show">
                    <button className="btn btn-dark my-4 my-sm-2 dropdown-toggle" href="http://example.com"
                            id="dropdown01"
                    >Extractor
                    </button>
                    <div className="dropdown-menu show row  left80" aria-labelledby="dropdown01">

                        <form>
                            <div className="form-group">

                                <input type="text" value={state.itemXpath} className="form-control"
                                       id="formGroupExampleInput"
                                       placeholder="Item Xpath"/>
                            </div>

                            <ItemAttribute disabled={true}/>

                        </form>
                    </div>
                </div>
            </DragDropContainer>
        )
    }
}

export default Extractor;