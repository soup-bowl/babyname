import { createContext } from "react"
import Selection from "@/Pages/Selection"
import { useNameData } from "@/Hooks"
import { NameRecords } from "@/Types"
import { TriangleAlert } from "lucide-react"
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogHeader,
	Button,
	Toaster,
} from "@/Components"
import Review, { ReviewProps } from "./Review"

export const DataContext = createContext<NameRecords[]>([])

function ReviewDialog({ updateNameChoices }: Readonly<ReviewProps>) {
	return (
		<Dialog>
			<DialogTrigger>
				<Button>Review</Button>
			</DialogTrigger>
			<DialogContent className="max-w-screen-md">
				<DialogHeader>
					<DialogTitle>Review so far</DialogTitle>
					<DialogDescription>
						<Review updateNameChoices={updateNameChoices} />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

function App() {
	const { data, loading, updateData } = useNameData()

	if (loading) {
		return <h1>Loading</h1>
	}

	return (
		<DataContext.Provider value={data}>
			<div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-brutal3">
				<p className="bg-yellow-300 text-black border-2 border-black shadow-brutal-drop-md p-4">
					<TriangleAlert className="inline mr-2" />
					This is a <strong>beta application</strong> - data loss may occur
				</p>
				<Selection />
				<div className="flex justify-center gap-4">
					<ReviewDialog updateNameChoices={updateData} />
				</div>
				<p className="text-gray-800">
					made by{" "}
					<a className="underline" href="https://soupbowl.io">
						soup-bowl
					</a>
					&nbsp;•&nbsp;{APP_VERSION}&nbsp;•&nbsp;
					<a className="underline" href="https://www.buymeacoffee.com/soupbowl">
						donate
					</a>
				</p>
			</div>
			<Toaster />
		</DataContext.Provider>
	)
}

export default App
