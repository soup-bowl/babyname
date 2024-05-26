import { useState, useEffect } from "react"

const NAME_SOURCE = "https://gist.githubusercontent.com/soup-bowl/63cd64c5e52653be2600b44c330b9e3d/raw/names.csv"

interface NameRecords {
	Name: string
	Gender: string
	Meaning: string
}

const fetchData = async (): Promise<string> => {
	const response = await fetch(NAME_SOURCE)
	const data = await response.text()

	return data
}

const parseData = (data: string): NameRecords[] => {
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

const useNameData = () => {
	const [data, setData] = useState<NameRecords[]>([])
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const loadData = async () => {
			try {
				setLoading(true)
				const csvData = await fetchData()
				const parsedData = parseData(csvData)
				setData(parsedData)
			} catch (err) {
				setError(err as Error)
			} finally {
				setLoading(false)
			}
		}

		loadData()
	}, [])

	return { data, error, loading }
}

export default useNameData
