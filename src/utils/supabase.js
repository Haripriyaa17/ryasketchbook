import { createClient } from "@supabase/supabase-js";

// SETUP INSTRUCTIONS:
// 1. Create a Supabase account at https://supabase.com
// 2. Create a new project
// 3. Go to Project Settings > API
// 4. Copy your Project URL and anon/public key
// 5. Replace the values below

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "YOUR_SUPABASE_URL";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Analytics functions
export const analytics = {
  // Track page view
  async trackPageView(pageId, pageName) {
    try {
      const { data, error } = await supabase.from("page_views").insert([
        {
          page_id: pageId,
          page_name: pageName,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          screen_width: window.innerWidth,
          screen_height: window.innerHeight,
          referrer: document.referrer || "direct",
        },
      ]);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error tracking page view:", error);
    }
  },

  // Track visit (session)
  async trackVisit() {
    try {
      const { data, error } = await supabase.from("visits").insert([
        {
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          device_type: getDeviceType(),
          browser: getBrowser(),
          referrer: document.referrer || "direct",
          screen_resolution: `${window.innerWidth}x${window.innerHeight}`,
        },
      ]);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error tracking visit:", error);
    }
  },

  // Track interaction (button clicks, etc.)
  async trackInteraction(interactionType, details) {
    try {
      const { data, error } = await supabase.from("interactions").insert([
        {
          interaction_type: interactionType,
          details: details,
          timestamp: new Date().toISOString(),
        },
      ]);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error tracking interaction:", error);
    }
  },

  // Get analytics data (for admin dashboard)
  async getAnalytics(startDate, endDate) {
    try {
      const { data, error } = await supabase
        .from("page_views")
        .select("*")
        .gte("timestamp", startDate)
        .lte("timestamp", endDate)
        .order("timestamp", { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching analytics:", error);
      return [];
    }
  },

  // Get total visits
  async getTotalVisits() {
    try {
      const { count, error } = await supabase
        .from("visits")
        .select("*", { count: "exact", head: true });

      if (error) throw error;
      return count;
    } catch (error) {
      console.error("Error fetching total visits:", error);
      return 0;
    }
  },

  // Get total page views count
  async getTotalPageViews() {
    try {
      const { count, error } = await supabase
        .from("page_views")
        .select("*", { count: "exact", head: true });

      if (error) throw error;
      return count;
    } catch (error) {
      console.error("Error fetching total page views:", error);
      return 0;
    }
  },

  // Get page views by page name
  async getPageViewsByName() {
    try {
      const { data, error } = await supabase
        .from("page_views")
        .select("page_name")
        .order("timestamp", { ascending: false })
        .limit(1000);

      if (error) throw error;

      // Group by page name and count
      const pageCounts = {};
      data.forEach((view) => {
        const pageName = view.page_name || "Unknown";
        pageCounts[pageName] = (pageCounts[pageName] || 0) + 1;
      });

      return Object.entries(pageCounts)
        .map(([name, count]) => ({
          name,
          views: count,
        }))
        .sort((a, b) => b.views - a.views);
    } catch (error) {
      console.error("Error fetching page views by name:", error);
      return [];
    }
  },

  // Get recent visits/interactions for activity feed
  async getRecentActivity(limit = 10) {
    try {
      const { data, error } = await supabase
        .from("visits")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching recent activity:", error);
      return [];
    }
  },

  // Subscribe to real-time visits
  subscribeToVisits(callback) {
    try {
      const subscription = supabase
        .channel("public:visits")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "visits",
          },
          (payload) => {
            callback(payload.new);
          },
        )
        .subscribe();

      return subscription;
    } catch (error) {
      console.error("Error subscribing to visits:", error);
      return null;
    }
  },

  // Subscribe to real-time page views
  subscribeToPageViews(callback) {
    try {
      const subscription = supabase
        .channel("public:page_views")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "page_views",
          },
          (payload) => {
            callback(payload.new);
          },
        )
        .subscribe();

      return subscription;
    } catch (error) {
      console.error("Error subscribing to page views:", error);
      return null;
    }
  },

  // Unsubscribe from channel
  unsubscribe(subscription) {
    try {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    } catch (error) {
      console.error("Error unsubscribing:", error);
    }
  },
};

// Helper functions
function getDeviceType() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua,
    )
  ) {
    return "mobile";
  }
  return "desktop";
}

function getBrowser() {
  const ua = navigator.userAgent;
  let browserName = "Unknown";

  if (ua.indexOf("Firefox") > -1) {
    browserName = "Firefox";
  } else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) {
    browserName = "Opera";
  } else if (ua.indexOf("Trident") > -1) {
    browserName = "Internet Explorer";
  } else if (ua.indexOf("Edge") > -1) {
    browserName = "Edge";
  } else if (ua.indexOf("Chrome") > -1) {
    browserName = "Chrome";
  } else if (ua.indexOf("Safari") > -1) {
    browserName = "Safari";
  }

  return browserName;
}

// Admin authentication
export const auth = {
  // Sign in
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },

  // Check if user is authenticated
  async isAuthenticated() {
    const user = await this.getCurrentUser();
    return !!user;
  },
};
