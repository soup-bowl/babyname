export interface NameRecords {
	Name: string
	Gender: string
	Meaning: string
}

export interface NameStorage extends NameRecords {
	Accepted: boolean
}

export interface NameCompressed {
	Name: string
	Accepted: boolean
}

export interface NameComparisons {
	Name: string
	Gender: string
	UserAccepted: boolean
	OtherAccepted?: boolean
}
