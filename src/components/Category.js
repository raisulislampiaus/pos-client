import React from 'react'

function Category({ category }) {
    return (
        <div className='categorys'>
            <div className='ctgItem'>
                <img className='imageItems' src={category.image} alt="" />
                <h6 className='ctgName'>{category.name}</h6>
            </div>
        </div>
    )
}

export default Category