import React from "react";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

function Breadcrumbs(props) {
  let linkToDirectory = "";
  let pathElements = props.path.substring(1).split("/");
  const directoryLinks = pathElements.map((directory, idx) => {
    linkToDirectory += `/${directory}`;
    return <BreadcrumbItem active={idx === pathElements.length - 1} tag="a" href={linkToDirectory}>{idx === 0 ? "Home" : directory}</BreadcrumbItem>
  })

  return (
    <Breadcrumb>
      {directoryLinks}
    </Breadcrumb>
  )
}

export default Breadcrumbs;