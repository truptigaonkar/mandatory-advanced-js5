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

function Data(props) {
  const [modal, updateModal] = useState(false);
  const [favorites, updateFavorites] = useState(favorites$.value); //favorites is an array of objects
  const [search, updateSearch] = useState("");
  const [token, updateTokenState] = useState(token$.value);
  const [data, updateData] = useState([]);
  const [user, updateUser] = useState("");

  let currentLocation = window.location.pathname.substring(5);

  useEffect(() => {
    // If token exists
    if (token) {
      let dropbox = new Dropbox({ accessToken: token });

    
      // if then (Fetching files/folders) else (search)
      if (!search) {
        //Fetching files/folders
        if (currentLocation === "/") {
          currentLocation = "";
        }
        dropbox.filesListFolder({ path: currentLocation })
          .then(function (response) {
            updateData(response.entries);
          })
          .catch(function (error) {
            console.error(error);
          });
      } else {
        // Search
        dropbox.filesSearch({ path: '', query: search })
          .then(function (response) {
            const files = response.matches.map(file => {
              return file.metadata
            });
            updateData(files)
          })
      }

      // Fetching logged in username
      dropbox.usersGetCurrentAccount()
        .then(function (response) {
          console.log("User Email: ", response.email);
          updateUser(response.email);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [token, search, currentLocation]);

  //Listening to favorites observable
  //updateFavorites is used only here. Anywhere else, use updateFavoriteObservable to update favorites.
  useEffect(() => {
    const subscription = favorites$.subscribe(updateFavorites);
    return () => subscription.unsubscribe();
  }, []);

  function addFavorite(id) {
    //Looking for the right file/folder in data (matching on id)
    let targetObject;
    for(let object of data) {
      if(object.id === id) {
        targetObject = {...object};
      }
    }

    //Making a copy of favorites array to work with
    let newFavoritesArray = favorites.slice();

    //Adding new object to array
    newFavoritesArray.push(targetObject);

    //Updating favorites
    updateFavoriteObservable(newFavoritesArray);
  }

  function removeFavorite(id) {
    let filteredFavorites = favorites.filter(object => {
      return object.id !== id;
    });
    updateFavoriteObservable(filteredFavorites);
  }

  //Function adding or removing favorite depending on current state (checks if the star is filled or not)
  function onClickFavorite(event) {
    let id = event.target.id;
    let textContent = event.target.textContent;

    if(textContent === 'star_border') {
      addFavorite(id);
    }
    else {
      removeFavorite(id);
    }
  }

  /*------------------------------------- Render table data ---------------------------------------------*/
  // Table data Last modified calculations
  function handleLastModified(date) {
    let day = date.substring(8, 10);
    let month = date.substring(5, 7);
    let year = date.substring(0, 4);

    let months = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    month = month.replace(/^0+/, '');
    day = day.replace(/^0+/, '');
    let monthShow = months[month - 1];

    return <label>{day + ' ' + monthShow + ' ' + year}</label>
  }

  // Table data size calculations in Bytes, KB, MB, GB, TB, PB, EB, ZB, YB
  function handleSize(size) {
    let sizes = [' B', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'];
    for (let i = 1; i < sizes.length; i++) {
      if (size < Math.pow(1024, i))
        return (Math.round((size / Math.pow(1024, i - 1)) * 100) / 100) + sizes[i - 1];
    }
    return size;
  }
  /*------------------------------------- End Render table data ---------------------------------------------*/

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

  //console.log("Data: ", data);
  //console.log("Username", user)
  //console.log("hej", data);

  return (
    <>
      {/* ------------------------------------------ Search ----------------------------------------------- */}
      <input type="text" placeholder="search..." onChange={(e) => { updateSearch(e.target.value); }} value={props.search} /> <br />
      {/* Table file/folder data */}
      <Table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Last modified</th>
            <th>Size</th>
            <th>Menu</th>
            <th><i class="material-icons">star_border</i></th>
          </tr>
        </thead>
        <tbody>
          {data.map(file => {

            //Favorite logic
            let favorite = false;
            for(let object of favorites) {
              if(object.id === file.id) {
                favorite = true;
                break;
              }
            }

            // let favorite = false;
            // console.log('favorites: ', favorites);

            return (
              <tr key={file.id}>
                <td style={{ color: 'green' }}><Thumbnail file={file} /></td>
                <td>{file[".tag"] === "folder" ? <Link to={`/home${file.path_display}`}>{file.name}</Link> : <span onClick={() => handleDownloadFile(file.name, file.path_display)} style={{ cursor: 'pointer', color: 'blue' }}>{file.name}</span>}</td>
                <td>{file.server_modified ? handleLastModified(file.server_modified) : null}</td>
                <td>{handleSize(file.size)}</td>
                <td><Dropdown /></td>
                <td>
                  { favorite ? <FilledStar id={file.id} onClickFavorite={onClickFavorite}/> : <Star id={file.id} onClickFavorite={onClickFavorite}/>}
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      {/* ------------------------------------------End Search ----------------------------------------------- */}
    </>
  );
}

export default Data;
