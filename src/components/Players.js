import React, { Component } from 'react'
import Player from './Player'
import ChoosePlayer from './ChoosePlayer'
import axios from 'axios'
import shuffle from 'shuffle-array'
import Countdown from 'react-countdown-now'
import ReactTooltip from 'react-tooltip'
import loading from '../loading.png'

class Players extends Component {
	constructor(props) {
		super(props)

		this.state = {
			players: [],
			PlayersToChooseFrom: [],
			displayTeams:"",
			loading: true
		}
	}

	componentDidMount() {
		const PlayersToChooseFrom = []
		axios.get(`https://foostestapi.herokuapp.com/players`)
		.then(response=>{
			const players = response.data
			response.data.map(player=>{
				PlayersToChooseFrom.push({name:player.name, selected:false, total:player.wins - player.losses})
			})
			players.sort(this.defaultSort)
			this.setState({players:players, PlayersToChooseFrom:PlayersToChooseFrom, loading:false})
		})
	}

	defaultSort = (a, b) => {
		let totalA = a.wins - a.losses
		let totalB = b.wins - b.losses
		if (totalA === totalB) {
			 totalA = a.wins + a.losses
			 totalB = b.wins + b.losses
		}
		return (totalA - totalB) * -1
	}

	aaronSort = (a,b) => {
		const percentageA = Math.floor((a.wins/(a.wins + a.losses))*100)
		const percentageB = Math.floor((b.wins/(b.wins + b.losses))*100)
		let totalA = (a.wins + a.losses)*percentageA
		let totalB = (b.wins + b.losses)*percentageB
		if (totalA === totalB) {
			 totalA = a.wins + a.losses
			 totalB = b.wins + b.losses
		}
		return (totalA - totalB) * -1
	}

	sortMethod = (type) => {
		const players = this.state.players
		players.sort(type)
		this.setState({players:players})
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
		return <p className="lead">{days} Days {hours} Hours {minutes} Minutes and {seconds} seconds until next season</p>
    };	  

	render() {
		const aaronMethod = "(total games * percentage value) * percentage"
		const defaultMethod = "Wins - Losses. In case of a tie, number of games matter."
		if(this.state.loading) {
			return(
				<div className="container">
					<img src={loading} width="400" height="200" className="d-inline-block align-top" alt="" />
				</div>
			)
		} else {
			return(
				<div className="container">
					<div className="row">
						<div className="col-12 col-sm-8">
							<div className="alert alert-primary" role="alert">
								<Countdown
									date={'Mar 2018 00:00:00'}
									renderer={this.renderer}
								/>
							</div>
							<button data-tip={defaultMethod} onClick={() => {this.sortMethod(this.defaultSort)}}>Default Method</button>
							<button data-tip={aaronMethod} onClick={() => {this.sortMethod(this.aaronSort)}}>Aaron's method</button>
							{this.state.players.map(player=>{
								return(
									<div className="list-group">
										<div className="jumbotron">
											<Player player={player} callbackFromParent={this.playerCallback} validateAdmin={this.validateAdmin} key={player.id}/>
										</div>
									</div>
								)
							})}
						</div>
						<div className="col-12 col-sm-4">
							<h1>Foos luck!</h1>
							<div>
								{this.state.PlayersToChooseFrom.map(player=>{
									return(
										<div className="PlayersToChooseFrom" className="list-group">
											<div className={"list-group-item "+ (player.selected ? "list-group-item-primary" : "list-group-item-light")} >
												<ChoosePlayer player={player} selectPlayer={this.selectPlayer}/>
											</div>
										</div>
									)
								})}
							</div>
							<div>
								<button className="btn btn-outline-primary" onClick={this.selectTeams}>Select Teams</button>
							</div>
							<div>
								{this.state.displayTeams.split("|").map(m=>{
									return(
										<ul className="list-group">
											<li className="list-group-item"><h1>{m}</h1></li>
										</ul>
									)
								})}
							</div>
						</div>
					</div>
					<ReactTooltip place="top" type="info" />
				</div>
			)
		}
	}
}

export default Players