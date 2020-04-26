import React, { 
    Component, 
} from 'react'
import File from './components/File'
import Crypto from './Crypto'

class Home extends Component {
    getFileData() {
        return this.props.file
    }

    getDisplayComponent() {
        let file = this.getFileData()
        if (file.name) {
            return (
                <Crypto file={ file } encrypt={ this.props.encrypt } />
            )
        } else {
            return (
                <React.Fragment>
                    <br></br>
                    <p>
                        Choose a file to Encrypt it.
                        <br></br> <br></br>
                        Choose a *.mis file (example; File.mis) to Decrypt it.
                    </p>
                </React.Fragment>
            )
        }
    }

    uploadFile = (metadata) => {
        this.props.uploadFile(metadata)
    }

    render() {
        return (
            <React.Fragment>
                <File uploadFile={ this.uploadFile }/>
                <div className="container">
                    <div className="home-info">
                        <div className="text-center">
                            { this.getDisplayComponent() }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Home
