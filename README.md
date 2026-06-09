# @webhandle/lock-service-in-memory

Simple service to acquire and release locks. This stores the locks in memory, so is only
good for one a single thread use. However, the pattern is expandable to centralized
services.

## Install

```bash
npm install @webhandle/lock-service-in-memory
```

## Initialize

If running Webhandle, you can run:


```js
import setupLockService from "@webhandle/lock-service-in-memory/initialize-webhandle-component.mjs"
let managerLockService = await setupLockService(webhandle)
```

This will set up

```js
webhandle.services.lock
managerLockService.services.lock
```

## Usage

```js
import LockService from "@webhandle/lock-service-in-memory"
let lockService = new LockService()
```
or

```js
let lockService = webhandle.services.lock
```

then

```js
let lock = await lockService.acquire('test123')
// Do some stuff
lock.release()
```

or

```js
lockService.acquire('test123', (err, lock) => {
	// Do some stuff
	lock.release()
})
```

The callback is a little faster, if more cumbersome, because in the case that nobody is already holding
the lock, the caller doesn't have to wait until the next tick to do something with the lock.