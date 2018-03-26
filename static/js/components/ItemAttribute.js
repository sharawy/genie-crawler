import React from 'react'


const ItemAtrribute = (props) =>{
    return (
        <div class="form-group">
         <input type="text" placeholder="Attribute name" value={props.name} disabled={props.disabled}/>:
         <input type="text"  placeholder="Attribute Xpath" value={props.xpath}  disabled={props.disabled}/>
            <button type='button' className="btn btn-danger" onClick={props.removeHandler}>Remove</button>
        </div>
    );
};

export default ItemAtrribute;