import { ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-[#001a24] text-gray-300">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Home
        </a>

        <div className="bg-[#002E3C]/50 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/20">
          <h1 className="text-4xl font-bold text-white mb-2">Cookie Policy</h1>
          <p className="text-gray-400 mb-8">Last Updated: October 23, 2025</p>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">1. What Are Cookies</h2>
              <p className="text-gray-300 leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners. Cookies help us improve your browsing experience by remembering your preferences and understanding how you use our site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">2. How We Use Cookies</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                Olatus uses cookies for several purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>To enable certain functions of our website</li>
                <li>To provide analytics and understand how visitors use our site</li>
                <li>To store your preferences and settings</li>
                <li>To deliver relevant content and advertisements</li>
                <li>To improve our website performance and user experience</li>
                <li>To remember your login details (if applicable)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">3. Types of Cookies We Use</h2>
              
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Essential Cookies</h3>
                  <p className="text-gray-300 leading-relaxed">
                    These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Analytical/Performance Cookies</h3>
                  <p className="text-gray-300 leading-relaxed">
                    These cookies allow us to recognize and count the number of visitors and see how visitors move around our website. This helps us improve the way our website works by ensuring users find what they are looking for easily.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Functionality Cookies</h3>
                  <p className="text-gray-300 leading-relaxed">
                    These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Targeting/Advertising Cookies</h3>
                  <p className="text-gray-300 leading-relaxed">
                    These cookies may be set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant advertisements on other sites.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">4. Third-Party Cookies</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                We may use third-party services that also use cookies. These include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Google Analytics for website analytics</li>
                <li>Social media platforms for content sharing</li>
                <li>Payment processors for secure transactions</li>
                <li>Marketing and advertising partners</li>
                <li>Customer support tools and chatbots</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-3">
                These third parties have their own privacy and cookie policies which we encourage you to review.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">5. How to Control Cookies</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                You have the right to decide whether to accept or reject cookies. You can control and/or delete cookies as you wish through your browser settings. You can:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Delete all cookies that are already on your device</li>
                <li>Set your browser to prevent cookies from being placed</li>
                <li>Accept cookies from specific sites while blocking others</li>
                <li>Clear cookies each time you close your browser</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-3">
                Please note that if you delete or refuse cookies, some parts of our website may not function properly, and your user experience may be affected.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">6. Browser-Specific Instructions</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                For more information on how to manage cookies in popular browsers:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Google Chrome: Settings → Privacy and Security → Cookies</li>
                <li>Mozilla Firefox: Options → Privacy & Security → Cookies</li>
                <li>Safari: Preferences → Privacy → Cookies</li>
                <li>Microsoft Edge: Settings → Privacy & Security → Cookies</li>
                <li>Opera: Settings → Advanced → Privacy & Security → Cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">7. Cookie Duration</h2>
              <p className="text-gray-300 leading-relaxed">
                Cookies can be either "session" cookies or "persistent" cookies. Session cookies are temporary and expire when you close your browser. Persistent cookies remain on your device for a set period or until you delete them. The duration varies depending on the purpose of the cookie.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">8. Updates to This Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. We will post any changes on this page with an updated revision date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">9. More Information</h2>
              <p className="text-gray-300 leading-relaxed">
                For more information about cookies and online privacy, you can visit:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mt-3">
                <li>All About Cookies: <a href="https://www.allaboutcookies.org" className="text-cyan-400 hover:text-cyan-300" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a></li>
                <li>Your Online Choices: <a href="https://www.youronlinechoices.com" className="text-cyan-400 hover:text-cyan-300" target="_blank" rel="noopener noreferrer">www.youronlinechoices.com</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">10. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about our use of cookies, please contact us at:
              </p>
              <div className="mt-3 text-gray-300">
                <p>Email: <a href="mailto:privacy@olatus.com" className="text-cyan-400 hover:text-cyan-300">privacy@olatus.com</a></p>
                <p>Website: <a href="https://olatus.com" className="text-cyan-400 hover:text-cyan-300">www.olatus.com</a></p>
                <p>Address: Olatus, India</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
