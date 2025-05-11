import { useState, useEffect, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [reportedContent, setReportedContent] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, reportedRes] = await Promise.all([
          api.get("/admin/users", { withCredentials: true }),
          api.get("/admin/reported-content", { withCredentials: true }),
        ]);
        setUsers(usersRes.data);
        setReportedContent(reportedRes.data.data);

        // console.log("main content :-> ", reportedContent);
      } catch (err) {
        console.error("Admin data fetch failed:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Users Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Users ({users.length})</h2>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user._id} className="border-b pb-2">
                <p className="font-medium">{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm">Role: {user.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reported Content */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Reported Content</h2>
          {reportedContent.length > 0 ? (
            <div className="space-y-4">
              {reportedContent.map((item) => (
                <div key={item._id} className="border-b pb-2">
                  <p className="font-medium">
                    {item.content.substring(0, 50)}...
                  </p>
                  <p className="text-sm text-gray-500">
                    Reported by:{" "}
                    {item.reporters.map((r) => r.username).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reported content</p>
          )}
        </div>
      </div>
    </div>
  );
}
