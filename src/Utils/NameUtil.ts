import { NameRecords, NameStorage } from "@/Types"
import { NameCompressed } from "@/Types/Names"

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
		cycles++
	} while (checkDupe(name, existing))

	return name
}

export const compressNames = (names: NameCompressed[]): string => {
	return names.map((d) => `${d.id}:${Number(d.Accepted)}`).join(",")
}

export const decompressNames = (compressed: string, records: NameRecords[]): NameStorage[] => {
	return compressed
		.split(",")
		.map((pair) => {
			const [id, accepted] = pair.split(":")
			const findName = records.find((n) => n.id === id)

			return {
				id: findName?.id,
				Name: findName?.Name ?? "",
				Gender: findName?.Gender ?? "",
				Meaning: findName?.Meaning ?? "",
				UserAccepted: Boolean(Number(accepted)),
			}
		})
		.filter((item) => item.id !== undefined)
}

export const compareNameChoices = (names: NameStorage[], theirNames: NameStorage[]): NameStorage[] => {
	const nameMap = new Map<string, boolean>()

	theirNames.forEach((item) => {
		if (item.id !== undefined) {
			nameMap.set(item.id.toString(), item.UserAccepted)
		}
	})

	return names.map((item) => {
		if (item.id !== undefined && nameMap.has(item.id.toString())) {
			return {
				...item,
				OtherAccepted: nameMap.get(item.id.toString()),
			}
		}
		return item
	})
}
