export const toText = (file: File): Promise<string> => {
	const reader = new FileReader()

	return new Promise((resolve, reject) => {
		reader.addEventListener('error', () => reject(reader.error))
		reader.addEventListener('loadend', () => resolve(reader.result as string))

		reader.readAsText(file, 'utf-8')
	})
}

export const arr_random = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)]

export const slugify = (name: string): string => {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)+/g, '')
}

export const now = (): Date => new Date()

export const serialize = <T extends Record<string, unknown>>(obj: T): T => {
	return JSON.parse(JSON.stringify(obj))
}

export const classNames = (...classes: (string | undefined)[]): string => {
	return classes.filter(Boolean).join(' ')
}
