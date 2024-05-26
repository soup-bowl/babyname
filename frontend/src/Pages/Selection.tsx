import { useLocalStorage } from "@/Hooks"
import { NameRecords, NameStorage } from "@/Types"
import { pickRandomName } from "@/Utils"
import { useContext, useState } from "react"
import { DataContext } from "@/Pages/App"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/card"
import { Button } from "@/Components/button"

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
		<div className="flex items-center justify-center min-h-screen bg-gray-200">
			<Card className="text-center text-2xl p-6 max-w-lg w-full mx-4">
				<CardHeader>
					<CardTitle className="text-4xl">{name.Name}</CardTitle>
					<CardDescription className="text-2xl">{name.Gender}</CardDescription>
				</CardHeader>
				<CardContent>
					{name.Meaning}
				</CardContent>
				<CardFooter className="flex justify-between gap-4">
					<Button size="lg" onClick={() => submitNameChoice(true)}>Yes</Button>
					<Button size="lg" onClick={() => submitNameChoice(false)}>No</Button>
				</CardFooter>
			</Card>
		</div>
	)
}

export default Selection
