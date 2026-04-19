"use client";
import React, { useState } from 'react';
import { Sparkles, Brain, Zap, Users, Timer, Handshake, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const companySizes = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1000+',
];

function parseStringToPair(input: string): [number, number | null] {

  const index = input.indexOf('-');
  if (index > 0) {
    const first = Number(input.slice(0, index));
    const second = Number(input.slice(index + 1, input.length));
    return [first, second]
  }
  return [Number(input.slice(0, input.length - 1)), null]
}

const Signup: React.FC = () => {
  const initialFormState = {
    name: '',
    CompanyName: '',
    Username: '',
    Domain: '',
    companySize: '',
    companyLinkedIn: '',
    Email: '',
    password: '',
    confirmPassword: '',
  };
  const [form, setForm] = useState(initialFormState);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [role, setRole] = useState<'admin-recruiter' | 'candidate'>('admin-recruiter');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [backendError, setBackendError] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  
  // Simple password strength checker
  const checkPasswordStrength = (pwd: string) => {
    if (pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) {
      return 'Strong';
    } else if (pwd.length >= 6) {
      return 'Medium';
    } else {
      return 'Weak';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === 'password') setPasswordStrength(checkPasswordStrength(value));
  };

 
  const validate = () => {
    const errs: any = {};
    // Common fields
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.Username.trim()) errs.Username = 'Username is required';
    if (!form.Email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.Email)) errs.Email = 'Valid email required';
    if (!form.password || form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password';
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    // Employer-specific fields
    if (role === 'admin-recruiter') {
      if (!form.CompanyName.trim()) errs.CompanyName = 'Company Name is required';
      if (!form.Domain.trim() || !/^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(form.Domain)) errs.Domain = 'Valid domain required (e.g. example.com)';
      if (!form.companySize) errs.companySize = 'Select company size';
      if (!form.companyLinkedIn.trim() || !/^https:\/\/(www\.)?linkedin\.com\/.+/.test(form.companyLinkedIn)) errs.companyLinkedIn = 'Valid LinkedIn URL required';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBackendError('');
    setSuccessMsg('');
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    console.log("--------------------------------------------");
  };

  // When role changes, reset the form and errors
  const handleRoleChange = (newRole: 'admin-recruiter' | 'candidate') => {
    setRole(newRole);
    setForm(initialFormState);
    setErrors({});
    setBackendError('');
    setSuccessMsg('');
    setPasswordStrength('');
    setShowPasswords(false);
  };

  const employerFeatures = [
    { icon: Zap, title: 'AI-Powered Matching' },
    { icon: Timer, title: '75% Faster Hiring Process' },
    { icon: Handshake, title: 'Collaborative Hiring Tools' },
  ];
  const candidateFeatures = [
    { icon: Users, title: 'Personalized Job Matches' },
    { icon: Brain, title: 'AI Resume Insights' },
    { icon: Sparkles, title: 'Direct Access to Top Employers' },
  ];
  const employerHeadline = 'Transform the Way You Recruit';
  const employerSubheadline = 'Smarter hiring starts here — powered by AI automation, insights, and candidate experience.';
  const candidateHeadline = 'Land Your Dream Job Faster';
  const candidateSubheadline = 'Let AI match you to the best roles, showcase your skills, and connect with top companies.';

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-black via-indigo-900 to-gray-900">
      {/* Back navigation arrow - positioned at top-left */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="inline-flex items-center text-indigo-400 hover:text-white transition-colors duration-200">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>
      
      {/* Left Side: Headline, subheadline, features */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 md:py-0 text-white">
        <div className="max-w-lg mx-auto md:mx-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">{role === 'admin-recruiter' ? employerHeadline : candidateHeadline}</h1>
          <p className="text-lg md:text-xl text-indigo-200 mb-10">{role === 'admin-recruiter' ? employerSubheadline : candidateSubheadline}</p>
          <div className="flex flex-col gap-6 mb-10">
            {(role === 'admin-recruiter' ? employerFeatures : candidateFeatures).map(({ icon: Icon, title }) => (
              <div key={title} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-900 rounded-xl flex items-center justify-center shadow shadow-indigo-500/20">
                  <Icon className="w-6 h-6 text-indigo-400" />
                </div>
                <span className="text-lg font-semibold text-white">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right Side: Signup Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-12 md:py-0">
        <div className="w-full max-w-md bg-gray-900/90 border border-gray-800 rounded-2xl shadow-xl p-8 sm:p-10 relative">
          {/* Role toggle */}
          <div className="flex justify-center gap-2 mb-8">
            <button
              type="button"
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${role === 'admin-recruiter' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/30' : 'bg-gray-800 text-indigo-300 border-gray-700 hover:bg-indigo-700 hover:text-white'}`}
              onClick={() => handleRoleChange('admin-recruiter')}
            >
              Employer
            </button>
            <button
              type="button"
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${role === 'candidate' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/30' : 'bg-gray-800 text-indigo-300 border-gray-700 hover:bg-indigo-700 hover:text-white'}`}
              onClick={() => handleRoleChange('candidate')}
            >
              Candidate
            </button>
          </div>
          {/* Logo */}
          <div className="flex flex-col items-center mb-6 mt-4">
            <span className="text-3xl font-bold text-indigo-400 tracking-tight mb-1">HRXpert</span>
            <Sparkles className="w-5 h-5 text-indigo-300" />
          </div>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="block text-sm font-medium text-indigo-200 mb-1">Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.name ? 'border-red-400' : 'border-gray-700'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`} />
              {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium text-indigo-200 mb-1"> Username</label>
              <input name="Username" value={form.Username} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.Username ? 'border-red-400' : 'border-gray-700'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`} />
              {errors.Username && <div className="text-red-500 text-xs mt-1">{errors.Username}</div>}
            </div>
            {role === 'admin-recruiter' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-1">Company Name</label>
                  <input name="CompanyName" value={form.CompanyName} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.CompanyName ? 'border-red-400' : 'border-gray-700'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`} />
                  {errors.CompanyName && <div className="text-red-500 text-xs mt-1">{errors.CompanyName}</div>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-1">DomainURL</label>
                  <input name="Domain" value={form.Domain} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.Domain ? 'border-red-400' : 'border-gray-700'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`} />
                  {errors.Domain && <div className="text-red-500 text-xs mt-1">{errors.Domain}</div>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-1">Company Size</label>
                  <select name="companySize" value={form.companySize} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.companySize ? 'border-red-400' : 'border-gray-700'} text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}>
                    <option value="">Select size</option>
                    {companySizes.map(size => <option key={size} value={size}>{size}</option>)}
                  </select>
                  {errors.companySize && <div className="text-red-500 text-xs mt-1">{errors.companySize}</div>}
                </div>
              </>
            )}
            {/* LinkedIn URL: Only for employer */}
            {role === 'admin-recruiter' && (
              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-1">Company LinkedIn URL</label>
                <input name="companyLinkedIn" value={form.companyLinkedIn} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.companyLinkedIn ? 'border-red-400' : 'border-gray-700'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`} />
                {errors.companyLinkedIn && <div className="text-red-500 text-xs mt-1">{errors.companyLinkedIn}</div>}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-indigo-200 mb-1">Email</label>
              <div className="relative flex items-center">
                <input name="Email" value={form.Email} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.Email ? 'border-red-400' : 'border-gray-700'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`} />
              </div>
              {errors.Email && <div className="text-red-500 text-xs mt-1">{errors.Email}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium text-indigo-200 mb-1">Password</label>
              <input name="password" type={showPasswords ? 'text' : 'password'} value={form.password} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.password ? 'border-red-400' : 'border-gray-700'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`} />
              <div className="flex items-center gap-2 mt-1">
                <div className={`text-xs font-semibold ${passwordStrength === 'Strong' ? 'text-green-400' : passwordStrength === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{passwordStrength} </div>
                {form.password && <span className="text-gray-400 text-xs">Password strength</span>}
              </div>
              {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium text-indigo-200 mb-1">Confirm Password</label>
              <input name="confirmPassword" type={showPasswords ? 'text' : 'password'} value={form.confirmPassword} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.confirmPassword ? 'border-red-400' : 'border-gray-700'} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`} />
              {errors.confirmPassword && <div className="text-red-500 text-xs mt-1">{errors.confirmPassword}</div>}
            </div>
            <div className="flex items-center mb-2">
              <input id="showPasswords" type="checkbox" checked={showPasswords} onChange={e => setShowPasswords(e.target.checked)} className="mr-2 accent-indigo-500" />
              <label htmlFor="showPasswords" className="text-sm text-indigo-200 select-none cursor-pointer">Show Passwords</label>
            </div>
            <div className="text-xs text-gray-400 mt-2 mb-2">
              By signing up, you agree to our{' '}
              <a href="#" className="text-indigo-400 hover:underline">Privacy Policy</a> and{' '}
              <a href="#" className="text-indigo-400 hover:underline">Terms of Use</a>.
            </div>
            {backendError && <div className="text-red-500 text-sm mb-2">{backendError}</div>}
            {successMsg && <div className="text-green-400 text-sm mb-2">{successMsg}</div>}
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-700" />
              <span className="mx-4 text-gray-400 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-700" />
            </div>
            <button type="button" 
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-900 font-semibold py-3 rounded-lg shadow hover:bg-gray-100 transition-all duration-200 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => {  }}
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48" aria-hidden="true"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.86-6.86C36.68 2.7 30.77 0 24 0 14.82 0 6.73 5.82 2.69 14.09l7.99 6.21C12.13 13.13 17.56 9.5 24 9.5z" /><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.03l7.18 5.59C43.98 37.13 46.1 31.36 46.1 24.55z" /><path fill="#FBBC05" d="M10.68 28.3c-1.01-2.99-1.01-6.21 0-9.2l-7.99-6.21C.64 17.18 0 20.5 0 24s.64 6.82 2.69 11.11l7.99-6.21z" /><path fill="#EA4335" d="M24 48c6.77 0 12.48-2.24 16.64-6.09l-7.18-5.59c-2.01 1.35-4.59 2.16-7.46 2.16-6.44 0-11.87-3.63-14.32-8.81l-7.99 6.21C6.73 42.18 14.82 48 24 48z" /></g></svg>
              Continue with Google

            </button>
          </form>
          <div className="mt-6 text-center text-indigo-200 text-sm">
            Already have an account?{' '}
            <Link href="/signin" className="text-indigo-400 hover:underline font-medium">Sign In</Link>
          </div>
          {/* AI insight caption */}
          <div className="mt-4 text-center text-indigo-400 text-xs flex items-center justify-center gap-2">
            <Brain className="w-4 h-4" />
            Let HRXpert automatically match top candidates to your roles.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup; 