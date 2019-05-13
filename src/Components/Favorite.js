import React, { useState, useEffect } from "react";
import { Table } from 'reactstrap';
import { Helmet } from 'react-helmet';
import Home from './Home';
import { token$, updateToken } from '../store.js';
import { favorites$, updateFavoriteObservable } from '../store.js';

export default function Favorite() {
  const [token, updateToken] = useState(token$.value);
  const [favorites, updateFavorites] = useState(favorites$.value); //favorites is an array of objects
  const [search, updateSearch] = useState('');

  // Using this instead of helmet because it was causing problem while search
  useEffect(() => {
    document.title = "Home";
  })

  //Listening to token observable
  useEffect(() => {
    const subscription = token$.subscribe(updateToken);
    return () => subscription.unsubscribe();
  }, []);

  //Listening to favorites observable
  //'updateFavorites' is used only here. Anywhere else, use updateFavoriteObservable to update favorites.
  useEffect(() => {
    const subscription = favorites$.subscribe(updateFavorites);
    return () => subscription.unsubscribe();
  }, []);

  function onClickRemoveFavorite(event) {
    let id = event.target.id;
    let filteredFavorites = favorites.filter(object => {
      return object.id !== id;
    });
    updateFavoriteObservable(filteredFavorites);
  }

  return (
    <>

      <input type="text" placeholder="search..." onChange={(e) => { updateSearch(e.target.value); }} value={search} />

      <Table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Last modified</th>
              <th>Size</th>
              <th>Menu</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((file) => {

              return (
                <tr key={file.id}>
                  <td>{file[".tag"] === "folder" ? <i class="material-icons">folder_open</i> : file[".tag"] }</td>
                  <td>{file.name}</td>
                  <td></td>
                  <td></td>
                  <td><i class="material-icons">more_horiz</i></td>
                  <td><button id={file.id} onClick={onClickRemoveFavorite}>Remove from favorites</button></td>
                </tr>
              )
            })}
          </tbody>
       </Table>

    </>
  );
}
