import React from 'react';
import { Brain, Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer
      data-section="footer"
      className="bg-gray-950 text-gray-400"

    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-indigo-400" />
              <span className="text-2xl font-bold text-white">HRXpert</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Revolutionizing recruitment with AI-powered automation and intelligent workflows.
              Helping companies hire better, faster, and smarter.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Integrations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">API</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Security</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/aboutus" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Blog</a></li>
              {/* <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Press</a></li> */}
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Partners</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span className="text-gray-400">hrxpert.ai@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span className="text-gray-400">Islamabad, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 HRXpert. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
