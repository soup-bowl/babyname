import { useLocalStorage } from "@/Hooks"
import { NameRecords, NameStorage } from "@/Types"
import { pickRandomName } from "@/Utils"
import { useContext, useState } from "react"
import { DataContext } from "@/Pages/App"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/Components/ui/dialog"
import { Button } from "@/Components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/Components/ui/table"
import { ScrollArea } from "@/Components/ui/scroll-area"

interface Props {
	chosenNames: NameStorage[]
}

function Review({ chosenNames }: Props) {
	return (
		<Dialog>
			<DialogTrigger>
				<Button size="lg">Review</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Review so far</DialogTitle>
					<DialogDescription>
						<ScrollArea className="h-[400px] w-full rounded-md border p-4">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-[100px]">Name</TableHead>
										<TableHead>Gender</TableHead>
										<TableHead>Decision</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{chosenNames.map((name) => (
										<TableRow key={name.Name}>
											<TableCell className="font-medium">{name.Name}</TableCell>
											<TableCell>{name.Gender}</TableCell>
											<TableCell>{name.Accepted ? <>✔️</> : <>❌</>}</TableCell>
											<TableCell className="text-right"></TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</ScrollArea>
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
		<>
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
						<Review chosenNames={records} />
						<Button size="lg" onClick={() => submitNameChoice(false)}>No</Button>
					</CardFooter>
				</Card>
			</div>
		</>
	)
}

export default Selection
