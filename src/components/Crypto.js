import React, { Component } from 'react'
import FileInfo from './components/FileInfo'
import Encrypt from './components/Encrypt'
// import Decrypt from './components/Decrypt'

class Crypto extends Component {
    uploadFile = (metadata) => {
        this.props.uploadFile(metadata)
    }

    render() {
        return (
            <React.Fragment>
                <div className="home-info">
                    <div className="text-center">
                        <strong>File "{ this.props.file.name }"</strong>
                        <br></br> <br></br>
                        <table className="table table-centered table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Attributes</th>
                                    <th>Values</th>
                                </tr>
                            </thead>
                            <tbody>
                                <FileInfo file={ this.props.file } />
                            </tbody>
                        </table>
                        <br></br> 
                        <Encrypt />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Crypto