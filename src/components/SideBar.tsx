import React, { SetStateAction, useEffect, useState } from "react";
import { Button } from './Button';

import { api } from "../services/api";

interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

interface SideBarProps {
    setGenreId: React.Dispatch<React.SetStateAction<number>>;
    genreId: number;
}
export function SideBar(props:SideBarProps) {

    const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  
    useEffect(() => {
      api.get<GenreResponseProps[]>('genres').then(response => {
        setGenres(response.data);
      });
    }, []);

        
    function handleClickButton(id: number) {
        props.setGenreId(id);
      }

    return(
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleClickButton(genre.id)}
          selected={props.genreId === genre.id}
        />
      ))}
    </div>
    </nav>
    );
}