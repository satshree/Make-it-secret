import React, { Component } from 'react'
import { Modal, Form, Button, Spinner } from 'react-bootstrap'
import swal from '@sweetalert/with-react'

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

    encrypt = () => {
        let file = this.props.file
        let path = this.props.path
        this.setState({
            show:false,
            start:true
        })

        console.log("ENCRYPT THIS HERE", file, path)

        setTimeout(this.complete, 2000)
    }
    
    complete = () => {
        this.setState({
            show:this.state.show,
            start:false
        })

        swal({
            title:"File Encrypted!",
            text:"Encrypted file is saved on your Desktop.",
            icon:"success"
        }).then(() => window.location.href="/")
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
                        <Form>
                            <Form.Group>
                                <Form.Control type="password" id="encKeyValue" placeholder="Encryption Key" required></Form.Control>
                                <Form.Text className="text-muted">
                                    This Key Will Encrypt and Decrypt The File You Chose.
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" variant="secondary" size="md" onClick={ this.handleClose }>Close</Button>
                        <Button type="button" variant="success" size="md" onClick={ this.encrypt }>Encrypt</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}

export default Encrypt
