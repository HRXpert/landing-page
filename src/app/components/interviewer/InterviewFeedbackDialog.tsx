'use client';

import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Plus, Minus } from 'lucide-react';
import { submitInterviewFeedback, InterviewFeedbackData } from '@/app/api/applications/interview-feedback';

interface InterviewFeedbackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  applicationId: string;
  interviewId: string;
  candidateName: string;
  jobTitle: string;
  interviewType: string;
}

const InterviewFeedbackDialog: React.FC<InterviewFeedbackDialogProps> = ({
  isOpen,
  onClose,
  onSuccess,
  applicationId,
  interviewId,
  candidateName,
  jobTitle,
  interviewType,
}) => {
  const [remarks, setRemarks] = useState('');
  const [recommended, setRecommended] = useState<boolean | null>(null);
  const [strengths, setStrengths] = useState<string[]>(['']);
  const [weaknesses, setWeaknesses] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAddStrength = () => {
    setStrengths([...strengths, '']);
  };

  const handleRemoveStrength = (index: number) => {
    if (strengths.length > 1) {
      setStrengths(strengths.filter((_, i) => i !== index));
    }
  };

  const handleStrengthChange = (index: number, value: string) => {
    const updatedStrengths = [...strengths];
    updatedStrengths[index] = value;
    setStrengths(updatedStrengths);
  };

  const handleAddWeakness = () => {
    setWeaknesses([...weaknesses, '']);
  };

  const handleRemoveWeakness = (index: number) => {
    if (weaknesses.length > 1) {
      setWeaknesses(weaknesses.filter((_, i) => i !== index));
    }
  };

  const handleWeaknessChange = (index: number, value: string) => {
    const updatedWeaknesses = [...weaknesses];
    updatedWeaknesses[index] = value;
    setWeaknesses(updatedWeaknesses);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!remarks.trim()) {
      setSubmitError('Please provide remarks');
      return;
    }

    if (recommended === null) {
      setSubmitError('Please select whether you recommend the candidate');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const feedbackData: InterviewFeedbackData = {
        applicationId,
        interviewId,
        remarks: remarks.trim(),
        recommended,
        strengths: strengths.filter(s => s.trim() !== ''),
        weaknesses: weaknesses.filter(w => w.trim() !== ''),
      };

      await submitInterviewFeedback(feedbackData);
      setSubmitSuccess(true);

      // Close dialog after success message
      setTimeout(() => {
        handleClose();
        if (onSuccess) {
          onSuccess();
        }
      }, 1500);
    } catch (error: any) {
      console.error('Error submitting feedback:', error);
      setSubmitError(error?.response?.data?.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setRemarks('');
      setRecommended(null);
      setStrengths(['']);
      setWeaknesses(['']);
      setSubmitError(null);
      setSubmitSuccess(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Interview Feedback</h2>
            <p className="text-gray-400 text-sm mt-1">
              {candidateName} - {jobTitle} ({interviewType})
            </p>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mx-6 mt-6 bg-green-500/20 border border-green-500/50 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-green-400">Feedback submitted successfully!</p>
          </div>
        )}

        {/* Error Message */}
        {submitError && (
          <div className="mx-6 mt-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-400">{submitError}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Recommendation */}
          <div>
            <label className="block text-white font-medium mb-3">
              Do you recommend this candidate? <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setRecommended(true)}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  recommended === true
                    ? 'border-green-500 bg-green-500/20 text-green-400'
                    : 'border-gray-600 bg-gray-700/30 text-gray-400 hover:border-gray-500'
                }`}
              >
                <CheckCircle className="w-5 h-5 mx-auto mb-1" />
                <span className="font-medium">Yes, Recommend</span>
              </button>
              <button
                type="button"
                onClick={() => setRecommended(false)}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  recommended === false
                    ? 'border-red-500 bg-red-500/20 text-red-400'
                    : 'border-gray-600 bg-gray-700/30 text-gray-400 hover:border-gray-500'
                }`}
              >
                <X className="w-5 h-5 mx-auto mb-1" />
                <span className="font-medium">No, Do Not Recommend</span>
              </button>
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label htmlFor="remarks" className="block text-white font-medium mb-2">
              Overall Remarks <span className="text-red-400">*</span>
            </label>
            <textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none transition-all"
              placeholder="Provide your detailed feedback about the candidate's performance..."
              required
            />
          </div>

          {/* Strengths */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-white font-medium">
                Strengths (Optional)
              </label>
              <button
                type="button"
                onClick={handleAddStrength}
                className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Strength
              </button>
            </div>
            <div className="space-y-2">
              {strengths.map((strength, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={strength}
                    onChange={(e) => handleStrengthChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:outline-none transition-all"
                    placeholder={`Strength ${index + 1}`}
                  />
                  {strengths.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveStrength(index)}
                      className="px-3 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Weaknesses */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-white font-medium">
                Areas for Improvement (Optional)
              </label>
              <button
                type="button"
                onClick={handleAddWeakness}
                className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Area
              </button>
            </div>
            <div className="space-y-2">
              {weaknesses.map((weakness, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={weakness}
                    onChange={(e) => handleWeaknessChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 focus:outline-none transition-all"
                    placeholder={`Area for improvement ${index + 1}`}
                  />
                  {weaknesses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveWeakness(index)}
                      className="px-3 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || submitSuccess}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewFeedbackDialog;
