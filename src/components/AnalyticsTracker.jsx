import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { analytics } from "../utils/supabase";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const visitKey = "visit_tracked";
    if (!sessionStorage.getItem(visitKey)) {
      analytics.trackVisit();
      sessionStorage.setItem(visitKey, "1");
    }

    const pageId = location.pathname || "/";
    const pageName = location.pathname || "home";
    analytics.trackPageView(pageId, pageName);
  }, [location.pathname]);

  return null;
};

export default AnalyticsTracker;
