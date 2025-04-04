'use client';

import { AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

export function ApiKeySetupGuide() {
  return (
    <div className="max-w-4xl mx-auto bg-gray-900/50 border border-gray-800 rounded-lg p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle className="h-6 w-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-white">API Key Setup Required</h2>
      </div>
      
      <p className="text-gray-300 mb-6">
        This application requires a Stability AI API key to generate images. Follow these steps to set up your environment:
      </p>
      
      <div className="space-y-6">
        <SetupStep 
          number={1}
          title="Create a Stability AI account"
          description="Sign up for Stability AI at DreamStudio to get access to the API."
          link="https://beta.dreamstudio.ai/membership?tab=apiKeys"
          linkText="Sign up for DreamStudio"
          isDone={false}
        />
        
        <SetupStep 
          number={2}
          title="Get your API key"
          description="After creating an account, generate an API key from your DreamStudio dashboard."
          link="https://beta.dreamstudio.ai/membership?tab=apiKeys"
          linkText="Get API key"
          isDone={false}
        />
        
        <SetupStep 
          number={3}
          title="Set up environment variables"
          description="Create a .env.local file in the root of your project with the following content:"
          code="STABILITY_API_KEY=your_api_key_here"
          isDone={false}
        />
        
        <SetupStep 
          number={4}
          title="For production deployment"
          description="When deploying to Vercel or another hosting provider, add the STABILITY_API_KEY as an environment variable in your project settings."
          link="https://vercel.com/docs/concepts/projects/environment-variables"
          linkText="Learn more about Vercel environment variables"
          isDone={false}
        />
      </div>
      
      <div className="mt-8 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
        <p className="text-blue-300">
          <strong>Note:</strong> Stability AI provides limited free credits for new accounts. After using the free credits, you&apos;ll need to purchase additional credits to continue using the API.
        </p>
      </div>
    </div>
  );
}

type SetupStepProps = {
  number: number;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
  code?: string;
  isDone: boolean;
};

function SetupStep({ number, title, description, link, linkText, code, isDone }: SetupStepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
        {isDone ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <span className="text-gray-300 font-medium">{number}</span>
        )}
      </div>
      
      <div className="flex-1">
        <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
        <p className="text-gray-400 mb-2">{description}</p>
        
        {code && (
          <div className="bg-gray-950 rounded p-3 mb-3 font-mono text-sm text-gray-300 border border-gray-800">
            {code}
          </div>
        )}
        
        {link && linkText && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm"
          >
            {linkText}
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
} 