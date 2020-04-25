import React, { 
    Component, 
} from 'react'
import File from './components/File'
class Home extends Component {
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
                            <br></br>
                            <p>
                                Choose a file to Encrypt it.
                                <br></br> <br></br>
                                Choose a *.mis file (example; File.mis) to Decrypt it.
                            </p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Home
