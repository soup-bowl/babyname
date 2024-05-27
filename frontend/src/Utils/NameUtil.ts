import { NameRecords, NameStorage } from "@/Types"
import { NameComparisons, NameCompressed } from "@/Types/Names"

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

export const compressNames = (names: NameCompressed[]): string => {
	return names.map((d) => `${d.Name}:${Number(d.Accepted)}`).join(",")
}

export const decompressNames = (compressed: string): NameCompressed[] => {
	return compressed.split(",").map((pair) => {
		const [name, accepted] = pair.split(":")
		return {
			Name: name,
			Accepted: Boolean(Number(accepted)),
		}
	})
}

export const compareNameChoices = (nameRecords: NameRecords[], nameCompressed: NameCompressed[]): NameComparisons[] => {
	const nameCompressedMap = new Map<string, boolean>()
	nameCompressed.forEach((nc) => {
		nameCompressedMap.set(nc.Name, nc.Accepted)
	})

	const nameComparisons: NameComparisons[] = nameRecords.map((nr) => {
		const otherAccepted = nameCompressedMap.get(nr.Name)
		return {
			Name: nr.Name,
			Gender: nr.Gender,
			UserAccepted: "Accepted" in nr ? (nr as NameStorage).Accepted : false,
			OtherAccepted: otherAccepted !== undefined ? otherAccepted : undefined,
		}
	})

	return nameComparisons
}
