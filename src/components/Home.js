import React from 'react';
import * as firebase from '@firebase/app';
import '@firebase/auth';

import Main from './Main';
import Intro from './Intro';
import { Link } from 'gatsby';
import { Switch, Route } from 'react-router-dom';

import '../style/Home.css';

class Home extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            rendered: false,
            currentUser: null,
            showDashboard: false
        };

        this.dropDashboard = this.dropDashboard.bind( this );
    }

    componentWillMount()
    {
        if(typeof window !== "undefined")
            firebase.default.auth().onAuthStateChanged( user => {
                this.setState({ rendered: true, currentUser: user });
            });

        console.log( this.state.rendered );
    }

    handleSignOut()
    {
        firebase.default.auth().signOut();
    }

    dropDashboard()
    {
        this.setState({ showDashboard: !this.state.showDashboard });
    }

    render()
    {
        return (
            <div className='Home'>
                <div className='Home-top-bar'>
                    <h2>ProcrastiNation</h2>
                    <h3>percent error calculator</h3>

                    { this.state.currentUser === null || 
                        <div className='Home-dash-container' onClick={this.dropDashboard}>
                            <h3>{ this.state.currentUser.displayName }</h3>
                            <img className='Home-profile' src={ this.state.currentUser.photoURL } />

                            { this.state.showDashboard && 
                                <div className='Home-dash'>
                                    <ul>
                                        <li onClick={this.handleSignOut}><h3>Sign Out</h3></li>
                                    </ul>
                                </div>
                            }
                        </div>
                    }

                    {
                        this.state.currentUser === null &&
                        <div className='Home-link'>
                            <Link to='/Login'><h3>Login</h3></Link>
                        </div>
                    }
                    
                </div>

                { this.state.rendered && this.state.currentUser === null && <Intro /> } 
                { this.state.rendered && this.state.currentUser !== null && <Main /> }
            
            </div>
        )
    }
}

export default Home;