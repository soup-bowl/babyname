import { useLocalStorage, useLocalStorageSingle } from "@/Hooks"
import { NameRecords, NameStorage } from "@/Types"
import { pickRandomName } from "@/Utils"
import { useContext, useState } from "react"
import { DataContext } from "@/Pages/App"
import Review from "@/Pages/Review"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogHeader,
} from "@/Components/ui/dialog"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"

function ReviewDialog() {
	return (
		<Dialog>
			<DialogTrigger>
				<Button size="lg">Review</Button>
			</DialogTrigger>
			<DialogContent className="max-w-screen-md">
				<DialogHeader>
					<DialogTitle>Review so far</DialogTitle>
					<DialogDescription>
						<Review />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

function SurnameDialog() {
	const [name, setName] = useLocalStorageSingle("eggsalad-surname", "Smith")

	return (
		<Dialog>
			<DialogTrigger>
				<span className="hover:underline">{name}</span>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Change Surname</DialogTitle>
					<DialogDescription>
						<Input value={name} onChange={(e) => setName(e.target.value)} />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

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
						UserAccepted: decision,
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
		<>
			<Card className="text-center text-2xl p-6 max-w-lg w-full mx-4">
				<CardHeader>
					<CardTitle className="text-4xl">
						{name.Name}&nbsp;
						<SurnameDialog />
					</CardTitle>
					<CardDescription className="text-2xl">{name.Gender}</CardDescription>
				</CardHeader>
				<CardContent>{name.Meaning}</CardContent>
				<CardFooter className="flex justify-between gap-4">
					<Button size="lg" onClick={() => submitNameChoice(false)}>
						No
					</Button>
					<ReviewDialog />
					<Button size="lg" onClick={() => submitNameChoice(true)}>
						Yes
					</Button>
				</CardFooter>
			</Card>
		</>
	)
}

export default Selection
