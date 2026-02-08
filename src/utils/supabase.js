// src/utils/supabase.js
import { createClient } from "@supabase/supabase-js";

// ⚠️ IMPORTANT: Add your Supabase credentials here or use .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "YOUR_SUPABASE_URL";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Analytics tracking functions - FIXED VERSION
export const analytics = {
  // Track page views
  trackPageView: async (pageId = "/", pageName = "home") => {
    try {
      const { error } = await supabase.from("page_views").insert([
        {
          page_id: pageId.toString(), // ✅ This is now correct for TEXT field
          page_name: pageName,
          user_agent: navigator.userAgent,
          screen_width: window.screen.width,
          screen_height: window.screen.height,
          referrer: document.referrer || "direct",
        },
      ]);

      if (error) {
        console.error("Error tracking page view:", error);
      }
    } catch (err) {
      console.error("Exception tracking page view:", err);
    }
  },

  // Track visits
  trackVisit: async () => {
    try {
      const width = window.screen.width;
      let deviceType = "desktop";
      if (width < 768) deviceType = "mobile";
      else if (width < 1024) deviceType = "tablet";

      const userAgent = navigator.userAgent;
      let browser = "unknown";
      if (userAgent.includes("Chrome")) browser = "chrome";
      else if (userAgent.includes("Firefox")) browser = "firefox";
      else if (userAgent.includes("Safari")) browser = "safari";
      else if (userAgent.includes("Edge")) browser = "edge";

      const { error } = await supabase.from("visits").insert([
        {
          user_agent: userAgent,
          device_type: deviceType,
          browser: browser,
          referrer: document.referrer || "direct",
          screen_resolution: `${window.screen.width}x${window.screen.height}`,
        },
      ]);

      if (error) {
        console.error("Error tracking visit:", error);
      }
    } catch (err) {
      console.error("Exception tracking visit:", err);
    }
  },

  // Track interactions
  trackInteraction: async (interactionType, details = {}) => {
    try {
      const { error } = await supabase.from("interactions").insert([
        {
          interaction_type: interactionType,
          details: details,
        },
      ]);

      if (error) {
        console.error("Error tracking interaction:", error);
      }
    } catch (err) {
      console.error("Exception tracking interaction:", err);
    }
  },
};
