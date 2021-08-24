import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface TransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance = {
    income: 0,
    outcome: 0,
    total: 0,
  };

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create(transaction: TransactionDTO): Transaction {
    if (transaction.type === 'outcome') {
      this.balance.outcome += transaction.value;
      this.balance.total -= transaction.value;
    } else {
      this.balance.income += transaction.value;
      this.balance.total += transaction.value;
    }

    const newTransaction = new Transaction(transaction);
    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
