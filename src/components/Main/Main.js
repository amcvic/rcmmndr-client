import React, {useState} from 'react';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import {
  NavLink,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Button
} from 'reactstrap';
import SearchIndex from '../SearchIndex/SearchIndex';
import Library from '../Library/Library';
import Recommendations from '../Recommendations/Recommendations';

const Main = (props) => {

  const [library, setLibrary] = useState([]);
  const [imageData, setImageData] = useState({});

  let key = '&api_key=5ff771bb2c1035bc68cfd0edeccae9da';
  let artistBase = '&artist=';

  const fetchLibrary = () => {
    fetch('http://localhost:3000/profile/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': props.token
      }
    }).then(res => res.json())
    .then(json => setLibrary(json))
    .catch(err => console.log(err));
  }

  const addArtistToProfile = (artist, url, imgUrl) => {
    fetch('http://localhost:3000/profile/add', {
      method: 'POST',
      body: JSON.stringify({artist: artist, url: url, imgUrl: imgUrl}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': props.token
      }
    }).then(res => res.json())
    .catch(err => console.log(err));
  }

  const fetchImage = (artist) => {
    let url = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&format=json';
    fetch(url + key + artistBase + artist, {
      method: 'GET',
      headers: {
        'Content-Type': 'applicaton/json'
      }
    }).then(res => res.json())
    .then(json => json.topalbums && json.topalbums.album[0] ? setImageData(prevState => ({...prevState, [artist]:json.topalbums.album[0].image[2]['#text']})) : setImageData(prevState => ({...prevState, [artist]:'https://lastfm-img2.akamaized.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png'})))
    .catch(err => console.log(err));
  }

  return(
    <>
    <Navbar color='dark' variant='dark'>
    <NavbarBrand tag={Link} to='/'>RCMMNDR</NavbarBrand>
      <Nav className='mr-auto'>
        <NavLink tag={Link} to='/library'>Library</NavLink>
        <NavLink tag={Link} to='/recs'>Recommendations</NavLink>
        <NavItem><Button onClick={props.logout}>Logout</Button></NavItem>
      </Nav>
    </Navbar>
    <div>
    <Switch>
      <Route exact path='/'><SearchIndex fetchImage={fetchImage} imageData={imageData} setImageData={setImageData} addArtistToProfile={addArtistToProfile} token={props.token}/></Route>
      <Route exact path='/library'><Library fetchImage={fetchImage} imageData={imageData} library={library} fetchLibrary={fetchLibrary} token={props.token}/></Route>
      <Route exact path='/recs'><Recommendations fetchImage={fetchImage} imageData={imageData} library={library} fetchLibrary={fetchLibrary} addArtistToProfile={addArtistToProfile}/></Route>
    </Switch>
    </div>
    </>
  );
}

export default Main;