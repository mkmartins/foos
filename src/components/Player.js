import React, { Component } from 'react'
import axios from 'axios'
import champ from '../champ-icon.png'
import loser from '../loser-icon.png'
import second from '../second.png'
import goodTry from '../good-try.png'
import { connect } from 'react-redux'
import '../App.css';

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
	
	addWin = () => {
			const player = {wins:this.state.wins + 1}
			axios.patch(`https://foos.node-3.net/api/players/${this.props.player.id}`, {player})
			const wins = this.state.wins + 1
			const percentage = Math.floor((wins/(wins + this.state.losses))*100)
			this.setState({wins:wins, percentage: percentage})
			this.props.callbackFromParent(this.state.player, 'addWin')

	}
	removeWin = () => {
			const player = {wins:this.state.wins - 1}
			axios.patch(`https://foos.node-3.net/api/players/${this.props.player.id}`, {player})
			const wins = this.state.wins - 1
			const percentage = Math.floor((wins/(wins + this.state.losses))*100)
			this.setState({wins:wins, percentage: percentage})
			this.props.callbackFromParent(this.state.player, 'removeWin')
	}

	addLoss = () => {
			const player = {losses:this.state.losses + 1}
			axios.patch(`https://foos.node-3.net/api/players/${this.props.player.id}`, {player})
			const losses = this.state.losses + 1
			const percentage = Math.floor((this.state.wins/(this.state.wins + losses))*100)
			this.setState({losses:losses, percentage: percentage})
			this.props.callbackFromParent(this.state.player, 'addLoss')
	}

	removeLoss = () => {
			const player = {losses:this.state.losses - 1}
			axios.patch(`https://foos.node-3.net/api/players/${this.props.player.id}`, {player})
			const losses = this.state.losses - 1
			const percentage = Math.floor((this.state.wins/(this.state.wins + losses))*100)
			this.setState({losses:losses, percentage: percentage})
			this.props.callbackFromParent(this.state.player, 'removeLoss')
	}

	render() {
		return(
				<ul className="playerCard"> 
					{ this.state.player.name === "Nick" &&
						<img src={champ} width="200" height="200" className="d-inline-block align-top" alt="" />
					}
					{ this.state.player.name === "Kurt" &&
						<img src={loser} width="200" height="200" className="d-inline-block align-top" alt="" />
					}
					{ this.state.player.name === "Aaron" &&
						<img src={second} width="400" height="200" className="d-inline-block align-top" alt="" />
					}
					{ this.state.player.name === "Nate" &&
						<img src={goodTry} width="300" height="300" className="d-inline-block align-top" alt="" />
					}
					<h3>{this.state.player.name}</h3>
					<p className="badge badge-secondary">total {this.state.wins - this.state.losses}</p>
					<p>{this.state.wins} total wins</p>
					<p>{this.state.losses} total losses</p>
					<div>{this.state.percentage}%
					{this.state.percentage > 49 &&
						<div className="progress">
							<div className="progress-bar progress-bar-striped" role="progressbar" style={{width:`${this.state.percentage}%`}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
					}
					{this.state.percentage  < 50 &&
					<div className="progress">
						<div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{width:`${this.state.percentage}%`}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
					</div>
					}
					</div>
					{ this.props.admin === 'niceD' && 
						<div>
							<div>
								<button onClick={this.addWin}>Add Win</button>
								<button onClick={this.removeWin}>Remove a Win</button>
							</div>
							<div>
								<button onClick={this.addLoss}>Add Loss</button>
								<button onClick={this.removeLoss}>Remove a Loss</button>
							</div>
						</div>
					}
				</ul>
		)
	}
}

const mapStateToProps = state => {
	return {
		admin : state.player.admin
	}
}

export default connect(mapStateToProps)(Player)