const express = require('express')
const Mongo = require('./Mongo')
const CONSTANTS = require('./constants')
const collection = CONSTANTS.TRADING_SIGNALS_COLLECTION
var router = express.Router()

router.get('/api/tradeSignals/getData', (req, res, next) => {
	console.log('/api/tradeSignals/getData')
	Mongo.select({}, collection, data => {
		setTimeout(() => { res.send(data) }, 5000)
	})
})

router.post('/api/tradeSignals/postData', (req, res, next) => {
	console.log('/api/tradeSignals/postData')
	let data = req.body
	
	Mongo.select({}, collection, signals => {
		// нужно проверить не удалены ли какие-то поля
		// signals = signals
		console.log(signals)
		let nextData = []
		data.forEach(elem => {
			let pos = signals.find(findElem => elem.id === findElem.id)
			if(pos) nextData.push(elem)
		})

		Mongo.updateMany({}, nextData, collection, resData => {
			setTimeout(() => {
				res.send({
					status: 'ok',
					data: resData
				})
			}, 5000)
		})
	})


})
module.exports = router;