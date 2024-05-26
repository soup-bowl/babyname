import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/Components/ui/table"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { useLocalStorage, useLocalStorageSingle } from "@/Hooks"
import { NameStorage } from "@/Types"
import { Button } from "@/Components/ui/button"

function Review() {
	const [records, setRecords] = useLocalStorage<NameStorage[]>("eggsalad-choices", [])
	const [surname] = useLocalStorageSingle("eggsalad-surname", "Smith")

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
						{records.sort(ReviewSort).map((name) => {
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
			</ScrollArea>
		</>
	)
}

export default Review
