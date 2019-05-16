import React, { Component, useState, useEffect } from "react";
import { Dropbox } from "dropbox";
import { token$, updateToken } from "../store";

 const FolderList = (props) => {

  const allfolders = props.folders.map(folder => {
    return <option key={folder.path} value={folder.path}>{folder.name}</option>
  });

  return allfolders;
 } 

 export default FolderList;