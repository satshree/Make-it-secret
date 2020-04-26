import React, { Component } from 'react'
import { Modal, Form, Button, Spinner } from 'react-bootstrap'
import swal from '@sweetalert/with-react'
import $ from 'jquery'
const { ipcRenderer } = window.require('electron')

class Decrypt extends Component {
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
                <Button variant="info" size="md" disabled> 
                    <Spinner 
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"/>
                    <span className="gap"> Decrypting ... </span>
                </Button>
            )
        } else {
            return (
                <Button variant="info" size="md" onClick={ this.handleShow }> Decrypt </Button>
            )
        }
    }

    decrypt = (event) => {
        event.preventDefault()
        event.stopPropagation()

        let path = this.props.path
        let key = $("#decKeyValue").val()

        this.setState({
            show:false,
            start:true
        })

        let args = [
            key,
            path,
            "decrypt"
        ]

        ipcRenderer.invoke("START", args).then((resp) => {
            if(resp.indexOf("ERR") !== -1) {
                swal({
                    title:"Something went wrong.",
                    text:"Please try again.",
                    icon:"error"
                })

                this.setState({
                    show:this.state.show,
                    start:false
                })
            } else if (resp.indexOf("WRONG KEY") !== -1) {
                swal({
                    title:"The key you entered is incorrect.",
                    icon:"warning"
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
            title:"File Decrypted!",
            text:"Decrypted file is saved on your Desktop.",
            icon:"success"
        }).then(() => window.location.href="/")
    }

    render() {
        return (
            <React.Fragment>
                { this.getBtn() }
                <Modal show={ this.state.show } onHide={ this.handleClose } centered>
                    <Modal.Header closeButton>
                        <Modal.Title className="modal-title">Enter Decryption Key.</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={ this.decrypt }>
                            <Form.Group>
                                <Form.Control type="password" id="decKeyValue" placeholder="Decryption Key" required></Form.Control>
                                <Form.Text className="text-muted">
                                    The Key Used To Encrypt The File You Chose.
                                </Form.Text>
                            </Form.Group>
                            <div className="text-center">
                                <Button type="button" variant="secondary" size="md" onClick={ this.handleClose }>Close</Button>
                                <Button type="submit" variant="info" size="md">Decrypt</Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        )
    }
}

export default Decrypt