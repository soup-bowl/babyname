import useNameData from "@/Utils/Names"

function App() {
	const data = useNameData()
	console.log(data)

	return <h1 className="text-5xl font-bold underline">Hello world!</h1>
}

export default App
