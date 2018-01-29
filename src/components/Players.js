import React, { Component } from 'react'
import Player from './Player'

class Players extends Component {
	constructor(props) {
		super(props)

		const players = [{'name':'Nathan','wins':0,'losses':0},
						 {'name':'Nick','wins':0,'losses':0},
						 {'name':'Aaron','wins':0,'losses':0},
					     {'name':'Marcos','wins':0,'losses':0},
					     {'name':'Kurt','wins':0,'losses':0}]

		const compare = (a, b) => {
			const totalA = a.wins - a.losses
 		    const totalB = b.wins - b.losses
 		    return (totalA - totalB) * -1
		}

		this.state = {
			players: players.sort(compare)
		}
	}

	render() {
		return(
			<div class="container">
			<h4>
				{this.state.players[0].name} is the current leader. 
				{this.state.players[this.state.players.length - 1].name} is dead last.
			</h4>
				{this.state.players.map(player=>{
					return(
						<div class="list-group">
							<div class="list-group-item">
								<Player player={player} players={this.state.players}/>
							</div>
			            </div>
					)
				})}
			</div>
		)
	}
}

export default Players