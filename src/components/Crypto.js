import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

import FileInfo from './components/FileInfo'
import Encrypt from './components/Encrypt'
import Decrypt from './components/Decrypt'


class Crypto extends Component {
    uploadFile = (metadata) => {
        this.props.uploadFile(metadata)
    }

    getProceedBtn() {
        if (this.props.encrypt) {
            return (
                <Encrypt file={ this.props.file } path={ this.props.path } />
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
                        { this.getProceedBtn() }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Crypto