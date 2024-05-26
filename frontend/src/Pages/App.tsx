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
			<div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gray-200">
				<Selection />
				<p className="text-gray-500">
					made by <a className="underline" href="https://github.com/soup-bowl">soup-bowl</a>
				</p>
			</div>
		</DataContext.Provider>
	)
}

export default App
