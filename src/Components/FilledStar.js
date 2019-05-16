import React from 'react';

export function FilledStar(props) {
  return <i class="material-icons" id={props.id} onClick={props.onClickRemoveFavorite} style={{ verticalAlign: "bottom", color: "#31572C" }}>star</i>;
}
