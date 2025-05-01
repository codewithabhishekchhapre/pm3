import { useState } from 'react';
import axios from 'axios';

function OtpVerification() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(2); // 1 = send OTP, 2 = verify OTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call to send OTP
    const res=  await axios.post('http://localhost:3000/api/sendotp', { email ,purpose:"verification"});
      setMessage(`OTP sent to ${email}`);
      console.log(res.data.success)
      if(res.data.success===true){
      setStep(2); 
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call to verify OTP
      await axios.post('http://localhost:3000/api/verify-otp', { email, otp });
      setMessage('OTP verified successfully!');
      // Proceed with your application flow (redirect, etc.)
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
            <h1 className="text-2xl font-bold text-white">
              {step === 1 ? 'Get Verification Code' : 'Verify Your Email'}
            </h1>
            <p className="text-indigo-100 mt-2">
              {step === 1 
                ? 'Enter your email to receive OTP' 
                : 'Enter the 6-digit code sent to your email'}
            </p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                {message}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition duration-200"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-lg text-white font-semibold ${loading 
                      ? 'bg-indigo-400 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700'} transition duration-200 shadow-md`}
                  >
                    {loading ? 'Sending...' : 'Send OTP'}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                      6-digit Verification Code
                    </label>
                    <div className="flex space-x-2">
                      {[...Array(6)].map((_, i) => (
                        <input
                          key={i}
                          type="text"
                          maxLength="1"
                          value={otp[i] || ''}
                          onChange={(e) => {
                            const newOtp = otp.split('');
                            newOtp[i] = e.target.value.replace(/\D/g, '');
                            setOtp(newOtp.join(''));
                            
                            // Auto-focus next input
                            if (e.target.value && i < 5) {
                              document.getElementById(`otp-${i+1}`).focus();
                            }
                          }}
                          id={`otp-${i}`}
                          className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition duration-200"
                          pattern="\d*"
                          inputMode="numeric"
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Didn't receive code?{' '}
                      <button 
                        type="button" 
                        onClick={() => setStep(1)}
                        className="text-indigo-600 hover:underline"
                      >
                        Resend OTP
                      </button>
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading || otp.length !== 6}
                      className={`flex-1 py-3 px-4 rounded-lg text-white font-semibold ${(loading || otp.length !== 6) 
                        ? 'bg-indigo-400 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700'} transition duration-200 shadow-md`}
                    >
                      {loading ? 'Verifying...' : 'Verify'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;