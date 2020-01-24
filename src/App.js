import React, { useState } from 'react';
import { Button } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'

import InputForm from './Component/Inputform.js'
import Showdata from './Component/Showdata.js'

import { Divider, Grid, Segment } from 'semantic-ui-react'

import Store from './Component/Store.js'

// export const dataContext = React.createContext('emthy')
// export const abContext = React.createContext({})

function App() {
  
  // const [data, setData] = useState('emthy')
  // const [ab, setAb] = useState({})

  return (
    // <dataContext.Provider value={[data, setData]} >
    //   <abContext.Provider value={[ab, setAb]} >
    <Store>
        <Segment>
          <Grid columns={2} relaxed='very'>
            <Grid.Column>
              <InputForm />
            </Grid.Column>
            <Grid.Column>
              <Showdata />
            </Grid.Column>
          </Grid>
          <Divider vertical>AND</Divider>
        </Segment>
    </Store>
    //   </abContext.Provider>
    // </dataContext.Provider>
  );
}

export default App;
