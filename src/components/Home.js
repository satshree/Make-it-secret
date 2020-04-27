import React, { 
    Component, 
} from 'react'
import File from './components/File'
import Crypto from './Crypto'
import lock from '../assets/lock.png'

class Home extends Component {
    getFileData() {
        return this.props.file
    }

    getFilePath() {
        return this.props.path
    }

    getDisplayComponent() {
        let file = this.getFileData()
        let path = this.getFilePath()
        if (file.name) {
            return (
                <Crypto file={ file } path={ path } encrypt={ this.props.encrypt } />
            )
        } else {
            return (
                <React.Fragment>
                    <br></br> <br></br>
                    <img src={ lock } width="40%"></img>
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
