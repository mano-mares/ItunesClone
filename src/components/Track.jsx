import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../stylesheets/Track.css'

const Track = () => {
    const [track, setTrack] = useState(null);
    const [error, setError] = useState(null);
    const { trackId } = useParams();
    useEffect(() => {
      fetch(`https://itunes.apple.com/lookup?id=${trackId}`)
        .then(res => res.json())
        .then(data => setTrack(data.results[0]))
        // .then(data => console.log(data.results[0]))
        .catch(error => setError(error))
    }, [])
    
      return (
        <div className='trackDetail'>
            <h1>iTunes Music Searcher</h1>
          <Link to="/"><button>Back</button></Link>
          <div>
          <img src={track?.artworkUrl100} alt="Album Artwork" style={{ width: '200px' }} />
          <h2>{track?.trackName} - {track?.artistName}</h2>
          <p>Preview:</p>
          <audio src={track?.previewUrl} controls />
          </div>
        </div>
      );
    };
  export default Track;