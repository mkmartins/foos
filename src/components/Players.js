import React, { Component } from 'react'
import Player from './Player'
import ChoosePlayer from './ChoosePlayer'
import axios from 'axios'
import shuffle from 'shuffle-array'
import Countdown from 'react-countdown-now';

class Players extends Component {
	constructor(props) {
		super(props)

		this.state = {
			players: [],
			PlayersToChooseFrom: [],
			displayTeams:"",
			admin:false
		}
	}

	validateAdmin = () => {
		let isAdmin = prompt("Please enter your admin key")
		if(isAdmin === "aaronrocks") {
			this.setState({admin:true})
			alert("Now you can make the changes you want!")
		} else {
			alert("You ain't no admin!")
		}
	}

	resetScore = () => {
		if (this.state.admin) {
			this.state.players.map(player=>{
				axios.patch(`https://foostestapi.herokuapp.com/players/${player.id}`, {wins:0, losses:0})
			})
			this.setState({players:this.state.players})
		} else {
			this.validateAdmin()
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
		const PlayersToChooseFrom = []
		axios.get(`https://foostestapi.herokuapp.com/players`)
		.then(response=>{
			const players = response.data
			response.data.map(player=>{
				PlayersToChooseFrom.push({name:player.name, selected:false, total:player.wins - player.losses})
			})
			this.setState({players:players, PlayersToChooseFrom:PlayersToChooseFrom})
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

	selectPlayer = (selectedPlayer) => {
		this.state.PlayersToChooseFrom.find(player=>{
			if (player.name === selectedPlayer.name) {
				if (!player.selected) {
					player.selected = true
				} else {
					player.selected = false
				}
			}
		})
		this.setState({PlayersToChooseFrom:this.state.PlayersToChooseFrom})
	}

	selectTeams = () => {
		const playersPlaying = []
		let teamA = []
		let teamANames = []
		let teamB = []
		let teamBNames = []
		let teamATotal = 0
		let teamBTotal = 0
		let message = ""

		this.state.PlayersToChooseFrom.map(player=>{
			if(player.selected) {
				playersPlaying.push(player)
			}
		})
		shuffle(playersPlaying)
		teamA = playersPlaying.slice(0,2)
		teamB = playersPlaying.slice(2,4)
		teamA.map(player=>{
			teamATotal += player.total
			teamANames.push(player.name)
		})
		teamB.map(player=>{
			teamBTotal += player.total
			teamBNames.push(player.name)
		})

		if(teamATotal > teamBTotal) {
			message = "Team B is the Underdog"
		} else {
			message = "Team A is the Underdog"
		}
		if (playersPlaying.length > 3) {
			this.teams(teamANames,teamBNames,message)
		} else {
			this.setState({displayTeams:"You must select at least 4 players."})
		}
	}

	teams = (a,b,message) => {
			let displayTeams = ""
			if (a && b) {
				const teamA = "Team A: " + a.join(" and ")
				const teamB = "Team B: " + b.join(" and ")
				displayTeams = teamA + "|" + teamB + "|" + message
				this.setState({displayTeams:displayTeams})
			}
	}

	renderer = ({ days, hours, minutes, seconds, completed }) => {
		return <p class="lead">{days} Days {hours} Hours {minutes} Minutes and {seconds} seconds until next season</p>
    };	  

	render() {
		return(
			<div class="container">
				<div class="row">
					<div class="col-12 col-sm-8">
						<div class="alert alert-primary" role="alert">
							<Countdown
								date={'Mar 2018 00:00:00'}
								renderer={this.renderer}
							/>
						</div>
						{this.state.players.sort(this.compare).map(player=>{
							return(
								<div class="list-group">
									<div class="jumbotron">
										<Player player={player} callbackFromParent={this.playerCallback} validateAdmin={this.validateAdmin} key={player.id}/>
									</div>
								</div>
							)
						})}
						<button onClick={this.resetScore}>Reset Score</button>
					</div>
					<div class="col-12 col-sm-4">
						<h1>Foos luck!</h1>
						<div>
							{this.state.PlayersToChooseFrom.map(player=>{
								return(
									<div className="PlayersToChooseFrom" class="list-group">
										<div class={"list-group-item "+ (player.selected ? "list-group-item-primary" : "list-group-item-light")} >
											<ChoosePlayer player={player} selectPlayer={this.selectPlayer}/>
										</div>
									</div>
								)
							})}
						</div>
						<div>
							<button class="btn btn-outline-primary" onClick={this.selectTeams}>Select Teams</button>
						</div>
						<div>
							{this.state.displayTeams.split("|").map(m=>{
								return(
									<ul class="list-group">
										<li class="list-group-item"><h1>{m}</h1></li>
									</ul>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Players