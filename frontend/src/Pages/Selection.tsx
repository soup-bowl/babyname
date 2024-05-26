import { useLocalStorage } from "@/Hooks"
import { NameRecords, NameStorage } from "@/Types"
import { pickRandomName } from "@/Utils"
import { useContext, useState } from "react"
import { DataContext } from "@/Pages/App"

function Selection() {
	const data = useContext(DataContext)
	const [records, setRecords] = useLocalStorage<NameStorage[]>("eggsalad-choices", [])
	const [name, setName] = useState<NameRecords | undefined>(pickRandomName(data, records))

	const submitNameChoice = (decision: boolean) => {
		if (name !== undefined) {
			setRecords((prevRecords) => {
				const updatedRecords = [
					...prevRecords,
					{
						Name: name.Name,
						Gender: name.Gender,
						Meaning: name.Meaning,
						Accepted: decision,
					},
				]
				console.log(updatedRecords)
				return updatedRecords
			})
		}

		setName(pickRandomName(data, records))
	}

	if (name === undefined) {
		return <h1>Error</h1>
	}

	return (
		<div className="text-xl">
			<h1 className="text-5xl mb-5 font-bold">{name.Name}</h1>
			<button onClick={() => submitNameChoice(true)}>Yes</button>
			<button onClick={() => submitNameChoice(false)}>No</button>
		</div>
	)
}

export default Selection
