import React, {useState, useEffect} from 'react';
import {Form, FormFeedback, FormGroup, Label, Input, Button} from 'reactstrap';

const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let handleSubmit = (event) => {
    event.preventDefault();
    if (!username.match(emailRegex)) {
      setValidEmail(false);
      setInvalidEmail(true);
    } 
    if (password.length < 5) {
      setValidPassword(false);
      setInvalidPassword(true);
    }
    if (validPassword && validEmail) {
      fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        body: JSON.stringify({user: {username: username, password: password}}),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(
        (res) => res.json()
      ).then((data) => {
        console.log(data);
        props.updateToken(data.sessionToken);
        // return fetch('http://localhost:3000/profile/create', {
        //   method: 'POST',
        //   headers: new Headers({
        //     'Content-Type': 'application/json',
        //     'Authorization': data.sessionToken
        //   })
        // });
      }).catch((err) => {
        console.log('request failed', err);
      });
    }
  }

  useEffect(() => {
    if (username.match(emailRegex)) {
      setInvalidEmail(false);
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
    if (password.length > 4) {
      setInvalidPassword(false);
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  });

  return (
    <>
      <h1>Sign up</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor='username'>E-mail</Label>
          <Input valid={validEmail} invalid={invalidEmail} placeholder='email@example.com' onChange={(e) => setUsername(e.target.value)} name='username' value={username}/>
          <FormFeedback>Please input a valid e-mail address</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='password'>Password</Label>
          <Input valid={validPassword} invalid={invalidPassword} type='password' onChange={(e) => setPassword(e.target.value)} name='password' value={password}/>
          <FormFeedback>Password must have at least 5 characters</FormFeedback>
        </FormGroup>
        <Button type='submit'>Sign up</Button>
        <Button onClick={() => props.setSignup(false)}>Log in</Button>
      </Form>
    </>
  );

}

export default Signup;