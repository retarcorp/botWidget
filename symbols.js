const express = require('express')
const Mongo = require('./Mongo')
const CONSTANTS = require('./constants')
const collection = CONSTANTS.TRADING_SIGNALS_COLLECTION
var router = express.Router()

router.get('/api/tradeSignals/getData', (req, res, next) => {
	// console.log('/api/tradeSignals/getData')
	Mongo.select({}, collection, data => {
		setTimeout(() => { console.log(data); res.send(data) }, 2000)
	})
})

router.post('/api/tradeSignals/postData', (req, res, next) => {
	console.log('/api/tradeSignals/postData')
	let data = req.body
	// console.log(data)
	Mongo.select({}, collection, signals => {
		// нужно проверить не удалены ли какие-то поля
		// signals = signals
		let nextData = []
		data.forEach(elem => {
			let pos = signals.find(findElem => elem.id === findElem.id)
			if(pos) nextData.push(elem)
		})
		// console.log(nextData)
		Mongo.updateMany({}, nextData, collection, resData => {
			setTimeout(() => {
				res.send({
					status: 'ok',
					data: resData
				})
			}, 2000)
		})
	})


})
module.exports = router;