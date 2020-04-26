import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import $ from 'jquery'

class File extends Component {
    triggerUpload = () => {
        $("input[type=file]").trigger("click")
    }

    onUpload = () => {
        let file = $("input[type=file]")[0].files[0]
        if (file) {
            let metadata = {
                name:file.name,
                size:file.size,
                type:file.type,
            }
    
            let formData = new FormData();
            formData.append('file', file)

            let fileExtension = metadata.name.split(".")[1]

            let encrypt = null
            if (fileExtension === "mis") {
                encrypt = false
                metadata.type = "Make It Secret File"
            } else {
                encrypt = true
            }
    
            this.props.uploadFile({file:metadata, formData, encrypt})
        }
    }

    render() {
        return (
            <div className="container">
                <Card style={customCard}>
                    <Card.Body>
                       <div className="text-center">
                            <Button 
                            variant="info" 
                            size="lg"
                            type="button"
                            onClick={this.triggerUpload.bind()}
                            >Choose a file</Button>
                            <input type="file" name="file" id="uploadFile" 
                            style={{display:'none'}}
                            onChange={this.onUpload.bind()}
                            ></input>
                       </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const customCard = {
    backgroundColor:'#4f5564',
    marginTop:'40px'
}

export default File
