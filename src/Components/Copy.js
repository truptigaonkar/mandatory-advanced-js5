import React, { useState, useEffect } from "react";
import { Dropbox } from 'dropbox';

export function Copy(props) {
  const [fileToCopy, updateFileToCopy] = useState(props.file);

  // function onClickCopy(event) {
  //   let path = fileToCopy.path_lower;
  //   console.log('path: ', path);
  // }

  return <span>Copy</span>;
}
