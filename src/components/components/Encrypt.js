import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

export default function Encrypt() {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <React.Fragment>
            <Button variant="success" size="lg" onClick={ handleShow }> Encrypt </Button>
            <Modal show={ show } onHide={ handleClose } centered>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Enter Encryption Key.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="encryptionKey">
                            <Form.Control type="password" placeholder="Encryption Key"></Form.Control>
                            <Form.Text className="text-muted">
                                This Key Will Encrypt and Decrypt The File You Chose.
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" variant="secondary" onClick={ handleClose }>Close</Button>
                    <Button type="submit" variant="success">Encrypt</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}
