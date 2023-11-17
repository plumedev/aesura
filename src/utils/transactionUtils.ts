/** Data */
import transactions from '@/data/transactions.json'

export const getRevenus = () => {
  const revenus = transactions.filter((transaction) => transaction.type === true)
  return revenus
}

export const getDepenses = () => {
  const depenses = transactions.filter((transaction) => transaction.type === false)
  return depenses
}
