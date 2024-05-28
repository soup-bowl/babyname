export interface NameRecords {
	Name: string
	Gender: "Male" | "Female" | "Universal"
	Meaning: string
}

export interface NameStorage extends NameRecords {
	UserAccepted: boolean
	OtherAccepted?: boolean
}

export interface NameCompressed {
	Name: string
	Accepted: boolean
}
