import React from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default class NoteList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            notes: null
        }
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BACKEND_IP}/notes`).then(
            (response) => {
                if (response.data.notes.length > 0) {
                    this.setState({ notes: response.data.notes })
                }
            }
        ).catch((err) => {
            console.log(`${process.env.REACT_APP_BACKEND_IP}notes`)
            console.log(err)

        })
    }

    removeNote(noteId) {
        this.setState({ notes: this.state.notes.filter(n => n._id !== noteId) })
    }

    render() {

        if (this.state.notes == null) {
            return (<></>)
        }

        if (this.state.notes.length === 0) {

            return (<h2>No notes added yet!</h2>);

        } else {

            let noteArray = this.state.notes

            return (
                <div>
                    {noteArray.map((note) => {
                        return (<>
                            <div className="border p-2" >

                                <Row>
                                    <Col md={4}><small>{note.dateCreated}</small></Col>
                                    <Col className="mt-4 text-center"><h4>{note.noteTitle}</h4></Col>
                                    <Col md={2}>

                                        <Button variant="outline-dark" type="button" onClick={
                                            () => {
                                                axios.delete(`${process.env.REACT_APP_BACKEND_IP}notes/${note._id}`)
                                                    .then((response) => {
                                                        console.log(response);
                                                        this.removeNote(note._id)
                                                    }).catch(
                                                        (err) => {
                                                            console.log(err)
                                                        }
                                                    )
                                            }
                                        }>Delete</Button>


                                    </Col>
                                    <Col md={2}>

                                        <Button variant="outline-dark" type="button" onClick={()=>{this.props.history.push(`/update/${note._id}`)}}>Update</Button>


                                    </Col>

                                </Row>
                                <hr />
                                <Row>
                                    <Col>
                                        <p className="text-center">{note.noteContent}</p>
                                    </Col>
                                </Row>

                            </div>
                            <br />
                        </>)

                    })}

                </div>
            )
        }
    }

}