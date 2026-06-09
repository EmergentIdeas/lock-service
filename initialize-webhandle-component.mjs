import createInitializeWebhandleComponent from "@webhandle/initialize-webhandle-component/create-initialize-webhandle-component.mjs"
import ComponentManager from "@webhandle/initialize-webhandle-component/component-manager.mjs"
import path from "node:path"
import LockService from "./lock-service.mjs"

const initializeWebhandleComponent = createInitializeWebhandleComponent()

initializeWebhandleComponent.componentName = '@webhandle/lock-service-in-memory'
initializeWebhandleComponent.componentDir = import.meta.dirname
initializeWebhandleComponent.defaultConfig = {
}


initializeWebhandleComponent.setup = async function(webhandle, config) {
	let manager = new ComponentManager()
	manager.config = config
	
	manager.addExternalResources = (externalResourceManager, options) => {
	}
	
	let lockService = new LockService()
	
	manager.services.lock =  lockService
	if(!webhandle.services.lock) {
		webhandle.services.lock = lockService
	}

	return manager
}

export default initializeWebhandleComponent
