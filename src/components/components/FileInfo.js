import React, { Component } from 'react'

class FileInfo extends Component {
    getFileAttrValue(file, attr) {
        if (attr === "size") {
            return `${(file[attr]/10000).toFixed(2)} MB`
        } else {
            return file[attr]
        }
    }   

    render() {
        let file = this.props.file
        return Object.keys(file).map((attr) => (
            <React.Fragment key={ attr }>
                <tr>
                    <td>{ attr }</td>
                    <td>{ this.getFileAttrValue(file, attr) }</td>
                </tr>
            </React.Fragment>
        ))
    }
}

export default FileInfo
