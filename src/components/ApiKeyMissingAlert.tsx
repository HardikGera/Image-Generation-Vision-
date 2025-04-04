'use client';

import { AlertOctagon } from 'lucide-react';

type ApiKeyMissingAlertProps = {
  serviceName: string;
  envVarName: string;
  docsLink?: string;
};

export default function ApiKeyMissingAlert({ 
  serviceName, 
  envVarName, 
  docsLink 
}: ApiKeyMissingAlertProps) {
  return (
    <div className="w-full max-w-3xl mx-auto my-8 p-6 bg-red-900/30 border border-red-800 rounded-lg">
      <div className="flex items-start gap-4">
        <AlertOctagon className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {serviceName} API Key Not Configured
          </h3>
          <p className="text-gray-300 mb-4">
            Your {serviceName} API key is missing. To fix this issue:
          </p>
          
          <div className="bg-gray-900/50 p-4 rounded mb-4">
            <ol className="text-gray-300 list-decimal list-inside space-y-2">
              <li>
                Create a <code className="bg-gray-800 px-1 py-0.5 rounded">.env.local</code> file in the project root
              </li>
              <li>
                Add <code className="bg-gray-800 px-1 py-0.5 rounded">{envVarName}=your_api_key_here</code>
              </li>
              <li>
                Restart the development server
              </li>
              <li>
                If deploying to Vercel, add the environment variable in your project settings
              </li>
            </ol>
          </div>
          
          {docsLink && (
            <p className="text-gray-300">
              <a 
                href={docsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                See the documentation for more information →
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 