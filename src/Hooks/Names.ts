import { useState, useEffect, useCallback } from "react"
import { NameRecords } from "@/Types"
import { parseNameData } from "@/Utils"

const NAME_SOURCE = import.meta.env.VITE_NAME_SOURCE
const CACHE_KEY = "eggsalad-namecache"

const fetchData = async (): Promise<string> => {
	const response = await fetch(NAME_SOURCE)
	const data = await response.text()

	return data
}

const useNameData = () => {
	const [data, setData] = useState<NameRecords[]>([])
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	const loadData = useCallback(async (mustReload = false) => {
		let cachedData: string | null = null

		try {
			setLoading(true)

			cachedData = localStorage.getItem(CACHE_KEY)
			if (mustReload === false && cachedData) {
				const parsedCachedData = JSON.parse(cachedData)
				setData(parsedCachedData)
				setLoading(false)
			} else {
				const csvData = await fetchData()
				const parsedData = parseNameData(csvData)
				setData(parsedData)

				localStorage.setItem(CACHE_KEY, JSON.stringify(parsedData))
			}
		} catch (err) {
			if (!cachedData) {
				setError(err as Error)
			}
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		loadData()
	}, [loadData])

	return { data, error, loading, updateData: loadData }
}

export default useNameData
