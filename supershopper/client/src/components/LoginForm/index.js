import React, {Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import logo from "../../assets/images/logo.png";
// import {Redirect} from 'react-router-dom'



class LoginForm extends Component {
  state = {
    email: "",
    password: "",
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
    if (!this.state.email || !this.state.password) {
      alert("Fill out your email and password please!");
    } else if (this.state.password.length < 6) {
      alert(
        `Invalid email and/or password` 
      );
    } else{
      console.log(`${this.state.email} ${this.state.password}`);
      this.props.history.push('/user/')
    }
    this.setState({
      password: ""
    });
   
  };
  render(){
    return(
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='red' textAlign='center'>
        <Image src={logo} /> Log-in to your account
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
  </Grid>
    )}

}
export default LoginForm