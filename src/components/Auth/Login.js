import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import APIURL from '../../helpers/environment';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${APIURL}/user/login`, {
      method: 'POST',
      body: JSON.stringify({user: {username: username, password: password}}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(
      (res) => res.json()
    ).then((data) => {
      props.updateToken(data.sessionToken);
    });
  }

  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor='username'>Username</Label>
          <Input onChange={(e) => setUsername(e.target.value)} name='username' value={username}/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='password'>Password</Label>
          <Input type='password' onChange={(e) => setPassword(e.target.value)} name='password' value={password}/>
        </FormGroup>
        <Button type='submit'>Login</Button>
        <Button onClick={() => props.setSignup(true)}>Sign up</Button>
      </Form>
    </>
  );

}

export default Login;