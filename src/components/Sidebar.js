import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <div id= "sidelinks">
            
                <ul>
                    <li>
                        <Link to="/" className='nav-link px-2'>
                            <i className='bi-house' /><span className='ms-1 d-none d-sm-inline'>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className='nav-link px-2'>
                            <i className='bi bi-card-checklist' /><span className='ms-1 d-none d-sm-inline'>Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/category" className='nav-link px-2'>
                            <i className='bi bi-card-checklist' /><span className='ms-1 d-none d-sm-inline'>Category</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/bills" className='nav-link px-2'>
                            <i className='bi bi-receipt' /><span className='ms-1 d-none d-sm-inline'>Bills</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/customers" className='nav-link px-2'>
                            <i className='bi bi-people' /><span className='ms-1 d-none d-sm-inline'>Customers</span>
                        </Link>
                    </li>
                    <li style={{ marginTop: "50vh" }}>
                        <Link className='nav-link px-2'>
                            <i className='bi bi-box-arrow-in-right' /><span className='ms-1 d-none d-sm-inline'>Logout</span>
                        </Link>
                    </li>
                </ul>
            
        </div>
    )
}

export default Sidebar