import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/Components/ui/button"
import { NameStorage } from "@/Types"
import { EmojiValue } from "./DataTable"
import { ArrowUpDown } from "lucide-react"

export type HandleRowAction = (row: NameStorage) => void

export const columns = (handleRowAction: HandleRowAction, surname: string): ColumnDef<NameStorage>[] => [
	{
		accessorKey: "Name",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			return (
				<>
					{row.original.Name} {surname}
				</>
			)
		},
	},
	{
		accessorKey: "Gender",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Gender
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		accessorKey: "UserAccepted",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Decision
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => <EmojiValue value={row.original.UserAccepted} />,
	},
	{
		accessorKey: "OtherAccepted",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Theirs
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => <EmojiValue value={row.original.OtherAccepted} />,
	},
	{
		accessorKey: "Actions",
		cell: ({ row }) => {
			return (
				<Button className="bg-red-400" onClick={() => handleRowAction(row.original)}>
					Delete
				</Button>
			)
		},
	},
]

export const columnsMobile = (handleRowAction: HandleRowAction, surname: string): ColumnDef<NameStorage>[] => [
	{
		accessorKey: "Name",
		header: "Name",
		cell: ({ row }) => (
			<div className="text-left">
				<p className="text-lg">
					{row.original.Name}&nbsp;{surname}
				</p>
				<p className="text-sm">{row.original.Gender}</p>
			</div>
		),
	},
	{
		accessorKey: "UserAccepted",
		header: "Decision",
		cell: ({ row }) => (
			<div className="flex flex-row gap-2">
				<div>
					<span className="underline">Yours</span>
					<EmojiValue className="flex justify-center" value={row.original.UserAccepted} />
				</div>
				<div>
					<span className="underline">Theirs</span>
					<EmojiValue className="flex justify-center" value={row.original.OtherAccepted} />
				</div>
			</div>
		),
	},
	{
		accessorKey: "Actions",
		cell: ({ row }) => {
			return (
				<Button className="bg-red-400" onClick={() => handleRowAction(row.original)}>
					X
				</Button>
			)
		},
	},
]
