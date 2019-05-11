import React, { useEffect, useState } from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../store';

const fileType = /\.(gif|jpg|jpeg|tiff|tif|png|bmp)$/i;

const FileType = (props) => {
  const [url, updateUrl] = useState('');

  useEffect(() => {
    if(fileType.test(props.file.name)){
      const dropbox = new Dropbox({ accessToken: token$.value, fetch });
      dropbox.filesGetThumbnail({path: props.file.path_lower, size: 'w32h32'})
      .then((res) => {
        let urlBlob = URL.createObjectURL(res.fileBlob);
        updateUrl(urlBlob);
      })
    }
  }, [props.file.name, props.file.path_lower])


  if(fileType.test(props.file.name)){
    return (
      <img src={url} alt={props.file.name}></img>
    )
  }
  else {
    return null
  }

}

export default FileType
