import { ReactNode } from "react";

export interface AuthProviderProps {
	children: ReactNode
}

export interface UserProps {
	uid: string,
	name: string,
	avatarUrl: string,
	bannerUrl: string,
	role: string,
	email: string,
	aboutMe: string,
	location: string,
	linkedin: string,
	github: string,
	isVerified: boolean,
}

export interface SignUpProps {
	name: string,
	email: string, 
	password: string
}

export interface AuthContextData {
	signed: boolean,
	user: UserProps | null,
	loading: boolean,
	signUp: ({name, email, password}: SignUpProps) => Promise<void>,
	signOut: () => Promise<void>,
	signIn: (email: string, password: string) => Promise<void>,
	loadingAuth: boolean,
	storageUser: (data: UserProps) => void,
	users: UserProps[] | [],
}