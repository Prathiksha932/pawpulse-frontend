import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { submitFeedback } from '../../api/feedbackApi';

const Feedback = () => {
  const { register, handleSubmit, reset } = useForm();
  const [status, setStatus] = useState('');

  const onSubmit = async (data) => {
    try {
      await submitFeedback(data);
      setStatus('Thank you — your feedback has been submitted.');
      reset();
    } catch {
      setStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="mx-auto max-w-lg p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Share Your Feedback</h1>
      {status && <div className="mb-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">{status}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl bg-white p-6 shadow">
        <input {...register('subject', { required: true })} placeholder="Subject" className="w-full rounded-lg border px-3 py-2" />
        <textarea {...register('message', { required: true })} placeholder="Your message" rows={4} className="w-full rounded-lg border px-3 py-2" />
        <select {...register('rating')} className="w-full rounded-lg border px-3 py-2">
          <option value="">Rating (optional)</option>
          {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}
        </select>
        <button type="submit" className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;