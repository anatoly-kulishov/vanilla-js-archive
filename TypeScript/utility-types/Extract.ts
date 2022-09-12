/**
 * Extract<Type, Union>
 * Released: 2.8
 *
 * Constructs a type by extracting from Type all union members that are assignable to Union.
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

/*
 * If we want to find the shared keys between these interfaces, we can combine
 * keyof with Extract. keyof will give us a union string of all the keys, and
 * Extract will return the shared values.
 */

type SharedUserKeys = Extract<keyof UserBase, keyof UserProfile> // 'email' | 'image' | 'username'