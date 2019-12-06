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
            this.props.updateUser({
              loggedIn: false,
              username: null
            })
          }
        }).catch(error => {
            console.log('Logout error')
        })
      }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);
        
        return (
            <div>
                    <div className="col-12" >
                        {loggedIn ? (
                            <section className="navbar-section">
                                <Navbar fixed='top' className='bg-info text-white' id="navbar">
                                 <Navbar.Brand href="/">Welcome Holiday Shopper</Navbar.Brand>
                                 <Navbar.Toggle />
                                <Navbar.Collapse className="justify-content-end">
                                <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                <span className="text-secondary">logout</span></Link> 
                                </Navbar.Collapse>
                                </Navbar>
                            </section>
                        ) : (
                            <Navbar fixed='top' className='bg-info text-white' id="navbar">
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