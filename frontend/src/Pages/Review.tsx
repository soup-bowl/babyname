import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/Components/ui/table"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { useLocalStorage, useLocalStorageSingle } from "@/Hooks"
import { NameStorage } from "@/Types"
import { Button } from "@/Components/ui/button"
import { useEffect, useState } from "react"

function Review() {
	const [records, setRecords] = useLocalStorage<NameStorage[]>("eggsalad-choices", [])
	const [recordsSorted, setRecordsSorted] = useState<NameStorage[]>([])
	const [surname] = useLocalStorageSingle("eggsalad-surname", "Smith")

	useEffect(() => setRecordsSorted(records.sort(ReviewSort)), [records])

	const RemoveChoice = (name: NameStorage) => {
		setRecords((names) => {
			const updatedRecords = names.filter((r) => r !== name)
			return updatedRecords
		})
	}

	const ReviewSort = (a: NameStorage, b: NameStorage) => {
		if (Number(a.Accepted) !== Number(b.Accepted)) {
			return Number(b.Accepted) - Number(a.Accepted)
		}

		const genderComparison = a.Gender.localeCompare(b.Gender)
		if (genderComparison !== 0) {
			return genderComparison
		}

		return a.Name.localeCompare(b.Name)
	}

	return (
		<>
			<ScrollArea className="h-[400px] w-full">
				<div className="block sm:hidden">
					<Table className="text-black">
						<TableBody className="text-xl">
							{recordsSorted.map((name) => {
								const chosenColour = name.Accepted ? "bg-green-100" : "bg-red-100"

								return (
									<TableRow className={chosenColour} key={name.Name}>
										<TableCell className="text-left">
											<p className="font-medium">{name.Name}&nbsp;{surname}</p>
											<p className="text-sm">{name.Gender}</p>
										</TableCell>
										<TableCell>
											<Button size="icon" onClick={() => RemoveChoice(name)}>
												X
											</Button>
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</div>
	
				<div className="hidden sm:block">
					<Table className="text-black">
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Gender</TableHead>
								<TableHead>Decision</TableHead>
								<TableHead className="w-[120px]">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className="text-xl">
							{recordsSorted.map((name) => {
								const chosenColour = name.Accepted ? "bg-green-100" : "bg-red-100"

								return (
									<TableRow className={chosenColour} key={name.Name}>
										<TableCell className="font-medium">
											{name.Name}&nbsp;{surname}
										</TableCell>
										<TableCell>{name.Gender}</TableCell>
										<TableCell>{name.Accepted ? <>✔️</> : <>❌</>}</TableCell>
										<TableCell>
											<Button size="sm" onClick={() => RemoveChoice(name)}>
												Delete
											</Button>
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</div>
			</ScrollArea>
		</>
	)
}

export default Review
