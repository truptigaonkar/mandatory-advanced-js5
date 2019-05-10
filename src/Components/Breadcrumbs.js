import React from "react";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

function Breadcrumbs(props) {
  let linkToDirectory = "";
  let pathElements = props.path.substring(1).split("/");
  const directoryLinks = pathElements.map((directory) => {
    linkToDirectory += `/${directory}`;
    return <BreadcrumbItem tag="a" href={linkToDirectory}>{directory}</BreadcrumbItem>
  })

  //Capitalize Home TypeError: pathElements.map is not a function
  /*
  let linkToDirectory = "home";
  let pathElements = props.path.substring(1).split("/");

  if(pathElements.length > 1) {
    pathElements = pathElements.shift();
  }

  const directoryLinks = pathElements.map((directory) => {
    linkToDirectory += `/${directory}`;
    return <BreadcrumbItem tag ="a" href={linkToDirectory}>{directory}</BreadcrumbItem>
  })
 */
  return (
    <Breadcrumb>
      {/*<BreadcrumbItem tag="a" href="/home">Home</BreadcrumbItem>*/}
      {directoryLinks}
    </Breadcrumb>
  )
}

export default Breadcrumbs;