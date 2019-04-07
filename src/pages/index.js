import React from "react"
import firebase from '@firebase/app';

import Helmet from 'react-helmet';

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
  <div>
    <Helmet title='PNation' defer={false} />
    <Home />
  </div>
)

export default IndexPage
