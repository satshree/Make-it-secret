import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

export default function Decrypt() {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <React.Fragment>
            <Button variant="info" size="lg" onClick={ handleShow }> Decrypt </Button>
            <Modal show={ show } onHide={ handleClose } centered>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Enter Decryption Key.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="decryptionKey">
                            <Form.Control type="password" placeholder="Decryption Key"></Form.Control>
                            <Form.Text className="text-muted">
                                The Key Used To Encrypt The File You Chose.
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" variant="secondary" onClick={ handleClose }>Close</Button>
                    <Button type="submit" variant="info" onClick={ handleClose }>Decrypt</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}