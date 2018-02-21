import React from 'react'
import { connect } from 'react-redux'

class PlayerInfo extends React.Component {
    render() {
        if(!this.props.player) {
            return <div>Select a Player to learn about him!</div>
        }
        return(
            <div>
                <h1>{this.props.player.name}</h1>
                <p>{this.props.player.description}</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        player: state.player
    }
}

export default connect(mapStateToProps)(PlayerInfo)
