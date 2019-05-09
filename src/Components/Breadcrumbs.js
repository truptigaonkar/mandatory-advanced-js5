import React from "react";
//import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
//import Breadcrumbs from 'react-breadcrumbs';
//import { Breadcrumb } from "reactstrap";
//import CardTitle from "reactstrap/lib/CardTitle";

function Breadcrumbs(props) {
  console.log(props.path);
  
  const pathElements = props.path.split("/").map(x => (
    <li>x</li>
  ));
  return (
    <ul>
      {pathElements}
    </ul>
  )
  /*
  pathElements.map(Element => <BreadcrumbItem><a href="#">Element</a></BreadcrumbItem>)
  return (
    <>
    <p>{props.path}</p>
    <Breadcrumb>
      <BreadcrumbItem><a href="/home">Home</a></BreadcrumbItem>
      <BreadcrumbItem><a href="#">Test1</a></BreadcrumbItem>
      <BreadcrumbItem active>Child</BreadcrumbItem>
    </Breadcrumb>
    </>
  )
  
 return (
   <Breadcrumbs separator=" | " >
    <Breadcrumb>{title: "test", pathname: {props.path}}</Breadcrumb>
   </Breadcrumbs>
 )
 */
}

export default Breadcrumbs;