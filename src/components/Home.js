import React, { 
    Component, 
    // useCallback 
} from 'react'

class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="card" style={customCard}>
                    <div className="card-body">
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

export default Home
