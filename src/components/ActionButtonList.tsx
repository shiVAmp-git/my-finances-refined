
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  PieChart, 
  ListFilter, 
  Download, 
  Settings,
  TrendingUp,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const ActionButtonList = () => {
  const handleExportData = () => {
    try {
      const transactions = localStorage.getItem('transactions');
      if (!transactions) {
        toast({
          title: "No data to export",
          description: "You don't have any transactions to export yet.",
          variant: "destructive",
        });
        return;
      }

      // Create a blob with the transactions data
      const blob = new Blob([transactions], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create a download link and click it
      const a = document.createElement('a');
      a.href = url;
      a.download = `finance-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export successful",
        description: "Your transactions have been exported to a JSON file.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your data.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700">
            <Plus size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white shadow-lg rounded-lg p-2 w-56">
          <DropdownMenuItem className="cursor-pointer px-4 py-3 hover:bg-slate-100 rounded-md">
            <Link to="/add-transaction" className="flex items-center gap-3 w-full">
              <Plus className="h-5 w-5 text-green-500" />
              <span>Add Transaction</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer px-4 py-3 hover:bg-slate-100 rounded-md">
            <div className="flex items-center gap-3 w-full" onClick={handleExportData}>
              <Download className="h-5 w-5 text-blue-500" />
              <span>Export Data</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer px-4 py-3 hover:bg-slate-100 rounded-md" disabled>
            <div className="flex items-center gap-3 w-full opacity-60">
              <PieChart className="h-5 w-5 text-purple-500" />
              <span>View Reports</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer px-4 py-3 hover:bg-slate-100 rounded-md" disabled>
            <div className="flex items-center gap-3 w-full opacity-60">
              <ListFilter className="h-5 w-5 text-orange-500" />
              <span>Filter Transactions</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer px-4 py-3 hover:bg-slate-100 rounded-md" disabled>
            <div className="flex items-center gap-3 w-full opacity-60">
              <TrendingUp className="h-5 w-5 text-red-500" />
              <span>Budget Planning</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer px-4 py-3 hover:bg-slate-100 rounded-md" disabled>
            <div className="flex items-center gap-3 w-full opacity-60">
              <Settings className="h-5 w-5 text-gray-500" />
              <span>Settings</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ActionButtonList;
