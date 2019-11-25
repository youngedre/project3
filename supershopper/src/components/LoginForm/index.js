import React, {Component} from 'react'
import { Button, Form, Grid, Image, Message, Segment } from 'semantic-ui-react'
import logo from "../../assets/images/logo.png";
import { useAuth0 } from '../../contexts/auth0-context';
import Header from '../Header/Header';
import { Router, Route, Redirect } from "react-router-dom";
import 'bulma/css/bulma.css';
import './style.css'


function LoginForm() {
  const { isLoading, user, loginWithRedirect } = useAuth0();

  return (
    <>
      <Header />
      <div id='background'>
      <div className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            {!isLoading && !user && (
              <>
                <h1>Please login below:</h1>
                <hr />
                <button onClick={loginWithRedirect} className="button is-danger">Login</button>
              </>
            )}
            {!isLoading && user && (
              <>
              {/* <Redirect to="/user"></Redirect> */}
              </>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default LoginForm