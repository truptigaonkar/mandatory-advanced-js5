import React, { useState, useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import { Helmet } from 'react-helmet';
import './Home.css';
import { Dropbox } from 'dropbox';

let ACCESS_TOKEN = 'u0siLycEZIAAAAAAAAAAPtXA74B-RQ190iCIQcSdrFgwdMBEE2zvsziKG3-QAbSA';

function Home() {
  /*
  const [token, updateToken] = useState(token$.value);

  useEffect(() => {
    const subscription = token$.subscribe(updateToken);
    return () => subscription.unsubscribe();
  });

  if (!token) {
    return <Redirect to="/start" />;
  }
  */

 const [data, updateData] = useState({});

 useEffect(() => {

   let dropbox = new Dropbox({accessToken: ACCESS_TOKEN});

      //Fetching all folders
      dropbox.filesListFolder({path: ''})
      .then(function(response) {
        console.log("Folder list: ", response.entries);
        console.log("Single folder list name: ", response.entries[0].name);
        updateData(response.entries);
      })
      .catch(function(error) {
        console.error(error);
      });


 }, []);


  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Breadcrumb tag="nav" listTag="div">
        <BreadcrumbItem tag="a" href="#">Home</BreadcrumbItem>
        <BreadcrumbItem tag="a" href="#">My Folders</BreadcrumbItem>
        <BreadcrumbItem tag="span" active>Test1</BreadcrumbItem>
      </Breadcrumb>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Size</th>
            <th>Last modified</th>
            <th><i class="material-icons">more_horiz</i></th>
            <th><i class="material-icons">star_border</i></th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td><i class="material-icons">folder</i></td>
            <td>hej.txt</td>
            <td>30 kB</td>
            <td>2019-04-29 12:00</td>
            <td><i class="material-icons">more_horiz</i></td>
            <td><i class="material-icons">star</i></td>
          </tr> */}

{/* 
          
          {data.entries.map((file) => (
              <tr key={file.id}>
              <td>{file[".tag"]}</td>
              </tr>
            ))}  */}
        </tbody>
      </Table> 

    </>
  );
}

export default Home;