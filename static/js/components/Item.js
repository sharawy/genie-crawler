import React from 'react'
import ItemAttribute from './ItemAttribute'

const Item = (props)=>{
    return (
        <form className="form">
        <input name='xpath'/>
        <ItemAttribute />
        </form>
    )
}

export default Item;