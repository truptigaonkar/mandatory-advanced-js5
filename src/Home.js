import React, { useState, useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import './Home.css';
import { Dropbox } from 'dropbox';
import { updateToken } from './Store.js'
import { token$ } from './Store.js';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

function Home(props) {

  const [data, updateData] = useState([]);
  const [token, updateTokenState] = useState(token$.value)
  const [search, updateSearch] = useState('');

  // Using this instead of helmet because it was causing problem while search
  useEffect(() => {
    document.title = "Home";
  })


  // Commented out as logout was not working with it.
  // useEffect(() => {
  //   const subscription = token$.subscribe(updateToken);
  //   return () => subscription.unsubscribe();
  // }, []);

  useEffect(() => {

    // If token exists
    if (token) {

      let dropbox = new Dropbox({ accessToken: token });

      // if then else for search
      if (!search) {
        //Fetching all folders
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

    }

  }, [token, search]);

  function onClickFavorite(event) {
    console.log('Making folder or file a favorite...');
  }

  // Logout function
  function handleLogout(e) {
    e.preventDefault();
    updateToken(null);
    updateTokenState(token$.value);
  }

  if (!token) {
    return <Redirect to="/start" />;
  }

  // Table data Last modified calculations
  function handleLastModified (date) {
    // if (moment(new Date()).diff(date, 'days') > 2) {
    //   return moment(date).format('Do MMMM YYYY, h:mm')
    // } else {
    //   return moment(date).fromNow();
    // }

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
    let monthShow = months[month-1];
    

    return <label>{ day + ' ' + monthShow + ' ' + year}</label>
  }

  console.log("Data: ", data);

  return (
    <>

      <button onClick={handleLogout}>Logout</button><br />

      <input type="text" placeholder="search..." onChange={(e) => { updateSearch(e.target.value); }} value={search} />


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
          {data.map((file) => {
            return (
              <tr key={file.id}>
                <td>{file[".tag"] === "folder" ? <i class="material-icons">folder_open</i> : file[".tag"]}</td>
                <td>{file.name}</td>
                <td>{file.server_modified ? handleLastModified(file.server_modified) : null}</td>
                <td></td>
                <td><i class="material-icons">more_horiz</i></td>
                <td><i class="material-icons" onClick={onClickFavorite}>star_border</i></td>
              </tr>
            )
          })}
        </tbody>
      </Table>

    </>
  );
}

export default Home;
