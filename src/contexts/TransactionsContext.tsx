import { createContext, ReactNode, useEffect, useState } from "react";

interface Transaction {
    id: number,
    description: string,
    type: 'income' | 'outcome',
    category: string,
    price: number,
    createdAt: string
}

interface TransactionsContextProps {
    transactions: Transaction[]
    fetchTransactions: (query?: string) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextProps)

interface TransactionsProviderProps {
    children: ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        fetchTransactions()
    }, [])

    async function fetchTransactions(query?: string) {
        var url = new URL('http://localhost:3333/transactions')

        if (query) {
            url.searchParams.append('q', query)
        }

        const response = await fetch(url)
        const data = await response.json()

        setTransactions(data)
    }
    return (
        <TransactionsContext.Provider value={{
            transactions,
            fetchTransactions
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}