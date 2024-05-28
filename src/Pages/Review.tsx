import { useContext, useEffect, useState } from "react"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { useLocalStorageSingle } from "@/Hooks"
import { NameStorage } from "@/Types"
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
import {
	RemoveChoice as RemoveFromDB,
	compareNameChoices,
	compressNames,
	createNameDataCSV,
	decompressNames,
	getAlreadySeenNames,
	presentDownload,
} from "@/Utils"
import QrCodeReader from "react-qrcode-reader"
import { DataTable } from "@/Components/DataTable"
import { columns, columnsMobile } from "@/Components/DataTable.def"
import { DataContext } from "@/Pages/App"

function ShareDialog({ data }: { data: NameStorage[] }) {
	const names = compressNames(data.map((a) => ({ Name: a.Name, Accepted: a.UserAccepted })))

	return (
		<Dialog>
			<DialogTrigger>
				<Button>Share</Button>
			</DialogTrigger>
			<DialogContent className="max-w-screen-sm">
				<DialogHeader>
					<DialogTitle>Share</DialogTitle>
					<DialogDescription className="flex justify-center">
						<div className="bg-white border-4 border-black p-4">
							<QRCodeSVG value={names} width="100%" height="400" />
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

function CompareDialog({ data, setData }: { data: NameStorage[]; setData: (value: NameStorage[]) => void }) {
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
						<div className="bg-white border-4 border-black">
							<QrCodeReader
								delay={100}
								width={600}
								height={500}
								action={(scan) => {
									setData(compareNameChoices(data, decompressNames(scan)))
									setDialogState(false)
								}}
								videoConstraints={{
									facingMode: {
										ideal: "environment",
									},
								}}
							/>
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

function Review() {
	const data = useContext(DataContext)
	const [records, setRecords] = useState<NameStorage[]>([])
	const [surname] = useLocalStorageSingle("eggsalad-surname", "Smith")

	useEffect(() => {
		const loadInitialData = async () => setRecords(await getAlreadySeenNames())
		loadInitialData()
	}, [])

	const RemoveChoice = async (choice: NameStorage): Promise<void> => {
		await RemoveFromDB(choice)
		setRecords(await getAlreadySeenNames())
	}

	const DownloadData = () =>
		presentDownload(new Blob([createNameDataCSV(records, surname)], { type: "text/csv;charset=utf-8;" }))

	return (
		<>
			<div className="flex justify-center gap-2">
				<ShareDialog data={records} />
				<CompareDialog data={records} setData={setRecords} />
				<Button onClick={DownloadData}>Download</Button>
			</div>
			<p className="text-center text-foreground my-4">
				Voted on {records.length} of {data.length} possible names
			</p>
			<ScrollArea className="h-[400px] w-full border-2 border-black mt-4 text-black bg-white">
				<div className="block sm:hidden">
					<DataTable columns={columnsMobile(RemoveChoice, surname)} data={records} />
				</div>
				<div className="hidden sm:block">
					<DataTable columns={columns(RemoveChoice, surname)} data={records} />
				</div>
			</ScrollArea>
		</>
	)
}

export default Review
