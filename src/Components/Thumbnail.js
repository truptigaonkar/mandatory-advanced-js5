import React, { useEffect, useState } from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../store';

const fileType = /\.(gif|jpg|jpeg|tiff|tif|png|bmp)$/i;

const Thumbnail = props => {
  const [url, updateUrl] = useState('');

  useEffect(() => {
    if(fileType.test(props.file.name)){
      const dropbox = new Dropbox({ accessToken: token$.value, fetch });
      dropbox.filesGetThumbnail({path: props.file.path_lower, size: 'w32h32'})
      .then((response) => {
        let urlBlob = URL.createObjectURL(response.fileBlob);
        updateUrl(urlBlob);
      })
      .catch(function (error) {
        console.error(error);
      });
    }
  }, [props.file.name, props.file.path_lower])


  if(fileType.test(props.file.name)){
    return (
      <img src={url} alt={props.file.name}></img>
    )
  }
  else if (props.file['.tag'] === 'file') {
    return (
      <i class="material-icons">file_copy</i>
    )
  }else{
    return null
  }
}

export default Thumbnail
