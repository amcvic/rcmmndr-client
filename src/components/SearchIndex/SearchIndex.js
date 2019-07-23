import React, {useState, useEffect} from 'react';
import {Form, Label, Input, Button, Row, Col} from 'reactstrap';

const SearchIndex = (props) => {

  const [artist, setArtist] = useState('');
  const [artistData, setArtistData] = useState([]);

  var localImageData = {};

  let key = '&api_key=5ff771bb2c1035bc68cfd0edeccae9da';
  let artistBase = '&artist=';

  const searchArtists = (event) => {
    event.preventDefault();
    let url = 'http://ws.audioscrobbler.com/2.0/?method=artist.search&format=json';
    fetch(url + key + artistBase + artist, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then((json) => {
      setArtistData(json.results.artistmatches.artist);
      json.results.artistmatches.artist.map((e,i) => {
        if (!props.imageData[e.name] && props.imageData[e.name] !== '') {
          console.log('fetching image for ' + e.name);
          props.fetchImage(e.name);
        }
      })
    })
    // .then(json => console.log(json))
    // .then(json => json.results.artistmatches.artist.map((e,i) => {
    //   if (!props.imageData[e.name] && props.imageData[e.name] !== '') {
    //     console.log('fetching image for ' + e.name);
    //     props.fetchImage(e.name);
    //   }
    // }))
    .catch(err => console.log(err));
  }

  const artistMapper = () => {
    return artistData.map((a, i) => {
      // if (!props.imageData[a.name] && props.imageData[a.name] !== '') {
      //   console.log('no image found for ' + a.name);
      //   props.fetchImage(a.name);
      // }
      return (
        // <Col md='3' key={i}>
        <div className={'artistClass'} key={i}>
          <h1>{a.name}</h1>
          <Button color='success' onClick={() => props.addArtistToProfile(a.name, a.url, props.imageData[a.name])}>+</Button> 
          <img alt={a.name} src={props.imageData[a.name]}/>
        </div>
        // </Col>
      );
    });
  }
  
  const resultView = () => {
    return (artistData !== '' ? artistMapper() : <></>)
  }

  // useEffect(() => {
  //   console.log('effect reached');
  //   artistData.map((artist) => {
  //     if (!(artist in props.imageData)) {
  //       props.fetchImage(artist.name);
  //     }
  //   });
  // }, [props.imageData]);

  // https://til.hashrocket.com/posts/z1xzaupgpd-run-side-effect-when-a-prop-changes-whooks
  // map the artist data in an effect that is dependent on props.imageData
  return(
    <>
      <Form className='h-100' onSubmit={searchArtists}>
        <Label htmlFor='artist'>Search for an artist</Label>
        <Input onChange={(e) => setArtist(e.target.value)} name='artist' value={artist}/>
        <Button type='submit'>Search</Button>
      </Form>
      {/* <Row> */}
      {/* {Object.keys(props.imageData).map((key) => {
   return <p>{key}: { props.imageData[key] }</p>
})} */}
        {resultView()}
      {/* </Row> */}
    </>
  );
}

export default SearchIndex;