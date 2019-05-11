import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import './Data.css';
import { Dropbox } from 'dropbox';
import { token$, updateToken } from '../store';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import Dropdown from "./Dropdown";

function Data(props) {  
  
  const [search, updateSearch] = useState("");
  const [token, updateTokenState] = useState(token$.value);
  const [data, updateData] = useState([]);
  const [user, updateUser] = useState("");
  const [modal, updateModal] = useState(false);

  useEffect(() => {
    // If token exists
    if (token) {
      let dropbox = new Dropbox({ accessToken: token });

      // if then (Fetching files/folders) else (search)
      if (!search) {
        //Fetching files/folders
        dropbox.filesListFolder({ path: '' })
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
  }, [token, search]);

  

  function onClickFavorite(event) {
    console.log('Making folder or file a favorite...');
  }

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


  //  ------------------------------------- New folder ----------------------------------------------------//
  function toggleFolder() {
    updateModal(true)
  }

  function exitDialog() {
    updateModal(false)
  }


  const [folderName, updateFolderName] = useState("");

  function handleFolderName(e) {
    console.log("console log input value: ", e.target.value);
    updateFolderName(e.target.value);
  }

  
  function handleNewFolder(props) {
    console.log(1)
    // const currentPath = props.location
    // console.log("current path: ", currentPath);

    // let dropbox = new Dropbox({ accessToken: token$.value, fetch });
    // dropbox.filesCreateFolder({ path: currentPath + "/" + folderName })
    // exitDialog();
  }

  //  ------------------------------------- End New folder ----------------------------------------------------//

  //console.log("Data: ", data);
  //console.log("Username", user)
  return (
    <>

      {/* Create new folder button and modal */}
      <div>
        <Button color="danger" onClick={toggleFolder}>Create New Folder</Button>
        <Modal isOpen={modal} toggle={toggleFolder} >
          <ModalHeader toggle={exitDialog}>Create New Folder</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Folder name</Label>
              <Input type="text" placeholder="Folder name" onChange={handleFolderName} value={folderName} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleNewFolder}>Create</Button>{' '}
            <Button color="secondary" onClick={exitDialog}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div><br/>

      {/* Search page */}
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
          {props.data.map((file) => {
            console.log("file data: ", file)
            return (
              <tr key={file.id}>
                <td>{file[".tag"] === "folder" ? <i class="material-icons">folder_open</i> : file[".tag"]}</td>
                <td>{file[".tag"] === "folder" ? <Link to={`/home${file.path_display}`}>{file.name}</Link> : <span onClick={() => handleDownloadFile(file.name, file.path_display)} style={{ cursor: 'pointer', color: 'blue' }}>{file.name}</span>}</td>
                <td>{file.server_modified ? handleLastModified(file.server_modified) : null}</td>
                <td>{handleSize(file.size)}</td>
                <td><Dropdown /></td>
                <td><i class="material-icons" onClick={onClickFavorite}>star_border</i></td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Data;
