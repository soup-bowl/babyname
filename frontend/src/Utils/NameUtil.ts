import { NameRecords, NameStorage } from "@/Types"

export const pickRandomName = (names: NameRecords[], existing: NameStorage[]): NameRecords | undefined => {
	const pickName = (names: NameRecords[]) => {
		return names[Math.floor(Math.random() * names.length)]
	}
	const checkDupe = (needle: NameRecords, haystack: NameStorage[]) => {
		return haystack.some((item) => item.Name === needle.Name)
	}

	let name: NameRecords
	let cycles = 0
	do {
		if (cycles >= 10) {
			return undefined
		}
		name = pickName(names)
		console.log(names)
		cycles++
	} while (checkDupe(name, existing))

	return name
}
