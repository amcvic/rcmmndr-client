import React, {useState, useEffect} from 'react';
import {Button, Row, Col} from 'reactstrap';

const Recommendations = (props) => {

  const [similars, setSimilars] = useState([]);
  const [isRendered, setIsRendered] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [page, setPage] = useState(1);

  var count = {};
  var sorted = [];
  var resultsPerPage = 30;

  let key = '&api_key=5ff771bb2c1035bc68cfd0edeccae9da';

  // return Object.keys(props.library).filter(key => props.library[key].owner === 16).map((key, i) => {

  const recommend = () => {
    // if (props.library.length === 0) {
    //   console.log('fetching library');
    //   props.fetchLibrary();
    // }

    ///HARDCODED VALUE CHANGE PLS
    Object.keys(props.library).filter(key => props.library[key].owner === 16).map((key, i) => {
      fetchSimilar(props.library[key].artist);
    });
    setIsRendered(true);
  }

  const appendToArray = (similarArtists) => {
    similarArtists.forEach((e) => {setSimilars(prevSimilars => ([...prevSimilars,e.name]));});
  }

  const fetchSimilar = (artist) => {
    let url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&format=json';
    fetch(url + '&artist=' + artist + key, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(json => {
      appendToArray(json.similarartists.artist);
      // json.similarartists.artist.map((e,i) => {
      //   if (!props.imageData[e.name] && props.imageData[e.name] !== '') {
      //     console.log('fetching image for ' + e.name);
      //     props.fetchImage(e.name);
      //   }
      // })
    })
    .catch(err => console.log(err));
  }

  const sort = () => {
    //map all artists to a duplicate array of numbers that increase for every instance of that artist
    similars.map((name) => {
      if (count[name] == null) {
        count[name] = 1;
      } else {
        count[name]++;
      }
    });
    //push artist array & amt of instances to new array
    for (var artist in count) {
      sorted.push([artist, count[artist]]);
    }
    //sort array ascending
    sorted.sort(function(a, b) {
      return b[1] - a[1];
    });
    //filter out artists that are already in library
    // var filtered = sorted.filter(
    //   function (e) {return this.indexOf(e[0]) < 0;},
    //   Object.keys(props.library).map(key => props.library[key])
    // );
    // setRecommendations(filtered);
    setRecommendations(sorted);
    setIsSorted(true);
  }

  // useEffect(() => {
  //   console.log('effect reached');
  //   var filtered = sorted.filter(
  //     function (e) {return this.indexOf(e[0]) < 0;},
  //     props.library
  //   );
  //   setRecommendations(filtered);
  // });

  return(
    <>
      <h1 align='center'>Recommendations</h1>
      {!isRendered ? recommend() : null}
      {/* {(similars.length === props.library.length*100) && !isSorted ? sort() : null} */}
      {(similars.length === 7*100) && !isSorted ? sort() : null}
      <Row className={'center'}>
        {isSorted ? recommendations.filter((e, i) => {
          return i < page*resultsPerPage && i > (page-1)*resultsPerPage;
        }).map((e, i) => {
          if (!props.imageData[e[0]] && props.imageData[e[0]] !== '') {
            console.log('no image found for ' + e[0]);
            props.fetchImage(e[0]);
          }
          return (<Col className={'artistClass'} md='3' key={i}><p>{e[0] + ' ' + e[1]}</p><Button className={'floatRight'} color='success' onClick={() => props.addArtistToProfile(e[0])}>+</Button><img alt={e[0]} src={props.imageData[e[0]]}/></Col>)
          }) : <h3>Loading...</h3>}
          <Button onClick={() => setPage(prevState => prevState - 1)}>Prev page</Button>
          <Button onClick={() => setPage(prevState => prevState + 1)}>Next page</Button>
      </Row>
    </>
  );
}

export default Recommendations;