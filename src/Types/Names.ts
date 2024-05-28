export interface NameRecords {
	Name: string
	Gender: string
	Meaning: string
}

export interface NameStorage extends NameRecords {
	id?: number
	UserAccepted: boolean
	OtherAccepted?: boolean
}

export interface NameCompressed {
	Name: string
	Accepted: boolean
}
