
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, Wallet, PieChart, TrendingUp, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="container max-w-6xl mx-auto pt-16 pb-20 px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Smart Personal Finance Tracker
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Take control of your finances with our intuitive tracking and visualization tools.
            Monitor your spending, analyze trends, and reach your financial goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Login <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <Wallet className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Expenses</h3>
                <p className="text-gray-600">
                  Easily record and categorize your expenses and income with a few clicks.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <BarChart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Visualize Data</h3>
                <p className="text-gray-600">
                  Interactive charts and graphs help you understand your spending patterns at a glance.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-3 rounded-full mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                <p className="text-gray-600">
                  Set financial goals and track your progress with intuitive dashboards.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* App Screenshots */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Powerful Dashboard Views</h2>
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
              <div className="flex items-center justify-center h-[300px] bg-gradient-to-r from-gray-300 to-gray-200">
                <PieChart className="h-24 w-24 text-gray-400" />
                <span className="sr-only">App dashboard screenshot</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Finance Tracker?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">User-Friendly Interface</h3>
                <p className="text-gray-600">Clean design that makes finance tracking a breeze, even for beginners.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Multiple Dashboard Views</h3>
                <p className="text-gray-600">Choose from minimal, detailed, or standard views based on your preference.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Interactive Charts</h3>
                <p className="text-gray-600">Visualize your financial data with beautiful and informative charts.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Secure & Private</h3>
                <p className="text-gray-600">Your financial data is stored securely and never shared with third parties.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of users who have improved their financial habits with our tracker.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started for Free
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Login to Your Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Finance Tracker App. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="text-gray-400 hover:text-white mx-2">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white mx-2">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white mx-2">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
