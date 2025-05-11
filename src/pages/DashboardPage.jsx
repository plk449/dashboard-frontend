import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import CreditStats from "../components/dashboard/CreditStats";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import FeedItem from "../components/feed/FeedItem";
import LoadingSpinner from "../components/shared/LoadingSpinner";

export default function DashboardPage() {
  const { user } = useContext(AuthContext);
  const [credits, setCredits] = useState(0);
  const [savedFeed, setSavedFeed] = useState([]); // Previously saved feeds
  const [newFeed, setNewFeed] = useState([]); // New feeds from API
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [creditsRes, savedFeedRes, newFeedRes] = await Promise.all([
          api.post(
            "/credits/earn",
            { action: "daily_login" },
            { withCredentials: true }
          ),
          api.get("/feed/saved"), // New endpoint for saved feeds
          // api.get("/feed"),
        ]);

        setCredits(creditsRes.data.balance);
        setSavedFeed(savedFeedRes.data);
        setNewFeed(newFeedRes.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <CreditStats credits={credits} />
          <ActivityFeed />
        </div>

        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-xl font-bold mb-4">New Content</h2>
          {newFeed.map((item) => (
            <FeedItem
              key={`new-${item.source}-${item.id}`}
              item={item}
              isSaved={savedFeed.some((saved) => saved.id === item.id)} // Check if already saved
            />
          ))}
          {/* Section for Saved Feeds */}
          {savedFeed.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Your Saved Content</h2>
              {savedFeed.map((item) => (
                <FeedItem
                  key={`saved-${item.source}-${item.id}`}
                  item={item}
                  isSaved={true} // Pass prop to show saved state
                />
              ))}
            </div>
          )}

          {/* Section for New Feeds */}
        </div>
      </div>
    </div>
  );
}
