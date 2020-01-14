import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default class CreateNote extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            formNoteTitle: "",
            formNoteContent: "",
            errorMessage: "",
            redirectTarget: null
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    submitNewNote=(event)=>{
        event.preventDefault();

        this.setState({ errorMessage: ""});

        if(!this.state.formNoteTitle) {
            return this.setState({ errorMessage: "Title field is required" });
        }

        if(!this.state.formNoteContent) {
            return this.setState({ errorMessage: "Content field is required" });
        }

        axios.post(`${process.env.REACT_APP_BACKEND_IP}notes`,{
            noteTitle: this.state.formNoteTitle,noteContent:this.state.formNoteContent
        } ).then(
            (response) => {
                console.log(response)
                this.props.history.push('/');
            }
        ).catch((err) => {
            console.log(err)

        })

        

    }

    render() {
        return (<div className="border p-2" >
            <Row className="justify-content-center">


                <Col className="mt-4 text-center" md={12}>

                    <h4>Create a note</h4>

                    <b>{this.state.errorMessage ? this.state.errorMessage : ""}</b>

                </Col>
                <Col md={10}>
                    <Form>
                        <Form.Group controlId="createNoteTitleField">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter note title" name='formNoteTitle' onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group controlId="createNoteContentField">

                            <Form.Label>Content</Form.Label>

                            <Form.Control as="textarea" rows="3" placeholder="Enter note contents" name='formNoteContent' onChange={this.handleChange} />
                            
                        </Form.Group>

                        <div className="text-center">
                            <Button variant="outline-dark" type="submit" onClick={this.submitNewNote} >Submit</Button>

                        </div>
                    </Form>
                </Col>


            </Row>
        </div>);
    }

}