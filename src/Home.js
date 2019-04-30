import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { Helmet } from 'react-helmet';

function Home() {
  /*
  const [token, updateToken] = useState(token$.value);

  useEffect(() => {
    const subscription = token$.subscribe(updateToken);
    return () => subscription.unsubscribe();
  });

  if (!token) {
    return <Redirect to="/start" />;
  }
  */
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
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
        <tbody>
          <tr>
            <td><i class="material-icons">folder</i></td>
            <td>hej.txt</td>
            <td>30 kB</td>
            <td>2019-04-29 12:00</td>
            <td><i class="material-icons">more_horiz</i></td>
            <td><i class="material-icons">star</i></td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Home;