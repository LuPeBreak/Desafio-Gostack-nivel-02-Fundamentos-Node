import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const transaction = {
      title,
      value,
      type,
    };

    if (transaction.type === 'outcome') {
      const totalBalance = this.transactionsRepository.getBalance().total;
      if (totalBalance < transaction.value) {
        throw Error('The value exceeds account value');
      }
    }
    const newTransaction = this.transactionsRepository.create(transaction);

    return newTransaction;
  }
}

export default CreateTransactionService;
