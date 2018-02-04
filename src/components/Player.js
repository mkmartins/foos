import React, { Component } from 'react'
import { Line } from 'rc-progress'
import axios from 'axios'

class Player extends Component {
	constructor(props) {
		super(props)

		this.state = {
			percantage: 0,
			wins: this.props.player.wins,
			losses: this.props.player.losses,
			player:this.props.player
		}
	}

	componentDidMount() {
		const percantage = Math.floor((this.state.wins/(this.state.wins + this.state.losses))*100)
		this.setState({percantage: percantage})

	}

	addWin = () => {
		const player = {wins:this.state.wins + 1}
		axios.patch(`https://foostestapi.herokuapp.com/players/${this.props.player.id}`, {player})
		const wins = this.state.wins + 1
		const percantage = Math.floor((wins/(wins + this.state.losses))*100)
		this.setState({wins:wins, percantage: percantage})
		this.props.callbackFromParent(this.state.player, 'addWin')
	}
	removeWin = () => {
		const player = {wins:this.state.wins - 1}
		axios.patch(`https://foostestapi.herokuapp.com/players/${this.props.player.id}`, {player})
		const wins = this.state.wins - 1
		const percantage = Math.floor((wins/(wins + this.state.losses))*100)
		this.setState({wins:wins, percantage: percantage})
		this.props.callbackFromParent(this.state.player, 'removeWin')
	}

	addLoss = () => {
		const player = {losses:this.state.losses + 1}
		axios.patch(`https://foostestapi.herokuapp.com/players/${this.props.player.id}`, {player})
		const losses = this.state.losses + 1
		const percantage = Math.floor((this.state.wins/(this.state.wins + losses))*100)
		this.setState({losses:losses, percantage: percantage})
		this.props.callbackFromParent(this.state.player, 'addLoss')
	}

	removeLoss = () => {
		const player = {losses:this.state.losses - 1}
		axios.patch(`https://foostestapi.herokuapp.com/players/${this.props.player.id}`, {player})
		const losses = this.state.losses - 1
		const percantage = Math.floor((this.state.wins/(this.state.wins + losses))*100)
		this.setState({losses:losses, percantage: percantage})
		this.props.callbackFromParent(this.state.player, 'removeLoss')
	}

	render() {
		return(
				<ul>
					<p>{this.state.player.name}</p>
					<p class="badge badge-secondary">total {this.state.wins - this.state.losses}</p>
					<p>{this.state.wins} total wins</p>
					<p>{this.state.losses} total losses</p>
					<p>{this.state.percantage}%
					{this.state.percantage > 49 &&
						<Line percent={this.state.percantage} strokeWidth="5" trailWidth="5" strokeColor="#2db7f5" />
					}
					{this.state.percantage  < 50 &&
						<Line percent={this.state.percantage} strokeWidth="5" trailWidth="5" strokeColor="red" />
					}
					</p>
					<div>
						<button onClick={this.addWin}>Add Win</button>
						<button onClick={this.removeWin}>Remove a Win</button>
					</div>
					<div>
						<button onClick={this.addLoss}>Add Loss</button>
						<button onClick={this.removeLoss}>Remove a Loss</button>
					</div>
				</ul>
		)
	}
}

export default Player