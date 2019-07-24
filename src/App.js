import React, {useState, useEffect} from 'react';
import Main from './components/Main/Main';
import Auth from './components/Auth/Auth';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

function App() {

  document.title = 'RCMMNDR';

  const [sessionToken, setSessionToken] = useState('');
  const [signup, setSignup] = useState(false);
  const [userid, setUserid] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  // const updateUser = (userid) => {
  //   localStorage.setItem('userid', userid);
  //   setUserid(userid);
  // }

  const protectedViews = () => {
    return (sessionToken === localStorage.getItem('token') ? <Router> <Main token={sessionToken} logout={clearToken}/> </Router> : <Auth signup={signup} setSignup={setSignup} token={sessionToken} updateToken={updateToken}/>);
  }

  return (
    <div className='bg'>
      {protectedViews()}
    </div>
  );
}

export default App;
