import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import "./Data.css";
import { Dropbox } from "dropbox";
import { token$, updateToken } from "../store";
import { favorites$, updateFavoriteObservable } from '../store';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap";
import Dropdown from './Dropdown';
import { Star } from './Star.js';
import { FilledStar } from './FilledStar.js';
import Thumbnail from './Thumbnail';
import CreateFolder from './CreateFolder';

export default function Favorite(props) {
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

  /*------------------------------------- Download files ---------------------------------------------*/
  // Function to download files
  function handleDownloadFile(fileName, filePath) {
    const dropbox = new Dropbox({ accessToken: token$.value, fetch });
    dropbox.filesDownload({ path: filePath })
      .then((response) => {
        console.log("File details to be download: ", response);
        let url = URL.createObjectURL(response.fileBlob);
        let downloadButton = document.createElement('a');
        downloadButton.setAttribute('href', url);
        downloadButton.setAttribute('download', response.name);
        downloadButton.click();
      })
      .catch((error) => {
        console.log(error.response);
      })
  }
/*------------------------------------- End Download files ---------------------------------------------*/

  function onClickRemoveFavorite(event) {
    let id = event.target.id;
    let filteredFavorites = favorites.filter(object => {
      return object.id !== id;
    });
    updateFavoriteObservable(filteredFavorites);
  }

  // function redirectToHome(event) {
  //   console.log('redirecting...');
  //   props.updateActiveTab('2');
  //
  //   console.log('Active tab: ', props.activeTab);
  // }

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

              console.log('file.path_display: ', file.path_display);

              return (
                <tr key={file.id}>
                  <td style={{ color: 'green' }}><Thumbnail file={file} /></td>
                  <td>{file[".tag"] === "folder" ? <Link to={`/home${file.path_display}`}>{file.name}</Link> : <span onClick={() => handleDownloadFile(file.name, file.path_display)} style={{ cursor: 'pointer', color: 'blue' }}>{file.name}</span>}</td>
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
