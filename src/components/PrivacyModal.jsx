export const PrivacyModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Privacy Policy</h2>
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
                <p className="text-gray-600">PoleSwapper is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3">1. Information We Collect</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>Personal Information: When you create an account, we may collect personal details such as your name, email address, and payment information.</li>
                  <li>Usage Data: Information about how you interact with our platform, including IP addresses, device information, and browsing behavior.</li>
                  <li>Listings and Transactions: Information you provide while creating listings, making purchases, or participating in platform activities.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">2. How We Use Your Information</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>To facilitate user transactions on the platform.</li>
                  <li>To improve platform security and user experience.</li>
                  <li>To send service-related communications, updates, and promotions (with your consent).</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">3. Sharing and Disclosure</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>We do not sell or rent your personal information to third parties.</li>
                  <li>We may share personal data with third-party service providers (e.g., payment processors) only to the extent necessary for completing transactions.</li>
                  <li>Information may also be disclosed when required by law or to protect the integrity of the platform.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">4. Cookies and Tracking</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>We use cookies to enhance site functionality, personalize user experiences, and track usage statistics.</li>
                  <li>You can manage cookie preferences through your browser settings.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">5. Third-Party Services</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>Payments and transactions may be handled by third-party service providers.</li>
                  <li>PoleSwapper is not responsible for the privacy practices or data handling of these third-party services.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">6. Security Measures</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>We implement reasonable security measures to protect user data.</li>
                  <li>However, no online platform can guarantee complete security, and you use our services at your own risk.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">7. Your Rights</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>You have the right to access, modify, or delete your personal information.</li>
                  <li>To exercise these rights or request data deletion, please contact us at poleswapper@gmail.com.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">8. Limitation of Liability</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>PoleSwapper is not liable for any financial losses, data breaches, scams, or disputes between users.</li>
                  <li>Users interact on the platform at their own risk.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">9. Changes to This Policy</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>We reserve the right to modify this Privacy Policy at any time. Continued use of the platform constitutes acceptance of the revised policy.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default PrivacyModal