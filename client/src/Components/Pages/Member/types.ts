import { Member } from '../Members';

export interface Transaction {
    transaction_for_month: string;
    transaction_amount: number;
    transaction_type: string;
    current_remaining_loan: number;
    created_at: string;
}

export interface ExtendedMember extends Member {
    loan_transactions: Transaction[];
    saving_transactions: Transaction[];
}

export { Member };
