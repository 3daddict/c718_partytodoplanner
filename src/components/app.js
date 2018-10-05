import React from 'react';
import {Route} from 'react-router-dom';
//CSS stylesheets
import '../assets/css/styles.css';
import '../assets/css/app.css';
//Components
import TempNav from './tempNav';
import Home from './home';
import List from './list';
import Dashboard from './dashboard';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel, faUser, faChevronLeft, faLink, faSort, faComments, faPen, faTrashAlt, faPlusCircle, faDollarSign } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel, faUser, faChevronLeft, faLink, faSort, faComments, faPen, faTrashAlt, faPlusCircle,faDollarSign)


const App = () => (
    <div className="app">
        <nav className="col-1 side-nav">
        </nav>
        <div className="col-2">
            <header>
            <TempNav />
            </header>
            <main className="content">
                <Route exact path="/" component={Home} />
                <Route exact path="/list" component={List} />
                <Route exact path="/dashboard" component={Dashboard} />
            </main>
            <footer>
                Footer
            </footer>
        </div>
    </div>
    
);

export default App;
