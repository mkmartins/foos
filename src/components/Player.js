import React, { Component } from 'react'
import { Line } from 'rc-progress';

class Player extends Component {
	constructor(props) {
		super(props)

		this.state = {
			percantage: 0,
			wins: this.props.player.wins,
			losses: this.props.player.losses,
			players: this.props.players
		}
	}

	componentDidMount() {
		const percantage = Math.floor((this.state.wins/(this.state.wins + this.state.losses))*100)
		this.setState({percantage: percantage})

	}

	addWin = () => {
		const wins = this.state.wins + 1
		const percantage = Math.floor((wins/(wins + this.state.losses))*100)
		this.setState({wins:wins, percantage: percantage})
	}

	addLoss = () => {
		const losses = this.state.losses + 1
		const percantage = Math.floor((this.state.wins/(this.state.wins + losses))*100)
		this.setState({losses:losses, percantage: percantage})
	}

	render() {
		return(
				<ul>
					<p>{this.props.player.name}</p>
					<p>{this.state.wins} total wins</p>
					<p>{this.state.losses} total losses</p>
					<p>{this.state.percantage}%
						<Line percent={this.state.percantage} strokeWidth="5" trailWidth="5" strokeColor="#2db7f5" />
					</p>
					<button onClick={this.addWin}>Add Win</button>
					<button onClick={this.addLoss}>Add Loss</button>
				</ul>
		)
	}
}

export default Player