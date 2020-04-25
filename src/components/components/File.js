import React, { Component } from 'react'
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
    
            this.props.uploadFile({file:metadata, formData})
        }
    }

    render() {
        return (
            <div className="container">
                <div className="card" style={customCard}>
                    <div className="card-body">
                       <div className="text-center">
                            <button 
                            className="btn btn-info btn-lg" 
                            type="button"
                            onClick={this.triggerUpload.bind()}
                            >Choose a file</button>
                            <input type="file" name="file" id="uploadFile" 
                            style={{display:'none'}}
                            onChange={this.onUpload.bind()}
                            ></input>
                       </div>
                    </div>
                </div>
            </div>
        )
    }
}

const customCard = {
    backgroundColor:'#4f5564',
    marginTop:'40px'
}

export default File
