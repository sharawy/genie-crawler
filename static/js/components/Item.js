import React from 'react'
import ItemAttribute from './ItemAttribute'

const Item = (props) => {
    return (
        <form>
            <div className="form-group">

                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Item Xpath"/>
            </div>

            <ItemAttribute/>

        </form>
)
}

export default Item;