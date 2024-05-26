import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/Components/ui/table"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { useLocalStorage } from "@/Hooks"
import { NameStorage } from "@/Types"
import { Button } from "@/Components/ui/button"

function Review() {
	const [records, setRecords] = useLocalStorage<NameStorage[]>("eggsalad-choices", [])

	const RemoveChoice = (name: NameStorage) => {
		setRecords((names) => {
			const updatedRecords = names.filter((r) => r !== name)
			return updatedRecords
		})
	}

	return (
		<>
			<ScrollArea className="h-[400px] w-full">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Name</TableHead>
							<TableHead>Gender</TableHead>
							<TableHead>Decision</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{records.map((name) => (
							<TableRow key={name.Name}>
								<TableCell className="font-medium">{name.Name}</TableCell>
								<TableCell>{name.Gender}</TableCell>
								<TableCell>{name.Accepted ? <>✔️</> : <>❌</>}</TableCell>
								<TableCell>
									<Button onClick={() => RemoveChoice(name)}>Delete</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</ScrollArea>
		</>
	)
}

export default Review
