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
}

export const TransactionsContext = createContext({} as TransactionsContextProps)

interface TransactionsProviderProps {
    children: ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        loadTransactions()
    }, [])

    async function loadTransactions() {
        const response = await fetch('http://localhost:3333/transactions')
        const data = await response.json()

        setTransactions(data)
    }
    return (
        <TransactionsContext.Provider value={{
            transactions
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}