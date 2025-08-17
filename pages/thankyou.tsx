import { useRouter } from 'next/router';

export default function ThankYou() {
  const router = useRouter();
  const { session_id } = router.query;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900">Thank You for Your Donation!</h1>
      <p className="mt-4 text-lg text-gray-600">Your support makes a difference.</p>
      {session_id && (
        <p className="mt-4 text-gray-500">Your session id: {session_id}</p>
      )}
      <a href="/" className="mt-6 text-indigo-600 hover:underline">Go back to home page</a>
    </div>
  );
}
