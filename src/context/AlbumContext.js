import {createContext, useEffect, useState} from 'react';
import axios from 'axios';

//* Contextin temelini oluşturur
const AlbumsContext = createContext();
//* Sarmalayıcı yapı
const AlbumsProvider = ({children}) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/search/',
      params: {
        q: 'popüler',
        type: 'albums',
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
      //* API isteği
      const response = await axios.request(options);
      //* API'den gelen veriyi dönüp içerisindeki alacağımız verileri obje olarak aldık
      const albumsItems = response.data?.albums?.items?.map(item => ({
        uri: item.data.uri,
        name: item.data.name,
        artist: item.data.artists.items[0].profile.name,
        coverArt: item.data.coverArt.sources[0].url,
        year: item.data.date.year,
      }));
      setAlbums(albumsItems);
      setLoading(false);
    } catch (error) {
      setError(error);
   
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AlbumsContext.Provider value={{albums, loading, error}}>
      {children}
    </AlbumsContext.Provider>
  );
};

export {AlbumsContext, AlbumsProvider};
