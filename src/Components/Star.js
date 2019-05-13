import React from 'react';

export function Star(props) {
  return <i class="material-icons" id={props.id} onClick={props.onClickFavorite}>star_border</i>;
}
