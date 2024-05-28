export interface NameRecords {
	Name: string
	Gender: string
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
