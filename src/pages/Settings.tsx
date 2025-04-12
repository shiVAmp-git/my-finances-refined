
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, User } from "lucide-react";
import { Link } from 'react-router-dom';
import ActionButtonList from '@/components/ActionButtonList';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import NavBar from '@/components/NavBar';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <header className="flex items-center mb-8">
          <Link to="/" className="mr-4">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Settings</h1>
        </header>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/avatar-placeholder.png" alt="User" />
                  <AvatarFallback className="text-xl">
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center md:text-left">
                  <h3 className="text-xl font-bold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                  <Button size="sm" variant="outline" className="mt-2">Change Avatar</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Personalize your finance tracker experience.</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">Currency</h3>
                    <p className="text-sm text-muted-foreground">Set your preferred currency</p>
                  </div>
                  <Button variant="outline" disabled>USD ($)</Button>
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">Dark Mode</h3>
                    <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
                  </div>
                  <Button variant="outline" disabled>Coming Soon</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Data Export</h3>
                    <p className="text-sm text-muted-foreground">Export all your financial data</p>
                  </div>
                  <Link to="/">
                    <Button>Export Data</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <ActionButtonList />
      </div>
    </div>
  );
};

export default Settings;
