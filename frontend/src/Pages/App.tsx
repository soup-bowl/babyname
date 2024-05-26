import { NameStorage, useLocalStorage, useNameData } from "@/Utils"

function App() {
	const data = useNameData()
	const [records, setRecords] = useLocalStorage<NameStorage[]>("choices", [])
	console.log(data)

	return <h1 className="text-5xl font-bold underline">Hello world!</h1>
}

export default App
