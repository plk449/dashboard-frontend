export default function CreditStats({ credits }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Your Credits</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">{credits}</p>
          <p className="text-gray-500">Available points</p>
        </div>
        <div className="bg-blue-100 p-3 rounded-full">
          <svg
            className="w-8 h-8 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" />
          </svg>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t">
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Redeem Credits
        </button>
      </div>
    </div>
  );
}
