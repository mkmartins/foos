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
			this.setState({players:players})
		})
	}

	playerCallback = (updatedPlayer,winOrLoss) => {		
		this.state.players.find(player=>{
			if (player.id === updatedPlayer.id) {
				if (winOrLoss === 'addWin') {
					player.wins++
				} else if (winOrLoss === 'removeWin') {
					player.wins--
				} else if (winOrLoss === 'addLoss') {
					player.losses++
				} else if (winOrLoss === 'removeLoss') {
					player.losses--
				}
			}
		})
		this.setState({players:this.state.players})
	}

	resetScore = () => {
		this.state.players.map(player=>{
			axios.patch(`https://foostestapi.herokuapp.com/players/${player.id}`, {wins:0, losses:0})
		})
		this.setState({players:this.state.players})
	}

	render() {
		return(
			<div class="container">
				{this.state.players.sort(this.compare).map(player=>{
					return(
						<div class="list-group">
							<div class="list-group-item">
								<Player player={player} callbackFromParent={this.playerCallback} key={player.id}/>
							</div>
			            </div>
					)
				})}
				<button onClick={this.resetScore}>Reset Score</button>
			</div>
		)
	}
}

export default Players