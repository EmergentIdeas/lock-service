

export default class LockService {
	constructor() {
		this.locks = {}
		this.waiters = {}

	}
	
	_createReadyObj(lockName) {
		let readyObj = {
			name: lockName,
			release: () => {
				this.locks[lockName] = false
				if(this.waiters[lockName] && this.waiters[lockName].length > 0) {
					let heldResolve = this.waiters[lockName].shift()
					this.locks[lockName] = true
					heldResolve(readyObj)
				}
			}
		}

		return readyObj
	}

	/**
	 * Acquires a lock. Sends the lock object via the callback if one is supplied or returns a promise
	 * that will resolve to a lock object. 
	 * @param {string} lockName The name of the lock to acquire
	 * @param {function} [callback] An optional callback. If specified, it will be called with the lock object 
	 * when the lock is acquired. A promise will NOT be created if a callback is supplied.
	 * @returns A lock object with two members. `name` which is the `lockName` and a function `release`.
	 */
	acquire (lockName, callback) {
		if(this.locks[lockName]) {
			if(!this.waiters[lockName]) {
				this.waiters[lockName] = []
			}
		}
		
		if(callback) {
			let wrap = (readyObj) => {
				callback(undefined, readyObj)
			}
			if(this.locks[lockName]) {
				this.waiters[lockName].push(wrap)
			}
			else {
				this.locks[lockName] = true
				wrap(this._createReadyObj(lockName))
			}
		}
		else {
			let p = new Promise((resolve, reject) => {
				if(this.locks[lockName]) {
					this.waiters[lockName].push(resolve)
				}
				else {
					this.locks[lockName] = true
					resolve(this._createReadyObj(lockName))
				}
			})	
			return p
		}
	}
}
