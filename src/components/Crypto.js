import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

import FileInfo from './components/FileInfo'
import Encrypt from './components/Encrypt'
import Decrypt from './components/Decrypt'
import ForceDecrypt from './components/ForceDecrypt'


class Crypto extends Component {
    uploadFile = (metadata) => {
        this.props.uploadFile(metadata)
    }

    getProceedBtn() {
        if (this.props.encrypt) {
            return (
                <div className="btn-box">
                    <Encrypt file={ this.props.file } path={ this.props.path } />
                    <ForceDecrypt file={ this.props.file } path={ this.props.path } />
                </div>
            )
        } else {
            return (
                <Decrypt file={ this.props.file } path={ this.props.path } />
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="home-info">
                    <div className="text-center">
                        <strong>File "{ this.props.file.name }"</strong>
                        <br></br> <br></br>
                        <Table variant="dark" centered="true" striped hover responsive>
                            <thead>
                                <tr>
                                    <th>Attributes</th>
                                    <th>Values</th>
                                </tr>
                            </thead>
                            <tbody>
                                <FileInfo file={ this.props.file } />
                            </tbody>
                        </Table>
                        <br></br> 
                        <div className="text-center">
                            { this.getProceedBtn() }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Crypto