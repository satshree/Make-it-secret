import React, { Component } from 'react'
import { Modal, Form, Button, Spinner } from 'react-bootstrap'
import swal from '@sweetalert/with-react'
import $ from 'jquery'
const { ipcRenderer } = window.require('electron')

class Encrypt extends Component {
    state = {
        show:false,
        start:false
    }

    handleClose = () => this.setState({
        show:false,
        start:this.state.start
    })
    handleShow = () => this.setState({
        show:true,
        start:this.state.start
    })

    getBtn = () => {
        if (this.state.start) {
            return (
                <React.Fragment>
                    <Button variant="success" size="md" disabled> 
                        <Spinner 
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"/>
                        <span className="gap"> Encrypting ... </span>
                    </Button>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Button variant="success" size="md" onClick={ this.handleShow }> Encrypt </Button>
                </React.Fragment>
            )
        }
    }

    encrypt = (event) => {
        event.preventDefault()
        event.stopPropagation()

        let path = this.props.path
        let key = $("#encKeyValue").val()

        this.setState({
            show:false,
            start:true
        })

        let args = [
            key,
            path,
            "encrypt"
        ]

        ipcRenderer.invoke("START", args).then((resp) => {
            if(resp === "ERR") {
                swal({
                    title:"Something went wrong.",
                    text:"Please try again.",
                    icon:"error"
                })

                this.setState({
                    show:this.state.show,
                    start:false
                })
            } else {
                this.complete()
            }
        })
    }
    
    complete = () => {
        this.setState({
            show:this.state.show,
            start:false
        })

        swal({
            title:"File Encrypted!",
            text:"Your file is now inaccessible.",
            icon:"success"
        }).then(() => this.props.resetState({
            file:{
              name:null,
              size:0,
              type:null
            },
            path:null,
            encrypt:true
          }))
    }

    render() {
        return (
            <React.Fragment>
                { this.getBtn() }
                <Modal show={ this.state.show } onHide={ this.handleClose } centered>
                    <Modal.Header closeButton>
                        <Modal.Title className="modal-title">Enter Encryption Key.</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={ this.encrypt }>
                            <Form.Group>
                                <Form.Control type="password" id="encKeyValue" placeholder="Encryption Key" required></Form.Control>
                                <Form.Text className="text-muted">
                                    This Key Will Encrypt and Decrypt The File You Chose.
                                </Form.Text>
                            </Form.Group>
                            <hr></hr>
                            <div className="text-center">
                                <div className="btn-box">
                                    <Button type="button" variant="secondary" size="md" onClick={ this.handleClose }>Close</Button>
                                    <Button type="submit" variant="success" size="md">Encrypt</Button>
                                </div>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        )
    }
}

export default Encrypt
