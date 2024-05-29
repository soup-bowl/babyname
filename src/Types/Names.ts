export interface NameRecords {
	id?: string
	Name: string
	Gender: string
	Meaning: string
}

export interface NameStorage extends NameRecords {
	UserAccepted: boolean
	OtherAccepted?: boolean
}

export interface NameCompressed {
	id: string
	Accepted: boolean
}
