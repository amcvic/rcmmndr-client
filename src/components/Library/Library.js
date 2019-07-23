import React, {useEffect} from 'react';
import {Button, Row, Col} from 'reactstrap';
import SearchIndex from '../SearchIndex/SearchIndex';

const Library = (props) => {
  
  const removeArtistFromProfile = (artist) => {
    fetch('http://localhost:3000/profile/delete', {
      method: 'DELETE',
      body: JSON.stringify({artist: artist}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': props.token
      }
    }).then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
  }
//   Object.keys(props.imageData).map((key) => {
//     return <p>{key}: { props.imageData[key] }</p>
//  })
// const result = words.filter(word => word.length > 6);
// filter(key => key.owner === 16).

//CHANGE OWNER TO CURRENT LOGGED IN USER SOMEHOW IDK

  const libraryMapper = () => {
    return Object.keys(props.library).filter(key => props.library[key].owner === 16).map((key, i) => {
      return (
        <Col className={'artistClass'} md='3' key={i}>
          <h3 className={'floatLeft'}>{props.library[key].artist}</h3>
          <Button className={'floatRight'} color='danger' onClick={() => removeArtistFromProfile(props.library[key].artist)}>x</Button>
          <img alt={props.library[key].artist} src={props.library[key].imgUrl}/> 
        </Col>
      );
    });
  }

  // useEffect(() => {
  //   props.library.map((artist) => {
  //     if (!(artist in props.imageData)) {
  //       props.fetchImage(artist.name);
  //     }
  //   });
  // }, [props.imageData]);

  return(
    <>
      <h1 align='center'>Library</h1>
      {props.fetchLibrary()}
      <Row className='left'>
        {libraryMapper()}
      </Row>
      {/* <Row className='right'>
        <SearchIndex token={props.token}/>
      </Row> */}
    </>
  );
}

export default Library;