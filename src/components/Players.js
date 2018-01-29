import React, { Component } from 'react'
import Player from './Player'
import axios from 'axios'

class Players extends Component {
	constructor(props) {
		super(props)

		this.state = {
			players: []
		}
	}

	compare = (a, b) => {
		const totalA = a.wins - a.losses
		const totalB = b.wins - b.losses
		return (totalA - totalB) * -1
	}

	componentDidMount() {
		axios.get(`https://foostestapi.herokuapp.com/players`)
		.then(response=>{
			const players = response.data
			this.setState({players:players.sort(this.compare)})
		})
	}

	render() {
		return(
			<div class="container">
				{this.state.players.map(player=>{
					return(
						<div class="list-group">
							<div class="list-group-item">
								<Player player={player} players={this.state.players} key={player.id}/>
							</div>
			            </div>
					)
				})}
			</div>
		)
	}
}

export default Players