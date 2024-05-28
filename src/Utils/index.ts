export { parseNameData, createNameDataCSV } from "./csvUtil"
export { pickRandomName, compressNames, decompressNames, compareNameChoices } from "./NameUtil"

export const presentDownload = (data: Blob): void => {
	const link = document.createElement("a")
	const url = URL.createObjectURL(data)

	link.setAttribute("href", url)
	link.setAttribute("download", "babynames.csv")
	link.style.visibility = "hidden"
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}
