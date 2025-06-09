import { NameRecords, NameStorage } from "@/Types"
import { db } from "@/db"

export const AddChoice = async (name: NameRecords, decision: boolean): Promise<void> => {
	if (name !== undefined) {
		try {
			const id = await db.chosenNames.add({
				Name: name.Name,
				Gender: name.Gender,
				Meaning: name.Meaning,
				UserAccepted: decision,
			})

			return id
		} catch (error) {
			console.error(`Failed to add name:`, name, error)
		}
	}
}

export const getAlreadySeenNames = async () => {
	try {
		return await db.chosenNames.toArray()
	} catch (error) {
		console.error("Failed to fetch friends:", error)
		return []
	}
}

export const RemoveChoice = async (choice: NameStorage): Promise<void> => {
	if (choice.id !== undefined) {
		try {
			return await db.chosenNames.delete(choice.id)
		} catch (error) {
			console.error("Failed to delete", error)
		}
	}
}
