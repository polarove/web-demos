import type { IMember } from './member'

export interface ISheet {
	date?: string
	members: IMember[][]
}
