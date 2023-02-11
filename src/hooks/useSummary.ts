import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export function useSummary() {
    const { transactions } = useContext(TransactionsContext)

    const summary = transactions.reduce((accumulate, transaction) => {
        if (transaction.type === 'income') {
            accumulate.income += transaction.price 
            accumulate.total += transaction.price
        } else {
            accumulate.outcome += transaction.price
            accumulate.total -= transaction.price
        }

        return accumulate
    }, {
        income: 0,
        outcome: 0,
        total:0
    })

    console.log(summary)

    return summary
 }