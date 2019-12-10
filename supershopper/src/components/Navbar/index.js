import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from 'react-bootstrap/Navbar'
import './style.css'
    
class Header extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/user/logout').then(response => {
          console.log(response.data)
          if (response.status === 200) {
            console.log('update user fired')
            this.props.updateUser({
              loggedIn: false,
              username: null
            })
            window.location.href = '/'
          }
        }).catch(error => {
            console.log('Logout error')
        })
      }

    render() {
        const loggedIn = this.props.loggedIn;

        const firstName = this.props.firstName;
        const lastName = this.props.lastName;
        console.log('navbar render, props: ')
        console.log(this.props);
        
        return (
            <div>
                    <div className="col-12" >
                        {loggedIn ? (
                            <section className="navbar-section">
                                <Navbar fixed='top' className='bg-success text-white' id="navbar">
                                 <Navbar.Brand href="/">Welcome Holiday Shopper</Navbar.Brand>
                                 <Navbar.Toggle />
                                <Navbar.Collapse className="justify-content-end">
                                 Signed in as: <Link to="/profile" id='link'> {this.props.email}</Link>
                                 <Link to="#" className="btn btn-link text-secondary" onClick={this.logout} id='logout'><span className="text-secondary">logout</span></Link> 
                                </Navbar.Collapse>
                                </Navbar>
                            </section>
                        ) : (
                            <Navbar fixed='top' className='bg-success text-white' id="navbar">
                            <Navbar.Brand href="/">Welcome Holiday Shopper!</Navbar.Brand>
                            <Navbar.Toggle />
                            <Navbar.Collapse className="justify-content-end">
                              <Navbar.Text>
                            <a href="/login">Login</a>
                              </Navbar.Text>
                            </Navbar.Collapse>
                          </Navbar>
                            )}
                    </div>
            </div>

        );

    }
}

export default Header