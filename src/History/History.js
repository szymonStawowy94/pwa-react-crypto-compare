import React, {Component} from 'react';
import './History.css';
import axios from 'axios';
import moment from 'moment';

class History extends Component {
	constructor() {
		super();
		this.state = {
			todayPrice: {},
			yesterdayPrice: {},
			twoDaysPrice: {},
			threeDaysPrice: {},
			fourDaysPrice: {}
		}
		this.getBTCPrices = this.getBTCPrices.bind(this);
		this.getETHPrices = this.getETHPrices.bind(this);
		this.getLTCPrices = this.getLTCPrices.bind(this);
	}
	getBTCPrices(date) {
		return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=' + date)
	}
	getETHPrices(date) {
		return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=' + date)
	}
	getLTCPrices(date) {
		return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=' + date)
	}
	getTodayPrice () {
		// Get today's date in timestamp
		let t = moment().unix()
		// axios.all is used to make concurrent API requests. These requests were the functions we first created and they accept an argument of the date required.
		axios.all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
			.then(axios.spread((eth, btc, ltc) => {
				let f = {
					date: moment.unix(t).format("MMMM Do YYYY"),
					eth: eth?.data?.ETH?.USD || '',
					btc: btc?.data?.BTC?.USD || '',
					ltc: ltc?.data?.LTC?.USD || ''
				}
				// Set the state of todayPrice to the content of the object f
				localStorage.setItem('todayPrice', JSON.stringify(f));
				this.setState({ todayPrice: f });
			}));
	}
	getYesterdayPrice () {
		// Get yesterday's date in timestamp
		let t = moment().subtract(1, 'days').unix();
		// axios.all is used to make concurrent API requests. These requests were the functions we first created and they accept an argument of the date required.
		axios.all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
			.then(axios.spread((eth, btc, ltc) => {
				let f = {
					date: moment.unix(t).format("MMMM Do YYYY"),
					eth: eth?.data?.ETH?.USD || '',
					btc: btc?.data?.BTC?.USD || '',
					ltc: ltc?.data?.LTC?.USD || ''
				}
				// Set the state of yesterdayPrice to the content of the object f
				localStorage.setItem('yesterdayPrice', JSON.stringify(f));
				this.setState({ yesterdayPrice: f });
			}));
	}
	getTwoDaysPrice () {
		// Get the date for two days ago in timestamp
		let t = moment().subtract(2, 'days').unix();
		// axios.all is used to make concurrent API requests. These requests were the functions we first created and they accept an argument of the date required.
		axios.all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
			.then(axios.spread((eth, btc, ltc) => {
				let f = {
					date: moment.unix(t).format("MMMM Do YYYY"),
					eth: eth?.data?.ETH?.USD || '',
					btc: btc?.data?.BTC?.USD || '',
					ltc: ltc?.data?.LTC?.USD || ''
				}
				// Set the state of twoDaysPrice to the content of the object f
				localStorage.setItem('twoDaysPrice', JSON.stringify(f));
				this.setState({ twoDaysPrice: f });
			}));
	}
	getThreeDaysPrice () {
		// Get the date for three days ago in timestamp
		let t = moment().subtract(3, 'days').unix();
		// axios.all is used to make concurrent API requests. These requests were the functions we first created and they accept an argument of the date required.
		axios.all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
			.then(axios.spread((eth, btc, ltc) => {
				let f = {
					date: moment.unix(t).format("MMMM Do YYYY"),
					eth: eth?.data?.ETH?.USD || '',
					btc: btc?.data?.BTC?.USD || '',
					ltc: ltc?.data?.LTC?.USD || ''
				}
				// Set the state of threeDaysPrice to the content of the object f
				localStorage.setItem('threeDaysPrice', JSON.stringify(f));
				this.setState({ threeDaysPrice: f });
			}));
	}
	getFourDaysPrice () {
		// Get the date for four days ago in timestamp
		let t = moment().subtract(4, 'days').unix();
		// axios.all is used to make concurrent API requests. These requests were the functions we first created and they accept an argument of the date required.
		axios.all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
			.then(axios.spread((eth, btc, ltc) => {
				let f = {
					date: moment.unix(t).format("MMMM Do YYYY"),
					eth: eth?.data?.ETH?.USD || '',
					btc: btc?.data?.BTC?.USD || '',
					ltc: ltc?.data?.LTC?.USD || ''
				}
				console.log(eth)
				// Set the state of fourDaysPrice to the content of the object f
				localStorage.setItem('fourDaysPrice', JSON.stringify(f));
				this.setState({ fourDaysPrice: f });
			}));
	}
	componentDidMount () {
		if (!navigator.onLine) {
			this.setState({ todayPrice: JSON.parse(localStorage.getItem('todayPrice')) });
			this.setState({ yesterdayPrice: JSON.parse(localStorage.getItem('yesterdayPrice')) });
			this.setState({ twoDaysPrice: JSON.parse(localStorage.getItem('twoDaysPrice')) });
			this.setState({ threeDaysPrice: JSON.parse(localStorage.getItem('threeDaysPrice')) });
			this.setState({ fourDaysPrice: JSON.parse(localStorage.getItem('fourDaysPrice')) });
		}
	}
	componentWillMount () {
		this.getTodayPrice();
		this.getYesterdayPrice();
		this.getTwoDaysPrice();
		this.getThreeDaysPrice();
		this.getFourDaysPrice();
	}
	render() {
		return (
			<div className="history--section container">
				<h2>History (Past 5 days)</h2>
				<div className="history--section__box">
					<div className="history--section__box__inner">
						<h4>{this.state.todayPrice.date}</h4>
						<div className="columns">
							<div className="column">
								<p>1 BTC = ${this.state.todayPrice.btc}</p>
							</div>
							<div className="column">
								<p>1 ETH = ${this.state.todayPrice.eth}</p>
							</div>
							<div className="column">
								<p>1 LTC = ${this.state.todayPrice.ltc}</p>
							</div>
						</div>
					</div>
					<div className="history--section__box__inner">
						<h4>{this.state.yesterdayPrice.date}</h4>
						<div className="columns">
							<div className="column">
								<p>1 BTC = ${this.state.yesterdayPrice.btc}</p>
							</div>
							<div className="column">
								<p>1 ETH = ${this.state.yesterdayPrice.eth}</p>
							</div>
							<div className="column">
								<p>1 LTC = ${this.state.yesterdayPrice.ltc}</p>
							</div>
						</div>
					</div>
					<div className="history--section__box__inner">
						<h4>{this.state.twoDaysPrice.date}</h4>
						<div className="columns">
							<div className="column">
								<p>1 BTC = ${this.state.twoDaysPrice.btc}</p>
							</div>
							<div className="column">
								<p>1 ETH = ${this.state.twoDaysPrice.eth}</p>
							</div>
							<div className="column">
								<p>1 LTC = ${this.state.twoDaysPrice.ltc}</p>
							</div>
						</div>
					</div>
					<div className="history--section__box__inner">
						<h4>{this.state.threeDaysPrice.date}</h4>
						<div className="columns">
							<div className="column">
								<p>1 BTC = ${this.state.threeDaysPrice.btc}</p>
							</div>
							<div className="column">
								<p>1 ETH = ${this.state.threeDaysPrice.eth}</p>
							</div>
							<div className="column">
								<p>1 LTC = ${this.state.threeDaysPrice.ltc}</p>
							</div>
						</div>
					</div>
					<div className="history--section__box__inner">
						<h4>{this.state.fourDaysPrice.date}</h4>
						<div className="columns">
							<div className="column">
								<p>1 BTC = ${this.state.fourDaysPrice.btc}</p>
							</div>
							<div className="column">
								<p>1 ETH = ${this.state.fourDaysPrice.eth}</p>
							</div>
							<div className="column">
								<p>1 LTC = ${this.state.fourDaysPrice.ltc}</p>
							</div>
						</div>
					</div>

				</div>
			</div>
		)
	}
}

export default History;

