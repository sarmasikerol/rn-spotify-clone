import axios from 'axios';
import {createContext, useEffect, useState} from 'react';

const ArtistContext = createContext();

const ArtistsProvider = ({children}) => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const getArtists = async () => {
    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        params: {
          q: 'popular',
          type: 'artists',
          offset: '0',
          limit: '10',
          numberOfTopResults: '5'
        },
        headers: {
          'x-rapidapi-key': 'ade1caacebmsh5be96ce8cc4ce84p178c69jsn3c569a193a52',
          'x-rapidapi-host': 'spotify23.p.rapidapi.com'
        }
      };

    try {
      const response = await axios.request(options);
      const data = response.data.artists.items;
      setArtists(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <ArtistContext.Provider value={{artists, loading, error}}>
      {children}
    </ArtistContext.Provider>
  );
};

export {ArtistContext, ArtistsProvider};
