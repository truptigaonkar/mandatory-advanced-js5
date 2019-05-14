import React from 'react';

export function FilledStar(props) {
  return <i class="material-icons" id={props.id} onClick={props.onClickRemoveFavorite}>star</i>;
}
