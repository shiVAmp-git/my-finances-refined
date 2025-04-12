
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, LogIn } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const NotFound = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-50">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="w-full sm:w-auto flex items-center gap-2">
              <Home size={16} />
              Return to Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto flex items-center gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={16} />
            Go Back
          </Button>
          <Link to="/login">
            <Button 
              variant="secondary" 
              className="w-full sm:w-auto flex items-center gap-2"
            >
              <LogIn size={16} />
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
