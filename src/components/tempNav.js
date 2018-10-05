import React from 'react';
import {Link} from 'react-router-dom';

export default props => (    
    <div>
        <ul className="nav-menu">
            <li>
                <Link exact to="/" className="btn-blue nav-link">Home</Link>
            </li>
            <li>
                <Link to="/list" className="btn-blue nav-link">List Page</Link>
            </li>
            <li>
                <Link to="/dashboard" className="btn-blue nav-link">User Dash</Link>
            </li>
        </ul>
    </div>
)