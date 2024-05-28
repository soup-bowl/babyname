import { NameRecords, NameStorage } from "@/Types"

export const parseNameData = (data: string): NameRecords[] => {
	const lines = data
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line.length > 0)
	const headers = lines[0].split(",")

	return lines.slice(1).map((line) => {
		const values = line.split(",")
		return headers.reduce((obj, header, index) => {
			obj[header as keyof NameRecords] = values[index]
			return obj
		}, {} as NameRecords)
	})
}

export const createNameDataCSV = (data: NameStorage[]): string => {
	const headers = Object.keys(data[0]).filter((header) => header !== "id")
	const csvRows = data.map((record) =>
		headers
			.map((header) => {
				const value = record[header as keyof NameStorage]
				return typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value
			})
			.join(",")
	)

	return [headers.join(","), ...csvRows].join("\n")
}
