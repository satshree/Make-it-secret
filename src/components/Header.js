import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
    render() {
        return (
            <div className="container">
                <br></br>
                <div className="header">
                        <div className="text-center">
                            <Link className="anchor" to="/" style={anchor}>
                                <h2>MAKE IT SECRET</h2>
                            </Link>
                            <em> Encrypt or Decrypt any files easily. </em>
                        </div>
                </div>
            </div>
        )
    }
}

const anchor = {
    textDecoration: 'none',
    color:"#ffff00"
}
export default Header
