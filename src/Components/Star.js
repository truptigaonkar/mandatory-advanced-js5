import React from 'react';

export function Star(props) {
  return <i class="material-icons" id={props.id} onClick={props.onClickAddFavorite} style={{ verticalAlign: "bottom", color: "#31572C" }}>star_border</i>;
}
