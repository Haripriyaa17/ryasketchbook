-- RyaSketchbook COMPLETE DATABASE WITH ADMIN POLICIES
-- Run entire script in Supabase SQL Editor

-- ==============================================
-- 1. CREATE TABLES
-- ==============================================

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  custom_description TEXT,
  course_details TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics: Visits
CREATE TABLE IF NOT EXISTS visits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  user_agent TEXT,
  device_type TEXT CHECK (device_type IN ('desktop', 'mobile', 'tablet')),
  browser TEXT,
  referrer TEXT,
  screen_resolution TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics: Page Views
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id INTEGER NOT NULL,
  page_name TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  user_agent TEXT,
  screen_width INTEGER,
  screen_height INTEGER,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics: Interactions
CREATE TABLE IF NOT EXISTS interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  interaction_type TEXT NOT NULL,
  details JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- 2. CREATE INDEXES
-- ==============================================

CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_visits_timestamp ON visits(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_timestamp ON page_views(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_visits_device_type ON visits(device_type);
CREATE INDEX IF NOT EXISTS idx_interactions_type ON interactions(interaction_type);

-- ==============================================
-- 3. ENABLE ROW LEVEL SECURITY
-- ==============================================

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;

-- ==============================================
-- 4. DROP EXISTING POLICIES (if any)
-- ==============================================

DROP POLICY IF EXISTS "public_insert_orders" ON orders;
DROP POLICY IF EXISTS "auth_read_orders" ON orders;
DROP POLICY IF EXISTS "admin_manage_orders" ON orders;
DROP POLICY IF EXISTS "public_read_products" ON products;
DROP POLICY IF EXISTS "admin_manage_products" ON products;
DROP POLICY IF EXISTS "anon_insert_visits" ON visits;
DROP POLICY IF EXISTS "auth_read_visits" ON visits;
DROP POLICY IF EXISTS "anon_insert_views" ON page_views;
DROP POLICY IF EXISTS "auth_read_views" ON page_views;
DROP POLICY IF EXISTS "anon_insert_interactions" ON interactions;
DROP POLICY IF EXISTS "auth_read_interactions" ON interactions;

-- ==============================================
-- 5. CREATE NEW POLICIES
-- ==============================================

-- ORDERS POLICIES
-- Anyone can insert orders (for customer form submissions)
CREATE POLICY "public_insert_orders" 
ON orders FOR INSERT 
WITH CHECK (true);

-- Authenticated users can read all orders
CREATE POLICY "auth_read_orders" 
ON orders FOR SELECT 
TO authenticated 
USING (true);

-- Admin can do everything with orders
-- ⚠️ IMPORTANT: Replace 'your-admin@email.com' with your actual admin email
CREATE POLICY "admin_manage_orders" 
ON orders FOR ALL 
TO authenticated 
USING (auth.jwt() ->> 'email' = 'ryasketchbook@gmail.com');

-- PRODUCTS POLICIES
-- Anyone can view products
CREATE POLICY "public_read_products" 
ON products FOR SELECT 
USING (true);

-- Admin can manage products
-- ⚠️ IMPORTANT: Replace 'your-admin@email.com' with your actual admin email
CREATE POLICY "admin_manage_products" 
ON products FOR ALL 
TO authenticated 
USING (auth.jwt() ->> 'email' = 'ryasketchbook@gmail.com');

-- VISITS POLICIES
-- Anyone can insert visits (anonymous analytics)
CREATE POLICY "anon_insert_visits" 
ON visits FOR INSERT 
WITH CHECK (true);

-- Authenticated users can read visits
CREATE POLICY "auth_read_visits" 
ON visits FOR SELECT 
TO authenticated 
USING (true);

-- PAGE VIEWS POLICIES
-- Anyone can insert page views
CREATE POLICY "anon_insert_views" 
ON page_views FOR INSERT 
WITH CHECK (true);

-- Authenticated users can read page views
CREATE POLICY "auth_read_views" 
ON page_views FOR SELECT 
TO authenticated 
USING (true);

-- INTERACTIONS POLICIES
-- Anyone can insert interactions
CREATE POLICY "anon_insert_interactions" 
ON interactions FOR INSERT 
WITH CHECK (true);

-- Authenticated users can read interactions
CREATE POLICY "auth_read_interactions" 
ON interactions FOR SELECT 
TO authenticated 
USING (true);

-- ==============================================
-- 6. CREATE VIEWS FOR ANALYTICS
-- ==============================================

-- Daily visit statistics
CREATE OR REPLACE VIEW daily_visit_stats AS
SELECT 
  DATE(timestamp) as visit_date,
  COUNT(*) as total_visits,
  COUNT(CASE WHEN device_type = 'desktop' THEN 1 END) as desktop_visits,
  COUNT(CASE WHEN device_type = 'mobile' THEN 1 END) as mobile_visits,
  COUNT(CASE WHEN device_type = 'tablet' THEN 1 END) as tablet_visits
FROM visits 
GROUP BY DATE(timestamp) 
ORDER BY visit_date DESC;

-- Hourly page views
CREATE OR REPLACE VIEW hourly_page_views AS
SELECT 
  DATE_TRUNC('hour', timestamp) as hour,
  page_name,
  COUNT(*) as view_count
FROM page_views
GROUP BY DATE_TRUNC('hour', timestamp), page_name
ORDER BY hour DESC;

-- Orders summary by status
CREATE OR REPLACE VIEW orders_by_status AS
SELECT 
  status,
  COUNT(*) as count,
  DATE(created_at) as order_date
FROM orders
GROUP BY status, DATE(created_at)
ORDER BY order_date DESC;

-- ==============================================
-- 7. INSERT SAMPLE PRODUCTS (OPTIONAL)
-- ==============================================

-- Uncomment if you want to add sample products
/*
INSERT INTO products (name, price, description, image) VALUES
('Custom Portrait', 2999, 'Hand-drawn portrait from your photo', 'https://example.com/portrait.jpg'),
('Sketch Course', 4999, 'Complete sketching course for beginners', 'https://example.com/course.jpg'),
('Pet Portrait', 3499, 'Custom portrait of your beloved pet', 'https://example.com/pet.jpg')
ON CONFLICT DO NOTHING;
*/

-- ==============================================
-- 8. GRANT PERMISSIONS
-- ==============================================

-- Grant usage on schemas
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant table permissions
GRANT ALL ON orders TO authenticated;
GRANT SELECT, INSERT ON orders TO anon;

GRANT ALL ON products TO authenticated;
GRANT SELECT ON products TO anon;

GRANT SELECT, INSERT ON visits TO anon, authenticated;
GRANT SELECT, INSERT ON page_views TO anon, authenticated;
GRANT SELECT, INSERT ON interactions TO anon, authenticated;

-- ==============================================
-- 9. CREATE HELPER FUNCTIONS
-- ==============================================

-- Function to get total order count
CREATE OR REPLACE FUNCTION get_total_orders()
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER FROM orders;
$$ LANGUAGE SQL SECURITY DEFINER;

-- Function to get orders by date range
CREATE OR REPLACE FUNCTION get_orders_by_date_range(
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ
)
RETURNS TABLE (
  id UUID,
  customer_name TEXT,
  email TEXT,
  product_name TEXT,
  status TEXT,
  created_at TIMESTAMPTZ
) AS $$
  SELECT id, customer_name, email, product_name, status, created_at
  FROM orders
  WHERE created_at BETWEEN start_date AND end_date
  ORDER BY created_at DESC;
$$ LANGUAGE SQL SECURITY DEFINER;

-- ==============================================
-- SETUP COMPLETE!
-- ==============================================

-- Next Steps:
-- 1. Replace 'your-admin@email.com' in policies above with your actual admin email
-- 2. Create your admin user via Supabase Dashboard or your website signup
-- 3. Test that the admin can access all data
-- 4. Test that anonymous users can only insert orders and analytics

-- To verify policies are working:
-- SELECT * FROM pg_policies WHERE schemaname = 'public';

-- ✅ Database setup complete!