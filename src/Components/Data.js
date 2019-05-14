import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Data.css";
import { Dropbox } from "dropbox";
import { token$, updateToken, favorites$, updateFavoriteObservable } from "../store";
import { Table, Input } from "reactstrap";
import Dropdown from './Dropdown';
import { Star } from './Star.js';
import { FilledStar } from './FilledStar.js';
import Thumbnail from './Thumbnail';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from "reactstrap";
import Delete from './Delete';


function Data(props) {
  const [modal, updateModal] = useState(false);
  const [favorites, updateFavorites] = useState(favorites$.value); //favorites is an array of objects
  const [search, updateSearch] = useState("");
  const [token, updateTokenState] = useState(token$.value);
  //const [data, updateData] = useState([]);
  const [user, updateUser] = useState("");

  let currentLocation = window.location.pathname.substring(5);
  const updateData = props.updateData;

  useEffect(() => {
    // If token exists
    if (token) {
      let dropbox = new Dropbox({ accessToken: token });

      // if then (Fetching files/folders) else (search)
      if (search) {
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
      /*
      dropbox.usersGetCurrentAccount()
        .then(function (response) {
          console.log("User Email: ", response.email);
          updateUser(response.email);
        })
        .catch(function (error) {
          console.error(error);
        });
        */
    }
  }, [token, search, currentLocation]);

  //Listening to favorites observable
  //updateFavorites is used only here. Anywhere else, use updateFavoriteObservable to update favorites.
  useEffect(() => {
    const subscription = favorites$.subscribe(updateFavorites);
    return () => subscription.unsubscribe();
  }, []);

  function onClickAddFavorite(event) {
    //Finding out id
    let id = event.target.id;

    //Looking for the right file/folder in data (matching on id)
    let targetObject;
    for (let object of props.data) {
      if (object.id === id) {
        targetObject = { ...object };
      }
    }

    //Making a copy of favorites array to work with
    let newFavoritesArray = favorites.slice();

    //Adding new object to array
    newFavoritesArray.push(targetObject);

    //Updating favorites
    updateFavoriteObservable(newFavoritesArray);
  }

  function onClickRemoveFavorite(event) {
    let id = event.target.id;
    let filteredFavorites = favorites.filter(object => {
      return object.id !== id;
    });
    updateFavoriteObservable(filteredFavorites);
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

  /*------------------------------------- Delete ---------------------------------------------*/

  // const [fileToDelete, updateFileToDelete] = useState(null);
  // const [currentFolder, setCurrentFolder] = useState([]);

  // function toggleFolder() {
  //   updateModal(true)
  // }

  // //Closing modal
  // function exitModal() {
  //   updateModal(false)
  // }

  // function handleDelete(file) {
  //   console.log(file);
  //   const dropbox = new Dropbox({ accessToken: token$.value, fetch });
  //   dropbox.filesDeleteV2({ path: fileToDelete.path_lower })
  //     .then(response => {
  //       console.log("delete response: ", response);
  //       let folderToDelete = currentFolder.filter((t) => {
  //         return file !== t;
  //       })
  //       setCurrentFolder(folderToDelete);
  //       exitModal();
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     })
  //   window.location.reload();
  // }
  /*------------------------------------- End Delete ---------------------------------------------*/


  return (
    <>
      {/* ------------------------------------- Delete --------------------------------------------- */}
      {/* <Modal isOpen={modal} toggle={toggleFolder} >
        <ModalHeader toggle={exitModal}>Delete file/folder</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Are you sure want to delete "{fileToDelete && fileToDelete.name}"?</Label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleDelete(props.file)}>Delete</Button>{' '}
          <Button color="secondary" onClick={exitModal}>Cancel</Button>
        </ModalFooter>
      </Modal> */}
      {/* ------------------------------------- End Delete --------------------------------------------- */}


      {/* ------------------------------------------ Search ----------------------------------------------- */}
      <Input type="text" placeholder="search..." onChange={(e) => { updateSearch(e.target.value); }} value={props.search} /> <br />
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
          {props.data.map(file => {

            //Favorite logic
            let favorite = false;
            for (let object of favorites) {
              if (object.id === file.id) {
                favorite = true;
                break;
              }
            }

            // let favorite = false;
            // console.log('favorites: ', favorites);

            //console.log('file.path_display: ', file.path_display);

            return (
              <tr key={file.id}>
                <td style={{ color: 'green' }}><Thumbnail file={file} /></td>
                <td>{file[".tag"] === "folder" ? <Link to={`/home${file.path_display}`}>{file.name}</Link> : <span onClick={() => handleDownloadFile(file.name, file.path_display)} style={{ cursor: 'pointer', color: 'blue' }}>{file.name}</span>}</td>
                <td>{file.server_modified ? handleLastModified(file.server_modified) : null}</td>
                <td>{handleSize(file.size)}</td>
                <td><Dropdown file={file} onDelete={props.onDelete} /></td>
                <td>
                  { favorite ? <FilledStar id={file.id} onClickRemoveFavorite={onClickRemoveFavorite}/> : <Star id={file.id} onClickAddFavorite={onClickAddFavorite}/>}
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Data;
