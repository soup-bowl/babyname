import { createContext } from "react"
import Selection from "@/Pages/Selection"
import { useNameData } from "@/Hooks"
import { NameRecords } from "@/Types"

export const DataContext = createContext<NameRecords[]>([])

function App() {
	const data = useNameData()

	if (data.loading) {
		return <h1>Loading</h1>
	}

	return (
		<DataContext.Provider value={data.data}>
			<Selection />
		</DataContext.Provider>
	)
}

export default App
