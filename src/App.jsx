import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CrochetStore from "./pages/CrochetStore";
import Contact from "./pages/Contact";
import OrderPage from "./pages/OrderPage";
import Admin from "./components/Admin";
import AdminAuth from "./components/AdminAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import AnalyticsTracker from "./components/AnalyticsTracker";

function App() {
  return (
    <Router>
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crochet-store" element={<CrochetStore />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/admin" element={<AdminAuth />} />
        <Route path="/admin/login" element={<AdminAuth />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Page not found</p>
                <a
                  href="/"
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
                >
                  Go Home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
