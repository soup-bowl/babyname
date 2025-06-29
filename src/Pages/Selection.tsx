import { useLocalStorageSingle } from "@/Hooks"
import { NameRecords, NameStorage } from "@/Types"
import { AddChoice, getAlreadySeenNames, pickRandomName } from "@/Utils"
import { useContext, useEffect, useState } from "react"
import { DataContext } from "@/Pages/App"
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogHeader,
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
	CardFooter,
	Button,
	Input,
} from "@/Components"

function SurnameDialog() {
	const [name, setName] = useLocalStorageSingle("eggsalad-surname", "Smith")
	const [dialogState, setDialogState] = useState<boolean>(false)

	return (
		<Dialog open={dialogState} onOpenChange={setDialogState}>
			<DialogTrigger>
				<span className="hover:underline">{name !== "" ? name : "_"}</span>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Change Surname</DialogTitle>
					<DialogDescription>
						<Input
							className="mt-4"
							value={name}
							onChange={(e) => setName(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && setDialogState(false)}
						/>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

function Selection() {
	const data = useContext(DataContext)
	const [records, setRecords] = useState<NameStorage[]>([])
	const [name, setName] = useState<NameRecords | undefined>(pickRandomName(data, records))

	useEffect(() => {
		const loadInitialData = async () => setRecords(await getAlreadySeenNames())
		loadInitialData()
	}, [])

	const submitNameChoice = async (decision: boolean): Promise<void> => {
		if (name !== undefined) {
			await AddChoice(name, decision)
			setRecords(await getAlreadySeenNames())
			setName(pickRandomName(data, records))
		}
	}

	if (name === undefined) {
		return <h1>Error</h1>
	}

	const windowColour = (gender: string) => {
		switch (gender.toLowerCase()) {
			case "male":
				return "bg-blue-200"
			case "female":
				return "bg-pink-200"
			case "universal":
			default:
				return "bg-yellow-200"
		}
	}

	return (
		<Card className={`text-center text-2xl p-6 max-w-lg w-full mx-4 ${windowColour(name.Gender)}`}>
			<CardHeader>
				<CardTitle className="text-4xl">
					{name.Name}&nbsp;
					<SurnameDialog />
				</CardTitle>
				<CardDescription className="text-2xl">{name.Gender}</CardDescription>
			</CardHeader>
			<CardContent>{name.Meaning}</CardContent>
			<CardFooter className="flex justify-between gap-4">
				<Button size="lg" className="bg-red-400 hover:bg-red-200" onClick={() => submitNameChoice(false)}>
					No
				</Button>
				<Button size="lg" onClick={() => setName(pickRandomName(data, records))}>
					Skip
				</Button>
				<Button size="lg" className="bg-green-400" onClick={() => submitNameChoice(true)}>
					Yes
				</Button>
			</CardFooter>
		</Card>
	)
}

export default Selection
