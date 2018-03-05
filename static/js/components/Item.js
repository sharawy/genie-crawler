import React from 'react'
import ItemAttribute from './ItemAttribute'

const Item = (props) => {
    return (
        <form className="form-inline">
            <div className="form-group">
                <div className="input-group-addon">@</div>
                <input type="text" class="form-control" name="xpath" placeholder="item xpath"/>
            </div>
            <ItemAttribute/>
        </form>
    )
}

export default Item;