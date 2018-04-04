import React from 'react'


const ItemAtrribute = (props) =>{
    return (
        <div class="form-group row p-3">
         <input type="text" className="col-4 d-inline-block form-control" placeholder="Attribute name" value={props.name} disabled={props.disabled}/>:
         <input type="text" className="col-4 d-inline-block form-control"  placeholder="Attribute Xpath" value={props.xpath}  disabled={props.disabled}/>
            <button type='button' className="btn btn-danger col-2 offset-1" onClick={props.removeHandler}><span className="fa fa-remove"></span></button>
        </div>
    );
};

export default ItemAtrribute;