import { useEffect, useState } from "react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/Components/ui/table"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { useLocalStorage, useLocalStorageSingle } from "@/Hooks"
import { NameCompressed, NameStorage } from "@/Types"
import { Button } from "@/Components/ui/button"
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogHeader,
} from "@/Components/ui/dialog"
import { QRCodeSVG } from "qrcode.react"
import { compressNames, decompressNames } from "@/Utils"
import QrCodeReader from "react-qrcode-reader"

function ShareDialog({ data }: { data: NameStorage[] }) {
	const names = compressNames(data.map((a) => ({ Name: a.Name, Accepted: a.Accepted })))

	return (
		<Dialog>
			<DialogTrigger>
				<Button>Share</Button>
			</DialogTrigger>
			<DialogContent className="max-w-screen-sm">
				<DialogHeader>
					<DialogTitle>Share</DialogTitle>
					<DialogDescription className="flex justify-center">
						<QRCodeSVG value={names} width="100%" height="400" />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

function CompareDialog({ setData }: { setData: (value: NameCompressed[]) => void }) {
	const [dialogState, setDialogState] = useState<boolean>(false)

	return (
		<Dialog open={dialogState} onOpenChange={setDialogState}>
			<DialogTrigger>
				<Button>Compare</Button>
			</DialogTrigger>
			<DialogContent className="max-w-screen-sm">
				<DialogHeader>
					<DialogTitle>Compare</DialogTitle>
					<DialogDescription className="flex justify-center">
						<QrCodeReader
							delay={100}
							width={600}
							height={500}
							action={(scan) => {
								setData(decompressNames(scan))
								setDialogState(false)
							}}
						/>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

function Review() {
	const [records, setRecords] = useLocalStorage<NameStorage[]>("eggsalad-choices", [])
	const [recordsSorted, setRecordsSorted] = useState<NameStorage[]>([])
	const [compares, setCompares] = useState<NameCompressed[]>([])
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
			<div className="flex gap-2">
				<ShareDialog data={recordsSorted} />
				<CompareDialog setData={setCompares} />
				<a onClick={() => console.log(compares)}>Test</a>
			</div>
			<ScrollArea className="h-[400px] w-full">
				<div className="block sm:hidden">
					<Table className="text-black">
						<TableBody className="text-xl">
							{recordsSorted.map((name) => {
								const chosenColour = name.Accepted ? "bg-green-100" : "bg-red-100"

								return (
									<TableRow className={chosenColour} key={name.Name}>
										<TableCell className="text-left">
											<p className="font-medium">
												{name.Name}&nbsp;{surname}
											</p>
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
