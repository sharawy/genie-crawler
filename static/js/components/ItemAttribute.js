import React from 'react'


const ItemAtrribute = (props) =>{
    return (

        <div class="form-group">
         <input type="text" placeholder="Attribute name" disabled={props.disabled}/>:
         <input type="text"  placeholder="Attribute Xpath" disabled={props.disabled}/>
        </div>
    );
};

export default ItemAtrribute;