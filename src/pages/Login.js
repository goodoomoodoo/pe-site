import React from 'react';
import * as firebase from '@firebase/app';
import '@firebase/auth';

import { Link, navigate, replace } from 'gatsby';
import Footer from '../components/Footer';

import '../style/Login.css';

class Login extends React.Component
{
    handleLogin()
    {
        let provider = new firebase.default.auth.GoogleAuthProvider();

        firebase.default.auth().signInWithPopup( provider )
          .then( result => {
              navigate( '/', { replace: true } );
          })
          .catch( e => {
              console.log( e );
          })
    }

    render()
    {
        return (
            <div className='Login'>

                <div className='Login-back'><Link to='/'><h3>&#8249; Back</h3></Link></div>

                <div className='Login-form'>
                    <h1 className='Login-title'>Percent Error</h1>
                    <h2 className='Login-subtitle'>Login</h2>
                    <p className='Login-description'>I'm broke, so login is required to limit user and cloud funtion call</p>
                    <button className='Login-button' onClick={ this.handleLogin }>Google user come thru</button>
                </div>                

                <Footer />

            </div>
        );
    }
}

export default Login;