import React, { useState, useEffect } from 'react';
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import { Helmet } from 'react-helmet';
import './Home.css';

import { token$, updateToken } from './Store';
import axios from 'axios';
import { Dropbox } from 'dropbox';

let dropbox;
function Home(props) {
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

 //const [token, updateToken] = useState(token$.value);
 const [currentPath, setCurrentPath] = useState("");
 const [currentFolder, setCurrentFolder] = useState({});
 const [didMount, setDidMount] = useState(false);

 function setPath (path) {
  console.log("Path is", path);
  let newPath = currentPath + path;
  setCurrentPath(newPath);
  console.log('state path', currentPath);
}

useEffect(() => {
  let token = window.location.search.replace('?code=', '');
  const API_Auth = `https://api.dropboxapi.com/oauth2/token?code=${token}&grant_type=authorization_code&redirect_uri=http://localhost:3000/home&client_id=708xp4tm8gf03u3&client_secret=b9biggl17een22r`;

  if(!token$.value){
    axios.post(API_Auth)
    .then((res) => {
      console.log(res);
      updateToken(res.data.access_token);
      setDidMount(true);
    })
    .catch(err => {
      //console.log(err.response)
      
    })
  }
  else{
    setDidMount(true);
  }
}, []);

useEffect(() => {
  if(didMount){
    dropbox = new Dropbox({accessToken: token$.value, fetch});
    dropbox.filesListFolder({path: currentPath})
    .then(res => {
      console.log(res);
      setCurrentFolder(res);
    })
  }
}, [didMount]);

// Table data
const Content = (props) => {
  console.log(props.currentFolder.entries);

  return (
    <>
      {
        !props.currentFolder.entries ? <div>Loading...</div> :
        <table border='1'>
          <thead>
            <tr>
              <th>Star</th>
              <th>File type</th>
              <th>File name</th>
              <th>Last modified</th>
              <th>Size</th>
              
            </tr>
          </thead>
          <tbody>
            {props.currentFolder.entries.map((file) => {
              return (
                <tr key={file.id}>
                  <td>*</td>
                  <td>{file[".tag"]}</td>
                  <td onClick={(e) => props.setPath(file.path_lower)}>{file.name}</td>
                  <td></td>
                  <td></td>
                </tr>
              )
            })}
          </tbody>
       </table>
      }
    </>
  )
}


  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {/* <Breadcrumb tag="nav" listTag="div">
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
          <tr>
            <td><i class="material-icons">folder</i></td>
            <td>hej.txt</td>
            <td>30 kB</td>
            <td>2019-04-29 12:00</td>
            <td><i class="material-icons">more_horiz</i></td>
            <td><i class="material-icons">star</i></td>
          </tr>
        </tbody>
      </Table> */}
      
      <Content setPath={setPath} currentFolder={currentFolder}/>
    </>
  );
}

export default Home;