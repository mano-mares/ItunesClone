import React, { useState, useEffect } from 'react';
import {  Link } from 'react-router-dom';
import '../stylesheets/Itunes.css'

const Itunes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      const url = `https://itunes.apple.com/search?term=${searchTerm}&entity=song`;
      if(searchTerm.length > 0)
      {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setSearchResults(data.results);
        } catch (error) {
          console.log('Error fetching data:', error);
        }
      }
      

      setLoading(false);
    };

    fetchData();
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="Library">
      <h1>iTunes Music Searcher</h1>
      <input type="text" placeholder="Search for music" onChange={handleSearch} />
      {loading ? (
        <p>Searching...</p>
      ) : searchResults.length === 0 ? (
        <p>Please type a filter</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Album Artwork</th>
              <th>Track Name</th>
              <th>Artist</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((song) => (
              <tr key={song.trackId}>
                <td>
                  <img src={song.artworkUrl100} alt="Album Artwork" style={{ width: '100px' }} />
                </td>
                <td>{song.trackName}</td>
                <td>{song.artistName}</td>
                <td>
                  <Link to={`/song/${song.trackId}`}>
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Itunes;