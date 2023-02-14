import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../contexts/TransactionsContext'

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  const summary = transactions.reduce(
    (accumulate, transaction) => {
      if (transaction.type === 'income') {
        accumulate.income += transaction.price
        accumulate.total += transaction.price
      } else {
        accumulate.outcome += transaction.price
        accumulate.total -= transaction.price
      }

      return accumulate
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  )

  console.log(summary)

  return summary
}
