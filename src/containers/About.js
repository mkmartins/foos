import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectPlayer } from '../actions/index'
import PlayerInfo from './PlayerInfo'

class About extends Component {
    renderList() {
        return this.props.players.map((player) => {
            return (
                <li 
                    key={player.name} 
                    onClick={()=>this.props.selectPlayer(player)}
                    className="list-group-item">
                    {player.name}
                </li>
            )
        })
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-8">
                        <ul className="col-sm-4">
                            {this.renderList()}
                        </ul>
                    </div>
                    <div className="col-6 col-md-4">
                        <PlayerInfo />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        players: state.about
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectPlayer: selectPlayer}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(About)