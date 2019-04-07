import React from "react"
import firebase from '@firebase/app';

import Helmet from 'react-helmet';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../components/Home';


var config = {
  apiKey: process.env.apiKey,
  authDomain: "simpleuser-3e64f.firebaseapp.com",
  databaseURL: "https://simpleuser-3e64f.firebaseio.com",
  projectId: "simpleuser-3e64f",
  storageBucket: "simpleuser-3e64f.appspot.com",
  messagingSenderId: "156409682561"
};

firebase.initializeApp(config);

const IndexPage = () => (
  <Router>
    <Helmet title='PNation' defer={false} />
    <Route path='/' component={Home} />
  </Router>
)

export default IndexPage
