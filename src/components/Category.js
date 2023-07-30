import React from 'react'

function Category({ category }) {
    return (
        <div className='categorys'>
            <div className='ctgItem'>
                <h6 className='ctgName'>{category.name}</h6>
            </div>
        </div>
    )
}

export default Category
