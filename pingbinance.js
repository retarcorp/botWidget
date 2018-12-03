const Binance = require('binance-api-node').default;
const Mongo = require('./Mongo');
Mongo.init().then(() => {
	Mongo.insert({start: 'start'}, 'PingTest');
	const client = Binance({
		apiKey: 'pMK15sHEO3jS9RE9x4KA5zFfdxCKcxk9gDgyf4BhvGrhvEUn3wiZMTYcuqLEAkNh',
		apiSecret: 'A7pvWxoe0JzHfM1rvF7D2ymM3ZFUvdlOyLRmjeZ7m4gfCWaTOmLBwHcwMUSw3Znp'
	});
	
	setInterval(() => {
		client.ping()
			.then(res => {
				if(typeof res !== 'boolean') {
					let data = {
						Type: 'Ping',
						Ping: res,
						Date: new Date()
					};
					Mongo.insert(data, 'PingTest');
				}
			})
			.catch(err => {
				let data = {
					Type: 'Ping',
					Err: err,
					Date: new Date()
				};
				Mongo.insert(data, 'PingTest');
			});
	
		client.getOrder({
			symbol: 'TRXUSDT',
			orderId: 20843390,
			useServerTime: true
		})
		.then(res => {
	
		})
		.catch(err => {
			let data = {
				Type: 'Orders',
				Err: err,
				Date: new Date()
			};
			Mongo.insert(data, 'PingTest');
		});
	}, 10000)
});


