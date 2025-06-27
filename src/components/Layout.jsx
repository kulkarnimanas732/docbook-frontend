// ✅ Layout.jsx
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        {children}
      </div>
    </div>
  );
}
