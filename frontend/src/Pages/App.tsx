import { useLocalStorage, useNameData } from "@/Hooks"
import { NameStorage } from "@/Types"

function App() {
	const data = useNameData()
	const [records, setRecords] = useLocalStorage<NameStorage[]>("choices", [])
	console.log(data)

	return <h1 className="text-5xl font-bold underline">Hello world!</h1>
}

export default App
