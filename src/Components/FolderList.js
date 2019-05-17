import React, { Component, useState, useEffect } from "react";
import { Dropbox } from "dropbox";
import { token$, updateToken } from "../store";

 const FolderList = (props) => {

  let folders = props.folders;
  console.log('folders: ', folders);

  const allfolders = folders.map(folder => {
    return <option key={folder.path} value={folder.path}>{folder.name}</option>
  });

  return allfolders;
 }

 export default FolderList;
