import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Helmet } from 'react-helmet';
import Home from './Home';

class Favorite extends Component {
  render() {
    return (
      <>
      <Helmet>
        <title>Favorite</title>
      </Helmet>
      <h3>Favorite</h3>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Size</th>
            <th>Last modified</th>
            <th><i class="material-icons">more_horiz</i></th>
            <th><i class="material-icons">star_border</i></th>
          </tr>
        </thead>
      </Table>
      </>
    );
  }
}

export default Favorite;