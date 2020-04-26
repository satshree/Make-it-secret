import React, { Component } from 'react'
import { Modal, Form, Button, Spinner } from 'react-bootstrap'
import swal from '@sweetalert/with-react'

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

    decrypt = () => {
        let file = this.props.file
        let path = this.props.path
        this.setState({
            show:false,
            start:true
        })

        console.log("DECRYPT THIS HERE", file, path)

        setTimeout(this.complete, 2000)
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
                        <Form>
                            <Form.Group>
                                <Form.Control type="password" id="decKeyValue" placeholder="Decryption Key" required></Form.Control>
                                <Form.Text className="text-muted">
                                    The Key Used To Encrypt The File You Chose.
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" variant="secondary" size="md" onClick={ this.handleClose }>Close</Button>
                        <Button type="submit" variant="info" size="md" onClick={ this.decrypt }>Decrypt</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}

export default Decrypt