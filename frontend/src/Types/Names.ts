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
