export const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Terms of Service</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="prose max-w-none space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Effective Date: January 10, 2025</h3>
              <p className="text-gray-600">Welcome to PoleSwapper. By accessing or using our platform, you agree to comply with these Terms and Conditions. If you do not agree, please do not use our services.</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">1. Platform Overview</h4>
              <ul className="space-y-2 text-gray-600">
                <li>PoleSwapper provides a platform for users to list, buy, and sell items directly with other users.</li>
                <li>We do not own, inspect, or guarantee the quality, legality, or authenticity of the products listed on the platform.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">2. User Responsibilities</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Users are responsible for their listings, product descriptions, and transactions.</li>
                <li>You must provide accurate information when creating an account and using the platform.</li>
                <li>You are responsible for ensuring your listings comply with all applicable laws and regulations.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">3. Limitation of Liability</h4>
              <ul className="space-y-2 text-gray-600">
                <li>PoleSwapper is not responsible for any disputes, damages, losses, scams, fraud, or poor-quality products resulting from transactions between users.</li>
                <li>The platform serves only as a marketplace facilitator and does not participate in transactions or guarantee product condition or seller reliability.</li>
                <li>All transactions are conducted at your own risk. Users are encouraged to verify product quality and seller credibility before completing a transaction.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">4. No Endorsement or Guarantee</h4>
              <ul className="space-y-2 text-gray-600">
                <li>PoleSwapper does not endorse any sellers or products listed on the platform.</li>
                <li>We do not guarantee the performance, durability, or safety of any product sold through the platform.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">5. Account Termination</h4>
              <ul className="space-y-2 text-gray-600">
                <li>We reserve the right to suspend or terminate user accounts for violating these terms, including but not limited to:</li>
                <li>Fraudulent activity</li>
                <li>Misrepresentation of products</li>
                <li>Violation of applicable laws</li>
                <li>Misuse of the platform</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">6. Dispute Resolution</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Users must resolve disputes directly among themselves. PoleSwapper is not involved in dispute mediation or resolution between buyers and sellers.</li>
                <li>If disputes arise, users can seek independent legal assistance or mediation services.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">7. Changes to Terms</h4>
              <ul className="space-y-2 text-gray-600">
                <li>We reserve the right to update these Terms and Conditions at any time. Continued use of the platform after changes indicates your acceptance of the revised terms.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;