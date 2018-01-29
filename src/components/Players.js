import React, { Component } from 'react'
import Player from './Player'

class Players extends Component {
	constructor(props) {
		super(props)

		const players = [{'name':'Nathan','wins':0,'losses':4},
						 {'name':'Nick','wins':3,'losses':4},
						 {'name':'Aaron','wins':2,'losses':0},
					     {'name':'Marcos','wins':7,'losses':8},
					     {'name':'Kurt','wins':3,'losses':0}]

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
			<div>
				{this.state.players.map(player=>{
					return(
						<div class="container">
						<div class="row">
						<div class="col-4">
						<div class="list-group">
						<div class="list-group-item">
							<Player player={player} players={this.state.players}/>
						</div>
			            </div>
			            </div>
			            </div>
			            </div>
					)
				})}
			</div>
		)
	}
}

export default Players