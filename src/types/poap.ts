export type PoapDetails = {
	id: number
	fancy_id: string
	name: string
	event_url: string
	image_url: string
	country: string
	city: string
	description: string
	year: number
	start_date: string
	end_date: string
	expiry_date: string
	from_admin: boolean
	virtual_event: boolean
	event_template_id: number
	event_host_id: number
	private_event: boolean
}

export type PoapError = {
	error: string
	message: string
	statusCode: number
}

export type PoapResponse = PoapDetails | PoapError

export const hasError = (response: PoapResponse): response is PoapError => {
	return 'error' in response
}
