import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

class Header extends Component {
    state = {
        show:false
    }

    handleClose = () => {
        this.setState({ show:false })
    }

    handleShow = () => {
        this.setState({ show:true })
    }

    render() {
        return (
            <div className="container">
                <br></br>
                <div className="header">
                    <div className="text-center">
                        <h2>
                            <span className="clickable" onClick={ this.handleShow }>
                                MAKE IT SECRET
                            </span>
                        </h2>
                        <em> Encrypt or Decrypt any files easily. </em>
                    </div>
                </div>
                <Modal show={ this.state.show } onHide={ this.handleClose } centered="true">
                    <Modal.Header closeButton>
                        <Modal.Title>About Make It Secret ...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                        <div className="text-center">
                            <b>Make It Secret is developed by Satshree Shrestha.</b>
                            <br></br>
                            <em className="clickable"
                            onClick={ async () => {
                                const { shell } = window.require('electron')
                                await shell.openExternal("https://github.com/satshree/Make-it-secret")
                            } }>Check GitHub repository</em>
                        </div>
                        <hr></hr>
                        <p align="justify">This app will <strong>Encrypt</strong> any file you choose with strong <strong>AES (American Encryption Standard) Encryption Algorithm</strong> into Make It Secret file (*.mis).</p>
                        <br></br>
                        <strong align="justify">Make sure to keep the key safe used for encryption. Without the key, the encrypted file cannot be decrypted!</strong>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={ this.handleClose }>
                            Okay
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Header
