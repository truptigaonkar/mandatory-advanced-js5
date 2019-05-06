import React, { useState, useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import { Helmet } from 'react-helmet';
import './Home.css';
import { Dropbox } from 'dropbox';

let ACCESS_TOKEN = 'u0siLycEZIAAAAAAAAAA3NVwbhi2hLMF8YtFvS6mL9qzqE2Bb9qNuivhETRLV3hE';

function Home(props) {

 const [data, updateData] = useState([]);

 useEffect(() => {

   let dropbox = new Dropbox({accessToken: ACCESS_TOKEN});

      //Fetching all folders
      dropbox.filesListFolder({path: ''})
      .then(function(response) {
        console.log("Response: ", response.entries);      
        updateData(response.entries);
      })
      .catch(function(error) {
        console.error(error);
      });
      
 }, []);

 console.log("Data: ", data);
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {
        data.length === 0 ? <div>Loading...</div> :
        <>
        {data.map((file) => {
          return(
            <Breadcrumb tag="nav" listTag="div">
              <BreadcrumbItem tag="a" href="#">Home</BreadcrumbItem>
              <BreadcrumbItem tag="a" href="#">My Folders</BreadcrumbItem>
              <BreadcrumbItem tag="span" active>{file.path_display.substr(1)}</BreadcrumbItem>
            </Breadcrumb>
          )
        })
        } 
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
                  <td>{file[".tag"] === "folder" ? <i class="material-icons">folder_open</i> : file[".tag"] }</td>
                  <td>{file.name}</td>
                  <td></td>
                  <td></td>
                  <td><a href="./components/menu.js"><i class="material-icons">more_horiz</i></a></td>
                  <td><a href=""><i class="material-icons">star_border</i></a></td>
                </tr>
              )
            })}
          </tbody>
       </Table>
       </>
      }

    </>
  );
}

export default Home;