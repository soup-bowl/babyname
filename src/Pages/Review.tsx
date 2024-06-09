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
import { TriangleAlert } from "lucide-react"
import { DataTable } from "@/Components/DataTable"
import { columns, columnsMobile } from "@/Components/DataTable.def"
import { DataContext } from "@/Pages/App"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"

function ShareDialog({ data, setData }: { data: NameStorage[]; setData: (value: NameStorage[]) => void }) {
	const names = compressNames(data.map((a) => ({ id: a.id ?? "", Accepted: a.UserAccepted })))
	const nameData = useContext(DataContext)
	const [dialogState, setDialogState] = useState<boolean>(false)

	return (
		<Dialog>
			<DialogTrigger>
				<Button>Share</Button>
			</DialogTrigger>
			<DialogContent className="max-w-screen-sm">
				<Tabs defaultValue="share" className="">
					<TabsList>
						<TabsTrigger value="share">Share</TabsTrigger>
						<TabsTrigger value="compare">Compare</TabsTrigger>
					</TabsList>
					<TabsContent value="share">
						<p className="bg-yellow-300 text-black border-2 border-black shadow-brutal-drop-md p-4 my-4">
							<TriangleAlert className="inline mr-2" />
							The more choices you make, the smaller and harder-to-read this becomes
						</p>
						<div className="flex justify-center bg-white border-4 border-black p-4">
							<QRCodeSVG value={names} width="100%" height="400" />
						</div>
					</TabsContent>
					<TabsContent value="compare">
						<div className="flex justify-center">
							<div className="bg-white border-4 border-black">
								<QrCodeReader
									delay={100}
									width={600}
									height={500}
									action={(scan) => {
										setData(compareNameChoices(data, decompressNames(scan, nameData)))
										setDialogState(false)
									}}
									videoConstraints={{
										facingMode: {
											ideal: "environment",
										},
									}}
								/>
							</div>
						</div>
					</TabsContent>
				</Tabs>
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
				<ShareDialog data={records} setData={setRecords} />
				<Button onClick={DownloadData}>Download</Button>
			</div>
			<p className="text-center text-foreground my-4">
				Voted on {records.length} of {data.length} possible names
			</p>
			<ScrollArea className="h-[400px] w-full border-2 border-black mt-4 text-black bg-white">
				<div className="block sm:hidden">
					<DataTable columns={columnsMobile(RemoveChoice)} data={records} />
				</div>
				<div className="hidden sm:block">
					<DataTable columns={columns(RemoveChoice, surname)} data={records} />
				</div>
			</ScrollArea>
		</>
	)
}

export default Review
