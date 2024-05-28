import { useState, useEffect } from "react"
import { NameRecords } from "@/Types"
import { parseNameData } from "@/Utils"

const NAME_SOURCE = import.meta.env.VITE_NAME_SOURCE

const fetchData = async (): Promise<string> => {
	const response = await fetch(NAME_SOURCE)
	const data = await response.text()

	return data
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
				const parsedData = parseNameData(csvData)
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
