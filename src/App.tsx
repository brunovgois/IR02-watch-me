import { useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { api } from './services/api';
import './styles/global.scss';
import './styles/sidebar.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);


  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar setGenreId={setSelectedGenreId} genreId={selectedGenreId}/>

    <Content id={selectedGenre.id} title={selectedGenre.title} />
    </div>
  )
}
