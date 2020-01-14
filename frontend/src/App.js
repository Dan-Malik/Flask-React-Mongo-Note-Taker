import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import LinkBar from './components/linkbar.component';
import NoteList from './components/notelist.component';
import CreateNote from './components/createnote.component';
import UpdateNote from './components/updatenote.component';

function App() {
  return (
    <div>

      <LinkBar />

      <br />
      <Container>
        <Row>
          <Col></Col>
          <Col md={8}>


            <Router>
<Switch>
  <Route exact path="/" component={NoteList}/>
  <Route exact path="/create" component = {CreateNote}/>
  <Route exact path="/update/:id" component = {UpdateNote}/>
</Switch>
</Router>


          </Col>
          <Col></Col>
        </Row>
      </Container>


    </div>
  );
}

export default App;
