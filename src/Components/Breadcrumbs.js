import React from "react";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

function Breadcrumbs(props) {
  let linkToDirectory = "";
  let pathElements = props.path.substring(1).split("/");
  const directoryLinks = pathElements.map((directory, idx) => {
    linkToDirectory += `/${directory}`;
    //let link = `/mandatory-advanced-js5${linkToDirectory}`;
    let link = `http://localhost:3000${linkToDirectory}`; //To test locally 
    return <BreadcrumbItem active={idx === pathElements.length - 1} tag="a" href={link}>{idx === 0 ? "Home" : directory}</BreadcrumbItem>
  })

  return (
    <Breadcrumb>
      {directoryLinks}
    </Breadcrumb>
  )
}

export default Breadcrumbs;