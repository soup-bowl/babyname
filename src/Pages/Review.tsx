import { useContext, useEffect, useState } from "react"
import { useLocalStorageSingle } from "@/Hooks"
import { NameStorage } from "@/Types"
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	Tabs,
	DataTable,
	TabsContent,
	TabsList,
	TabsTrigger,
	columns,
	columnsMobile,
	ScrollArea,
	Button,
	useToast,
	DialogHeader,
	DialogTitle,
	Input,
} from "@/Components"
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
import { DataContext } from "@/Pages/App"

function ShareDialog({ data, setData }: { data: NameStorage[]; setData: (value: NameStorage[]) => void }) {
	const { toast } = useToast()
	const names = compressNames(data.map((a) => ({ id: a.id ?? "", Accepted: a.UserAccepted })))
	const nameData = useContext(DataContext)
	const [dialogState, setDialogState] = useState<boolean>(false)
	const [manualVal, setManualVal] = useState<string>("")

	const copyTextToClipboard = async (value: string) => {
		try {
			await navigator.clipboard.writeText(value)
		} catch (err) {
			console.error("Failed to copy text: ", err)
		}
	}

	const convertValues = (string: string) => {
		setData(compareNameChoices(data, decompressNames(string, nameData)))
		toast({ title: "Their choices loaded in" })
		setDialogState(false)
	}

	return (
		<Dialog open={dialogState} onOpenChange={setDialogState}>
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
						<div className="flex justify-center bg-white border-4 border-black p-4">
							<QRCodeSVG value={names} width="100%" height="400" />
						</div>
						<div className="flex justify-center my-2">
							<Button onClick={() => copyTextToClipboard(names)}>Manual Copy</Button>
						</div>
					</TabsContent>
					<TabsContent value="compare">
						<div className="flex justify-center">
							<div className="bg-white border-4 border-black">
								<QrCodeReader
									delay={100}
									width={600}
									height={500}
									action={(scan) => convertValues(scan)}
									videoConstraints={{
										facingMode: {
											ideal: "environment",
										},
									}}
								/>
							</div>
						</div>
						<div className="flex justify-center my-2">
							<Dialog>
								<DialogTrigger>
									<Button>Manual Import</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Manual Import</DialogTitle>
									</DialogHeader>
									<Input className="mt-4" value={manualVal} onChange={(e) => setManualVal(e.target.value)} />
									<Button onClick={() => convertValues(manualVal)}>Submit</Button>
								</DialogContent>
							</Dialog>
						</div>
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	)
}

export interface ReviewProps {
	updateNameChoices: (mustReload?: boolean) => Promise<void>
}

function Review({ updateNameChoices }: ReviewProps) {
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
				<Button size="xs" className="mx-2" onClick={() => updateNameChoices(true)}>
					Update
				</Button>
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
