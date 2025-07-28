export default function AppHome() {
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Welcome, logged-in user!
        </h1>
      </div>
      <p className="text-lg text-gray-700">
        You now have access to this protected area.
      </p>
    </div>
  );
}