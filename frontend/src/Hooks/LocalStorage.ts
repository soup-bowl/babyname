import { useState, useEffect, Dispatch, SetStateAction } from "react"

type UseLocalStorageReturn<T> = [T, Dispatch<SetStateAction<T>>]

export const useLocalStorage = <T>(key: string, initialValue: T): UseLocalStorageReturn<T> => {
	const [value, setValue] = useState<T>(() => {
		const storedValue = localStorage.getItem(key)
		return storedValue ? JSON.parse(storedValue) : initialValue
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue]
}

type SetValue<T> = (value: T | ((val: T) => T)) => void

export function useLocalStorageSingle(key: string, defaultValue: string): [string, SetValue<string>] {
	const [value, setValue] = useState(() => {
		const storedValue = window.localStorage.getItem(key)
		return storedValue !== null ? storedValue : defaultValue
	})

	useEffect(() => {
		window.localStorage.setItem(key, value)
	}, [key, value])

	return [value, setValue]
}
