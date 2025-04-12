
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from 'react-router-dom';
import ActionButtonList from '@/components/ActionButtonList';

const templates = [
  {
    id: 'default',
    name: 'Default',
    description: 'The default finance tracker layout with cards and charts.'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'A simplified view focusing on recent transactions only.'
  },
  {
    id: 'detailed',
    name: 'Detailed',
    description: 'An expanded view with more detailed charts and categories.'
  }
];

const Settings = () => {
  const [activeTemplate, setActiveTemplate] = useState(() => {
    const saved = localStorage.getItem('activeTemplate');
    return saved || 'default';
  });

  const handleTemplateChange = (templateId: string) => {
    setActiveTemplate(templateId);
    localStorage.setItem('activeTemplate', templateId);
    toast({
      title: "Template changed",
      description: `You are now using the ${templates.find(t => t.id === templateId)?.name} template.`,
    });
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <header className="flex items-center mb-8">
        <Link to="/" className="mr-4">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Settings</h1>
      </header>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Choose Template</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={activeTemplate} 
            onValueChange={handleTemplateChange}
            className="space-y-4"
          >
            {templates.map(template => (
              <div key={template.id} className="flex items-start space-x-2">
                <RadioGroupItem value={template.id} id={template.id} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={template.id} className="flex items-center text-base font-medium">
                    {template.name}
                    {activeTemplate === template.id && (
                      <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                    )}
                  </Label>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
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
      
      <ActionButtonList />
    </div>
  );
};

export default Settings;
