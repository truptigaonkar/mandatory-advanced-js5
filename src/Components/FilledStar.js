import React from 'react';

export function FilledStar(props) {
  return <i class="material-icons" id={props.id} onClick={props.onClickFavorite}>star</i>;
}
