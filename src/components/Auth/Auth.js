import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import Signup from './Signup';
import Login from './Login';

const Auth = (props) => {
  return (
      <Row className='h-100 test1'>
        <Col className='auth center' sm="12" md={{ size: 6, offset: 3 }}>
          {props.signup ? <Signup token={props.token} signup={props.signup} setSignup={props.setSignup} updateToken={props.updateToken}/> : <Login token={props.token} signup={props.signup} setSignup={props.setSignup} updateToken={props.updateToken}/>}
        </Col>
      </Row>
  );
}

export default Auth;