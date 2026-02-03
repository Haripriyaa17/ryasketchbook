import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Eye,
  Monitor,
  Smartphone,
  Tablet,
  TrendingUp,
  ArrowLeft,
  Mail,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";

const Admin = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalVisits: 0,
    todayVisits: 0,
    desktopVisits: 0,
    mobileVisits: 0,
    tabletVisits: 0,
    totalPageViews: 0,
  });
  const [recentVisits, setRecentVisits] = useState([]);
  const [popularPages, setPopularPages] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [deviceData, setDeviceData] = useState([]);

  useEffect(() => {
    checkUser();
    loadAnalytics();
    const interval = setInterval(loadAnalytics, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin");
    }
  };

  const loadAnalytics = async () => {
    await Promise.all([
      loadVisitStats(),
      loadRecentVisits(),
      loadPopularPages(),
      loadUserRequests(),
      loadDeviceBreakdown(),
    ]);
  };

  const loadVisitStats = async () => {
    try {
      const { count: totalVisits } = await supabase
        .from("visits")
        .select("*", { count: "exact", head: true });
      const { count: totalPageViews } = await supabase
        .from("page_views")
        .select("*", { count: "exact", head: true });

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: todayVisits } = await supabase
        .from("visits")
        .select("*", { count: "exact", head: true })
        .gte("timestamp", today.toISOString());

      const { count: desktopVisits } = await supabase
        .from("visits")
        .select("*", { count: "exact", head: true })
        .eq("device_type", "desktop");
      const { count: mobileVisits } = await supabase
        .from("visits")
        .select("*", { count: "exact", head: true })
        .eq("device_type", "mobile");
      const { count: tabletVisits } = await supabase
        .from("visits")
        .select("*", { count: "exact", head: true })
        .eq("device_type", "tablet");

      setStats({
        totalVisits: totalVisits || 0,
        todayVisits: todayVisits || 0,
        desktopVisits: desktopVisits || 0,
        mobileVisits: mobileVisits || 0,
        tabletVisits: tabletVisits || 0,
        totalPageViews: totalPageViews || 0,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const loadRecentVisits = async () => {
    try {
      const { data } = await supabase
        .from("visits")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(10);
      setRecentVisits(data || []);
    } catch (error) {
      console.error("Error loading visits:", error);
    }
  };

  const loadPopularPages = async () => {
    try {
      const { data } = await supabase
        .from("page_views")
        .select("page_name")
        .order("timestamp", { ascending: false });

      if (data) {
        const pageCounts = data.reduce((acc, item) => {
          acc[item.page_name] = (acc[item.page_name] || 0) + 1;
          return acc;
        }, {});

        const sorted = Object.entries(pageCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setPopularPages(sorted);
      }
    } catch (error) {
      console.error("Error loading pages:", error);
    }
  };

  const loadUserRequests = async () => {
    try {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);
      setUserRequests(data || []);
    } catch (error) {
      console.error("Error loading requests:", error);
    }
  };

  const loadDeviceBreakdown = async () => {
    const total = stats.desktopVisits + stats.mobileVisits + stats.tabletVisits;
    setDeviceData([
      {
        name: "Desktop",
        value: stats.desktopVisits,
        percent: total ? ((stats.desktopVisits / total) * 100).toFixed(1) : 0,
      },
      {
        name: "Mobile",
        value: stats.mobileVisits,
        percent: total ? ((stats.mobileVisits / total) * 100).toFixed(1) : 0,
      },
      {
        name: "Tablet",
        value: stats.tabletVisits,
        percent: total ? ((stats.tabletVisits / total) * 100).toFixed(1) : 0,
      },
    ]);
  };

  useEffect(() => {
    loadDeviceBreakdown();
  }, [stats]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-gradient-to-r from-brand-brown to-brand-brown-dark text-white py-6 shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold">
                Portfolio Analytics Dashboard
              </h1>
              <p className="text-brand-gold mt-1">Real-time Visitor Insights</p>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 bg-brand-gold text-brand-brown rounded-xl hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
            >
              <ArrowLeft size={20} />
              <span className="font-semibold">Back to Site</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<Users size={32} />}
            label="Total Visits"
            value={stats.totalVisits}
            color="blue"
          />
          <StatCard
            icon={<TrendingUp size={32} />}
            label="Today's Visits"
            value={stats.todayVisits}
            color="green"
          />
          <StatCard
            icon={<Eye size={32} />}
            label="Page Views"
            value={stats.totalPageViews}
            color="purple"
          />
          <StatCard
            icon={<Monitor size={32} />}
            label="Desktop"
            value={stats.desktopVisits}
            color="indigo"
          />
        </div>

        {/* Device Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 shadow-xl border-2 border-brand-gold"
        >
          <h3 className="text-2xl font-display font-bold text-brand-brown mb-6">
            Device Breakdown
          </h3>
          <div className="grid grid-cols-3 gap-6">
            {deviceData.map((device, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-brand-gold/30"
              >
                <div className="text-4xl mb-3">
                  {device.name === "Desktop" && (
                    <Monitor className="mx-auto text-brand-brown" size={40} />
                  )}
                  {device.name === "Mobile" && (
                    <Smartphone
                      className="mx-auto text-brand-brown"
                      size={40}
                    />
                  )}
                  {device.name === "Tablet" && (
                    <Tablet className="mx-auto text-brand-brown" size={40} />
                  )}
                </div>
                <div className="text-3xl font-bold text-brand-brown mb-1">
                  {device.value}
                </div>
                <div className="text-sm text-gray-600 mb-2">{device.name}</div>
                <div className="text-lg font-semibold text-brand-gold">
                  {device.percent}%
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Popular Pages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl border-2 border-brand-gold"
          >
            <h3 className="text-2xl font-display font-bold text-brand-brown mb-6">
              Popular Pages
            </h3>
            <div className="space-y-4">
              {popularPages.map((page, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl"
                >
                  <span className="font-semibold text-gray-800">
                    {page.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-brown to-brand-gold"
                        style={{
                          width: `${(page.count / popularPages[0]?.count) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="font-bold text-brand-brown w-12 text-right">
                      {page.count}
                    </span>
                  </div>
                </div>
              ))}
              {popularPages.length === 0 && (
                <p className="text-center text-gray-500 py-8">No data yet</p>
              )}
            </div>
          </motion.div>

          {/* Recent Visits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl border-2 border-brand-gold"
          >
            <h3 className="text-2xl font-display font-bold text-brand-brown mb-6">
              Recent Visits
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recentVisits.map((visit, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-brand-gold/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-brand-brown capitalize">
                      {visit.device_type || "Unknown"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(visit.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {visit.browser} • {visit.screen_resolution}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    From: {visit.referrer || "Direct"}
                  </div>
                </div>
              ))}
              {recentVisits.length === 0 && (
                <p className="text-center text-gray-500 py-8">No visits yet</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* User Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-xl border-2 border-brand-gold"
        >
          <h3 className="text-2xl font-display font-bold text-brand-brown mb-6 flex items-center gap-3">
            <Mail size={28} />
            User Requests
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-brand-gold">
                  <th className="text-left py-4 px-4 font-display text-brand-brown">
                    Name
                  </th>
                  <th className="text-left py-4 px-4 font-display text-brand-brown">
                    Contact
                  </th>
                  <th className="text-left py-4 px-4 font-display text-brand-brown">
                    Product
                  </th>
                  <th className="text-left py-4 px-4 font-display text-brand-brown">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {userRequests.map((request, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                  >
                    <td className="py-4 px-4 font-semibold text-gray-800">
                      {request.customer_name}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {request.email}
                      <br />
                      {request.phone}
                    </td>
                    <td className="py-4 px-4 text-sm">
                      <span className="px-3 py-1 bg-brand-gold/20 text-brand-brown rounded-full">
                        {request.product_name}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs text-gray-500">
                      {new Date(request.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {userRequests.length === 0 && (
              <p className="text-center text-gray-500 py-8">No requests yet</p>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => {
  const colors = {
    blue: "from-blue-400 to-blue-600",
    green: "from-green-400 to-green-600",
    purple: "from-purple-400 to-purple-600",
    indigo: "from-indigo-400 to-indigo-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all border-2 border-brand-gold"
    >
      <div
        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors[color]} flex items-center justify-center text-white mb-4`}
      >
        {icon}
      </div>
      <p className="text-gray-600 text-sm mb-1 font-sans">{label}</p>
      <p className="text-4xl font-bold text-brand-brown font-display">
        {value}
      </p>
    </motion.div>
  );
};

export default Admin;
