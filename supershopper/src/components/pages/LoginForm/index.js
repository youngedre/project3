import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import logo from "../../../assets/images/logo2.png";
import './style.css'
import axios from 'axios'



class LoginForm extends Component {
  constructor(){
    super()
  this.state = {
    email: "",
    password: "",
    redirectTo: null
  }
  this.handleInputChange = this.handleInputChange.bind(this)
  // this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
}
  handleInputChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    if(name === 'password'){
      value = value.substring(0, 15)
    }
    this.setState({
      [name]: value
    });
  }
  handleLoginSubmit = event => {
    event.preventDefault();
    axios.post('/user/login', {
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      if(res.status === 200){
        console.log(res)
        this.props.updateUser({
          loggedIn: true,
          email: res.data.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName
        });
        this.setState({
          redirectTo: '/'
        });
      }
    }).catch(err => {
      console.log(err)
    })
  };
  render(){
    if(this.state.redirectTo){
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    }else{
    return(
      <div id='background'>
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='red' textAlign='center'>
      <Image src={logo} /><h1>Welcome To Super Shopper</h1>
      Log-in to your account
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input 
          name='email'
          value={this.state.email}
          onChange={this.handleInputChange}
          fluid icon='user' 
          iconPosition='left' 
          placeholder='E-mail address' />
          <Form.Input
            fluid
            icon='lock'
            name='password'
            value={this.state.password}
            onChange={this.handleInputChange}
            iconPosition='left'
            placeholder='Password'
            type='password'
            />

          <Button className='submit' color='black' fluid size='large' onClick={this.handleLoginSubmit}>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href='/signup'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid></div>
    )}}

}
export default LoginForm