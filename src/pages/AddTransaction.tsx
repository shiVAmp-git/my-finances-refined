
import React, { useEffect } from 'react';
import TransactionForm from '@/components/TransactionForm';
import { useNavigate } from 'react-router-dom';

const AddTransaction = () => {
  const navigate = useNavigate();

  // Get existing transactions from localStorage
  const getTransactions = () => {
    const transactions = localStorage.getItem('transactions');
    return transactions ? JSON.parse(transactions) : [];
  };

  // Save transactions to localStorage
  const saveTransactions = (transactions: any[]) => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  };

  const handleAddTransaction = (newTransaction: any) => {
    const transactions = getTransactions();
    saveTransactions([...transactions, newTransaction]);
    
    // Navigate to dashboard instead of index page
    navigate('/dashboard');
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center mb-8">Add Transaction</h1>
        <TransactionForm onSubmit={handleAddTransaction} />
      </div>
    </div>
  );
};

export default AddTransaction;
