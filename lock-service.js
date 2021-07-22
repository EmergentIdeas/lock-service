let locks = {}
let waiters = {}


let lockService = {

	acquire: (lockName) => {
		let p = new Promise((resolve, reject) => {
			if(locks[lockName]) {
				if(!waiters[lockName]) {
					waiters[lockName] = []
				}
				waiters[lockName].push(resolve)
			}
			else {
				locks[lockName] = true
				let readyObj = {
					name: lockName,
					release: () => {
						locks[lockName] = false
						if(waiters[lockName] && waiters[lockName].length > 0) {
							let heldResolve = waiters[lockName].shift()
							locks[lockName] = true
							heldResolve(readyObj)
						}
					}
				}
				resolve(readyObj)
			}
		})	
		return p
	}
}

module.exports = lockService