
require('mocha')
var expect = require('chai').expect
var assert = require('chai').assert

let lockService = require('../lock-service')



describe("standard execution", function() {
	
	it('two functions, same values', function(done) {
		lockService.acquire('abc')
		.then(token => {
			setTimeout(() => {
				console.log('first')
				token.release()

			}, 1000)
		})
		
		lockService.acquire('abc')
		.then(token => {
			console.log('second')
			token.release()
			done()
		})
	})

	it('two functions, different values', function(done) {
		lockService.acquire('abc')
		.then(token => {
			setTimeout(() => {
				console.log('first')
				token.release()

				done()
			}, 1000)
		})
		
		lockService.acquire('abcd')
		.then(token => {
			console.log('second')
			token.release()
		})
	})

	it('two functions sequenced', function(done) {
		lockService.acquire('abc')
		.then(token => {
			console.log('first')
			token.release()

			lockService.acquire('abc')
			.then(token => {
				console.log('second')
				token.release()
				done()
			})
		})
		
	})
	it('many functions, same values', function(done) {
		lockService.acquire('abc')
		.then(token => {
			setTimeout(() => {
				console.log('first')
				token.release()

			}, 1000)
		})
		
		lockService.acquire('abc')
		.then(token => {
			console.log('second')
			token.release()
		})
		lockService.acquire('abc')
		.then(token => {
			console.log('third')
			token.release()
		})
		lockService.acquire('abc')
		.then(token => {
			console.log('4')
			token.release()
		})
		lockService.acquire('abc')
		.then(token => {
			console.log('5')
			token.release()
			done()
		})
	})
})
		
