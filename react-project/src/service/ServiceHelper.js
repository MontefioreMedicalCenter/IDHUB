export const redirectTo = (
	{ props: { history } },
	routeUrl,
	extraProps,
	cache = true
) => {
	if (history) {
		const routeProp = { pathname: routeUrl }
		try {
			if (extraProps) {
				JSON.stringify(extraProps)
				routeProp['state'] = extraProps
			}
		} catch (e) {
			return
		}

		if (!cache) {
			history.replace(routeProp)
		} else {
			history.push(routeProp)
		}
	} else {
		throw new Error('Invalid router component!')
	}
}

export const saveToLocalStorage = config => {
	config = config || {}
	localStorage.setItem('config', JSON.stringify(config))
}

export function updateToLocalStorage(propOrConfig, value) {
	let config = localStorage.getItem('config')
	config = JSON.parse(config)
	if (config) localStorage.removeItem('config')
	if (arguments.length === 1 && typeof propOrConfig === 'object') {
		saveToLocalStorage(propOrConfig)
	} else if (arguments.length === 2 && typeof propOrConfig === 'string') {
		config = config || {}
		config[propOrConfig] = value
		saveToLocalStorage(config)
	}
}

export const fetchFromLocalStorage = prop => {
	let config = localStorage.getItem('config') || '{}'
	config = JSON.parse(config)
	return config[prop] || false
}
