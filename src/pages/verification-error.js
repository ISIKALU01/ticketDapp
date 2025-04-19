export default function VerificationError() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Verification Failed</h1>
          <p className="mb-4">There was an error verifying your email.</p>
          <a href="/signup" className="text-blue-600 hover:underline">
            Return to Sign Up
          </a>
        </div>
      </div>
    );
  }