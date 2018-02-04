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
		let totalA = a.wins - a.losses
		let totalB = b.wins - b.losses
		if (totalA === totalB) {
			 totalA = a.wins + a.losses
			 totalB = b.wins + b.losses
		}
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
				<ul>
					<li>Last update on Feb 4th.</li>
					<li>Adds red percentage line for percentages below 50%.</li>
					<li>If 2 or more players have the same total win-loss ratio, player with more games will rate higher.</li>
				</ul>
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