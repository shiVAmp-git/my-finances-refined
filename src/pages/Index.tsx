import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line, CartesianGrid, AreaChart, Area 
} from 'recharts';
import { 
  Plus, CreditCard, ArrowDownCircle, ArrowUpCircle, 
  DollarSign, BarChart as BarChartIcon, PieChart as PieChartIcon,
  LineChart as LineChartIcon, TrendingUp 
} from "lucide-react";
import ActionButtonList from '@/components/ActionButtonList';
import NavBar from '@/components/NavBar';
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

const Index = () => {
  const [searchParams] = useSearchParams();
  const urlTemplate = searchParams.get('template');
  
  // Get template from URL or localStorage
  const [activeTemplate, setActiveTemplate] = useState(() => {
    if (urlTemplate) {
      localStorage.setItem('activeTemplate', urlTemplate);
      return urlTemplate;
    }
    return localStorage.getItem('activeTemplate') || 'default';
  });
  
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Update activeTemplate if URL parameter changes
    if (urlTemplate) {
      setActiveTemplate(urlTemplate);
      localStorage.setItem('activeTemplate', urlTemplate);
    }
  }, [urlTemplate]);

  useEffect(() => {
    // Load transactions from localStorage
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      const parsedTransactions = JSON.parse(savedTransactions);
      setTransactions(parsedTransactions);
    }
  }, []);

  useEffect(() => {
    // Calculate totals
    let expenseTotal = 0;
    let incomeTotal = 0;

    transactions.forEach(transaction => {
      if (transaction.type === 'expense') {
        expenseTotal += transaction.amount;
      } else {
        incomeTotal += transaction.amount;
      }
    });

    setTotalExpense(expenseTotal);
    setTotalIncome(incomeTotal);
    setCurrentBalance(incomeTotal - expenseTotal);
  }, [transactions]);

  // Generate data for pie chart - expense categories
  const getExpenseCategoryData = () => {
    const categoryTotals: Record<string, number> = {};
    
    transactions
      .filter(t => t.type === 'expense')
      .forEach(transaction => {
        const { category, amount } = transaction;
        if (categoryTotals[category]) {
          categoryTotals[category] += amount;
        } else {
          categoryTotals[category] = amount;
        }
      });
    
    return Object.keys(categoryTotals).map(category => ({
      name: category,
      value: categoryTotals[category]
    }));
  };

  // Generate monthly data for line and bar charts
  const getMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    
    return months.slice(0, currentMonth + 1).map((month, index) => {
      // Filter transactions for the specific month
      const monthTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === index;
      });
      
      // Calculate income and expense for the month
      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
        
      const expense = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
        
      return {
        name: month,
        income: income,
        expense: expense,
        balance: income - expense
      };
    });
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

  // Different layouts based on template
  const renderTemplate = () => {
    switch (activeTemplate) {
      case 'minimal':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">${currentBalance.toFixed(2)}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center p-2 border-b">
                      <div>
                        <p className="font-medium">{transaction.category}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={`font-bold ${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                        {transaction.type === 'expense' ? '-' : '+'}${transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                  
                  {transactions.length === 0 && (
                    <div className="text-center text-gray-500 py-4">
                      No transactions yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      case 'detailed':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-2xl font-bold">${currentBalance.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Income</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <ArrowUpCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-2xl font-bold text-green-500">${totalIncome.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <ArrowDownCircle className="mr-2 h-4 w-4 text-red-500" />
                    <span className="text-2xl font-bold text-red-500">${totalExpense.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Expense by Category</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                {getExpenseCategoryData().length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getExpenseCategoryData()}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {getExpenseCategoryData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}`} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    No expense data available
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      {transactions.map((transaction) => (
                        <div 
                          key={transaction.id} 
                          className="flex justify-between items-center p-3 rounded-lg border hover:bg-slate-50"
                        >
                          <div className="flex items-center">
                            <div className={`p-2 rounded-full mr-3 ${
                              transaction.type === 'expense' ? 'bg-red-100' : 'bg-green-100'
                            }`}>
                              <CreditCard className={`h-5 w-5 ${
                                transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'
                              }`} />
                            </div>
                            <div>
                              <p className="font-medium">{transaction.category}</p>
                              <p className="text-sm text-gray-500">
                                {transaction.description ? transaction.description : 'No description'}
                              </p>
                              <p className="text-xs text-gray-400">
                                {new Date(transaction.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className={`font-bold ${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                            {transaction.type === 'expense' ? '-' : '+'}${transaction.amount.toFixed(2)}
                          </div>
                        </div>
                      ))}
                      
                      {transactions.length === 0 && (
                        <div className="text-center text-gray-500 py-8">
                          No transactions yet
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="income" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      {transactions.filter(t => t.type === 'income').map((transaction) => (
                        <div 
                          key={transaction.id} 
                          className="flex justify-between items-center p-3 rounded-lg border hover:bg-slate-50"
                        >
                          <div className="flex items-center">
                            <div className="p-2 rounded-full mr-3 bg-green-100">
                              <CreditCard className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                              <p className="font-medium">{transaction.category}</p>
                              <p className="text-sm text-gray-500">
                                {transaction.description ? transaction.description : 'No description'}
                              </p>
                              <p className="text-xs text-gray-400">
                                {new Date(transaction.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="font-bold text-green-500">
                            +${transaction.amount.toFixed(2)}
                          </div>
                        </div>
                      ))}
                      
                      {transactions.filter(t => t.type === 'income').length === 0 && (
                        <div className="text-center text-gray-500 py-8">
                          No income transactions yet
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="expenses" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      {transactions.filter(t => t.type === 'expense').map((transaction) => (
                        <div 
                          key={transaction.id} 
                          className="flex justify-between items-center p-3 rounded-lg border hover:bg-slate-50"
                        >
                          <div className="flex items-center">
                            <div className="p-2 rounded-full mr-3 bg-red-100">
                              <CreditCard className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <p className="font-medium">{transaction.category}</p>
                              <p className="text-sm text-gray-500">
                                {transaction.description ? transaction.description : 'No description'}
                              </p>
                              <p className="text-xs text-gray-400">
                                {new Date(transaction.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="font-bold text-red-500">
                            -${transaction.amount.toFixed(2)}
                          </div>
                        </div>
                      ))}
                      
                      {transactions.filter(t => t.type === 'expense').length === 0 && (
                        <div className="text-center text-gray-500 py-8">
                          No expense transactions yet
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        );
      
      default: // Default template
        
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">${currentBalance.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ArrowUpCircle className="mr-2 h-4 w-4 text-green-500" />
                <span className="text-2xl font-bold text-green-500">${totalIncome.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ArrowDownCircle className="mr-2 h-4 w-4 text-red-500" />
                <span className="text-2xl font-bold text-red-500">${totalExpense.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="py-4">
            <Tabs defaultValue="charts">
              <TabsList className="mb-4">
                <TabsTrigger value="charts" className="flex items-center">
                  <BarChartIcon className="h-4 w-4 mr-2" />
                  Charts
                </TabsTrigger>
                <TabsTrigger value="recent" className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Recent
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="charts">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <PieChartIcon className="h-5 w-5 mr-2" />
                        Expense by Category
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      {getExpenseCategoryData().length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={getExpenseCategoryData()}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {getExpenseCategoryData().map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `$${value}`} />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-500">
                          No expense data available
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChartIcon className="h-5 w-5 mr-2" />
                        Monthly Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      {getMonthlyData().length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={getMonthlyData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => `$${value}`} />
                            <Legend />
                            <Bar dataKey="income" fill="#4ade80" name="Income" />
                            <Bar dataKey="expense" fill="#f87171" name="Expense" />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-500">
                          No monthly data available
                        </div>
                      )}
                    </CardContent>
                  </Card>
                
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <LineChartIcon className="h-5 w-5 mr-2" />
                        Balance Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      {getMonthlyData().length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={getMonthlyData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => `$${value}`} />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="balance" 
                              stroke="#8884d8" 
                              activeDot={{ r: 8 }} 
                              name="Balance"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-500">
                          No trend data available
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Income & Expense Area
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      {getMonthlyData().length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={getMonthlyData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => `$${value}`} />
                            <Legend />
                            <Area 
                              type="monotone" 
                              dataKey="income" 
                              stackId="1" 
                              stroke="#4ade80" 
                              fill="#4ade80" 
                              fillOpacity={0.6}
                              name="Income"
                            />
                            <Area 
                              type="monotone" 
                              dataKey="expense" 
                              stackId="2" 
                              stroke="#f87171" 
                              fill="#f87171" 
                              fillOpacity={0.6}
                              name="Expense"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-500">
                          No area chart data available
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="recent">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactions.slice(0, 5).map((transaction) => (
                        <div key={transaction.id} className="flex justify-between items-center p-2 border-b">
                          <div>
                            <p className="font-medium">{transaction.category}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className={`font-bold ${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                            {transaction.type === 'expense' ? '-' : '+'}${transaction.amount.toFixed(2)}
                          </div>
                        </div>
                      ))}
                      
                      {transactions.length === 0 && (
                        <div className="text-center text-gray-500 py-4">
                          No transactions yet
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>
          
          <TabsContent value="transactions" className="py-4">
            <Card>
              <CardHeader>
                <CardTitle>All Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                      <div 
                        key={transaction.id} 
                        className="flex justify-between items-center p-3 rounded-lg border hover:bg-slate-50"
                      >
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full mr-3 ${
                            transaction.type === 'expense' ? 'bg-red-100' : 'bg-green-100'
                          }`}>
                            <CreditCard className={`h-5 w-5 ${
                              transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium">{transaction.category}</p>
                            <p className="text-sm text-gray-500">
                              {transaction.description ? transaction.description : 'No description'}
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className={`font-bold ${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                          {transaction.type === 'expense' ? '-' : '+'}${transaction.amount.toFixed(2)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      No transactions yet. Click "Add Transaction" to get started.
                    </div>
                  )}
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="container max-w-4xl mx-auto pb-8 px-4">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Finance Tracker</h1>
          <Link to="/add-transaction">
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus size={18} />
              <span>Add Transaction</span>
            </Button>
          </Link>
        </header>

        {renderTemplate()}

        {/* Add the ActionButtonList component */}
        <ActionButtonList />
      </div>
    </div>
  );
};

export default Index;
