export interface IMember {
	name?: string | null
	departingFlight?: string | null
	arrivalFlight?: string | null
	identity?: string | null
	gender?: string | null
	birthday?: string | null
	age?: string | null
	contact?: string | null
	orderDate?: string | null
	remark?: string | null
	appended?: boolean
}

export interface IGroup {
	submitted: boolean
	hasProblem: boolean
	members: IMember[]
}
