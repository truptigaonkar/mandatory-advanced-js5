import React from 'react';

export function Star(props) {
  return <i class="material-icons" id={props.id} onClick={props.onClickAddFavorite}>star_border</i>;
}
