import React, { Component } from 'react'
import { Line } from 'rc-progress'
import axios from 'axios'
import champ from '../champ-icon.png'
import loser from '../loser-icon.png'

class Player extends Component {
	constructor(props) {
		super(props)

		this.state = {
			percentage: 0,
			wins: this.props.player.wins,
			losses: this.props.player.losses,
			player: this.props.player,
			admin: false
		}
	}

	componentDidMount() {
		const percentage = Math.floor((this.state.wins/(this.state.wins + this.state.losses))*100)
		this.setState({percentage: percentage})

	}

	validateAdmin = () => {
		let person = prompt("Please enter your admin key")
		if(person === "aaronrocks") {
			this.setState({admin:true})
			alert("Now you can make the changes you want!")
		} else {
			alert("You ain't no admin!")
		}
	}

	addWin = () => {
		if (this.state.admin) {
			const player = {wins:this.state.wins + 1}
			axios.patch(`https://foostestapi.herokuapp.com/players/${this.props.player.id}`, {player})
			const wins = this.state.wins + 1
			const percentage = Math.floor((wins/(wins + this.state.losses))*100)
			this.setState({wins:wins, percentage: percentage})
			this.props.callbackFromParent(this.state.player, 'addWin')
		} else {
			this.validateAdmin()
		}

	}
	removeWin = () => {
		if (this.state.admin) {
			const player = {wins:this.state.wins - 1}
			axios.patch(`https://foostestapi.herokuapp.com/players/${this.props.player.id}`, {player})
			const wins = this.state.wins - 1
			const percentage = Math.floor((wins/(wins + this.state.losses))*100)
			this.setState({wins:wins, percentage: percentage})
			this.props.callbackFromParent(this.state.player, 'removeWin')
		} else {
			this.validateAdmin()
		}
	}

	addLoss = () => {
		if (this.state.admin) {
			const player = {losses:this.state.losses + 1}
			axios.patch(`https://foostestapi.herokuapp.com/players/${this.props.player.id}`, {player})
			const losses = this.state.losses + 1
			const percentage = Math.floor((this.state.wins/(this.state.wins + losses))*100)
			this.setState({losses:losses, percentage: percentage})
			this.props.callbackFromParent(this.state.player, 'addLoss')
		} else {
			this.validateAdmin()
		}
	}

	removeLoss = () => {
		if (this.state.admin) {
			const player = {losses:this.state.losses - 1}
			axios.patch(`https://foostestapi.herokuapp.com/players/${this.props.player.id}`, {player})
			const losses = this.state.losses - 1
			const percentage = Math.floor((this.state.wins/(this.state.wins + losses))*100)
			this.setState({losses:losses, percentage: percentage})
			this.props.callbackFromParent(this.state.player, 'removeLoss')
		} else {
			this.validateAdmin()
		}
	}

	render() {
		return(
				<ul>
					{ this.state.player.name === "Nick" &&
						<img src={champ} width="200" height="200" className="d-inline-block align-top" alt="" />
					}
					{ this.state.player.name === "Kurt" &&
						<img src={loser} width="200" height="200" className="d-inline-block align-top" alt="" />
					}
					<p>{this.state.player.name}</p>
					<p className="badge badge-secondary">total {this.state.wins - this.state.losses}</p>
					<p>{this.state.wins} total wins</p>
					<p>{this.state.losses} total losses</p>
					<p>{this.state.percentage}%
					{this.state.percentage > 49 &&
						<Line percent={this.state.percentage} strokeWidth="5" trailWidth="5" strokeColor="#2db7f5" />
					}
					{this.state.percentage  < 50 &&
						<Line percent={this.state.percentage} strokeWidth="5" trailWidth="5" strokeColor="red" />
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