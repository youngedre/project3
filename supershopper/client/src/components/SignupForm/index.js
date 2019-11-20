import React, {Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import logo from "../../assets/images/logo.png";



class SignUpForm extends Component {
  state = {
    firstName: "",
    lastName: "",
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
  handleSignupSubmit = event => {
    event.preventDefault();
    if (!this.state.firstName || !this.state.lastName) {
        alert("Fill out your first and last name please!");
      }
    else if (!this.state.email || !this.state.password) {
      alert("Fill out your email and password please!");
    } else if (this.state.password.length < 6) {
      alert(
        `Choose a more secure password` 
      );
    }
    else{
        console.log(`${this.state.email} ${this.state.password}`);
        this.props.history.push('/user/')
      }
    
  };
  render(){
    return(
      <div className='container'>
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='red' textAlign='center'>
        <Image src={logo} /> Welcome to Super Shopper!
        <p color='black'>Please Fill Out The Information Below</p>
      </Header>
      <Segment inverted>
      <Form inverted>
    <Form.Group unstackable widths={2}>
      <Form.Input
      name='firstName' 
      label='First name' 
      placeholder='First name' 
      value={this.state.firstName}
      onChange={this.handleInputChange}
      />
      <Form.Input
      name="lastName" 
      label='Last name' 
      placeholder='Last name' 
      value={this.state.lastName}
      onChange={this.handleInputChange}
      />
    </Form.Group>
    <Form.Group widths={2}>
      <Form.Input
      name='email' 
      label='Email address' 
      placeholder='Email address' 
      value={this.state.email}
      onChange={this.handleInputChange}
      />
      <Form.Input 
      name='password'
      label='Password' 
      placeholder='Password' 
      type='password'
      value={this.state.password}
      onChange={this.handleInputChange}
      />
    </Form.Group>
    <Button type='submit' color='red' fluid size='large' className='submit' onClick={this.handleSignupSubmit}>Submit</Button>
  </Form>
  </Segment>
    </Grid.Column>
  </Grid></div>
    )}

}
export default SignUpForm