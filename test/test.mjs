
import test from 'node:test'
import assert from 'node:assert'

import LockService from '../lock-service.mjs'
let lockService = new LockService()



await test("standard execution", async function (t) {

	await t.test('two functions, same values', async function (t) {
		let p = new Promise((resolve, reject) => {
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
					resolve()
				})

		})
		return p
	})

	await t.test('two functions, same values, callback', async function (t) {
		let p = new Promise((resolve, reject) => {
			lockService.acquire('abc', (err, token) => {
				setTimeout(() => {
					console.log('first')
					token.release()

				}, 1000)
			})

			lockService.acquire('abc', (err, token) => {
				console.log('second')
				token.release()
				resolve()

			})
		})
		return p
	})

	await t.test('two functions, different values', function (t) {
		let p = new Promise((resolve, reject) => {
			lockService.acquire('abc')
				.then(token => {
					setTimeout(() => {
						console.log('first')
						token.release()

						resolve()
					}, 1000)
				})

			lockService.acquire('abcd')
				.then(token => {
					console.log('second')
					token.release()
				})
		})
		return p
	})

	await t.test('two functions, different values, callback', function (t) {
		let p = new Promise((resolve, reject) => {
			lockService.acquire('abc', (err, token) => {
				setTimeout(() => {
					console.log('first')
					token.release()

					resolve()
				}, 1000)
			})

			lockService.acquire('abcd', (err, token) => {
				console.log('second')
				token.release()
			})
		})
		return p
	})

	await t.test('two functions sequenced', function (t) {
		let p = new Promise((resolve, reject) => {
			lockService.acquire('abc')
				.then(token => {
					console.log('first')
					token.release()

					lockService.acquire('abc')
						.then(token => {
							console.log('second')
							token.release()
							resolve()
						})
				})
		})
		return p
	})

	await t.test('two functions sequenced, callback', function (t) {
		let p = new Promise((resolve, reject) => {
			lockService.acquire('abc', (err, token) => {
				console.log('first')
				token.release()

				lockService.acquire('abc', (err, token) => {
					console.log('second')
					token.release()
					resolve()

				})
			})
		})
		return p
	})

	await t.test('many functions, same values', function (t) {
		let p = new Promise((resolve, reject) => {
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
					resolve()
				})
		})
		return p
	})

	await t.test('many functions, same values, callback', function (t) {
		let p = new Promise((resolve, reject) => {
			lockService.acquire('abc', (err, token) => {
				setTimeout(() => {
					console.log('first')
					token.release()

				}, 1000)

			})

			lockService.acquire('abc', (err, token) => {
				console.log('second')
				token.release()
			})

			lockService.acquire('abc', (err, token) => {
				console.log('third')
				token.release()

			})
			lockService.acquire('abc', (err, token) => {
				console.log('4')
				token.release()

			})
			lockService.acquire('abc', (err, token) => {
				console.log('5')
				token.release()
				resolve()
			})
		})
		return p
	})
})
