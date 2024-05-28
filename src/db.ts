import Dexie, { Table } from "dexie"
import { NameStorage } from "@/Types"

export class BabyNameDB extends Dexie {
	chosenNames!: Table<NameStorage>

	constructor() {
		super("BabyNames")
		this.version(1).stores({
			chosenNames: "++id, Name, Gender, Meaning, UserAccepted, OtherAccepted",
		})
	}
}

export const db = new BabyNameDB()
