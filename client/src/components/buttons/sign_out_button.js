import React from 'react';

// export default props => (    

//     <a href='/auth/logout'>
//         <div className="dashboard-signout">Sign Out
//              {/* <i className="far fa-sign-out-alt"></i> */}
//         </div>
//     </a>
// )

export default props => (    
    <div className="btn corner-signin-container">
        <a className="corner-signin" href='/auth/logout'>Sign Out</a>
    </div>
)