import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/user/signup', {
      method: 'POST',
      body: JSON.stringify({user: {username: username, password: password}}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(
      (res) => res.json()
    ).then((data) => {
      props.updateToken(data.sessionToken);
      return fetch('http://localhost:3000/profile/create', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': data.sessionToken
        })
      });
    }).then((res) => {
      return res.json();
    }).catch((err) => {
      console.log('request failed', err);
    });
  }

  return (
    <>
      <h1>Sign up</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor='username'>Username</Label>
          <Input onChange={(e) => setUsername(e.target.value)} name='username' value={username}/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='password'>Password</Label>
          <Input type='password' onChange={(e) => setPassword(e.target.value)} name='password' value={password}/>
        </FormGroup>
        <Button type='submit'>Sign up</Button>
        <Button onClick={() => props.setSignup(false)}>Log in</Button>
      </Form>
    </>
  );

}

export default Signup;