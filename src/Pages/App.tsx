import { createContext } from "react"
import Selection from "@/Pages/Selection"
import { useNameData } from "@/Hooks"
import { NameRecords } from "@/Types"
import { TriangleAlert } from "lucide-react"

export const DataContext = createContext<NameRecords[]>([])

function App() {
	const data = useNameData()

	if (data.loading) {
		return <h1>Loading</h1>
	}

	return (
		<DataContext.Provider value={data.data}>
			<div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-brutal3">
				<p className="bg-yellow-300 text-black border-2 border-black shadow-brutal-drop-md p-4">
					<TriangleAlert className="inline mr-2" />
					This is a <strong>beta application</strong> - data loss may occur
				</p>
				<Selection />
				<p className="text-gray-800">
					made by{" "}
					<a className="underline" href="https://soupbowl.io">
						soup-bowl
					</a>
					&nbsp;•&nbsp;{APP_VERSION}&nbsp;•&nbsp;
					<a className="underline" href="mailto:babynames@subo.dev?subject=Baby Name Recommendations">
						suggest names
					</a>
				</p>
			</div>
		</DataContext.Provider>
	)
}

export default App
