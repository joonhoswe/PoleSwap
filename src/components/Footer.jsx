import { useState } from 'react';
import TermsModal from './TermsModal';
import PrivacyModal from './PrivacyModal';

export const Footer = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <footer className="py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-600">
          <span>© 2025 PoleSwapper. All rights reserved.</span>
          <button 
            onClick={() => setIsTermsOpen(true)}
            className="hover:text-blue-500 transition-colors underline"
          >
            Terms of Service
          </button>
          <button 
            onClick={() => setIsPrivacyOpen(true)}
            className="hover:text-blue-500 transition-colors underline"
          >
            Privacy Policy
          </button>
        </div>
      </div>

      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </footer>
  );
};