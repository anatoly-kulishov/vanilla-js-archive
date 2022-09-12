/**
 * Exclude<UnionType, ExcludedMembers>
 * Released: 2.8
 *
 * Constructs a type by excluding from UnionType all union members that are assignable to ExcludedMembers.
 */

interface UserBase {
	email: string
	image: string | null
	username: string
}

interface UserProfile {
	id: string
	email: string
	image: string | null
	isAdmin: boolean
	username: string
	reviews: string[]
}

type ProfileSpecificKeys = Exclude<keyof UserProfile, keyof UserBase> // 'id' | 'isAdmin' | 'reviews'

type ExcludedTypes<T, U> = {
	[K in Exclude<keyof T, keyof U>]: T[K]
}

const user: ExcludedTypes<UserProfile, UserBase> = {
	id: '1234',
	isAdmin: false,
	reviews: [],
}