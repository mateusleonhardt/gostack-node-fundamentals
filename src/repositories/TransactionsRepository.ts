import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (incomeAccumulator, transaction) => {
        return transaction.type === 'income'
          ? incomeAccumulator + transaction.value
          : incomeAccumulator;
      },
      0,
    );

    const outcome = this.transactions.reduce(
      (incomeAccumulator, transaction) => {
        return transaction.type === 'outcome'
          ? incomeAccumulator + transaction.value
          : incomeAccumulator;
      },
      0,
    );

    const total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
