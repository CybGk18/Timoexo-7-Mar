import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { ChatProvider } from "./contexts/ChatContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const ContactSuccess = lazy(() => import("./pages/ContactSuccess"));
const About = lazy(() => import("./pages/About"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const Estore = lazy(() => import("./pages/Estore"));
const WorldMap = lazy(() => import("./components/WorldMap"));
const BuyerInquiryForm = lazy(() => import("./components/BuyerInquiryForm"));
const ManufacturerInquiryForm = lazy(() => import("./components/ManufacturerInquiryForm"));
const StatsCounter = lazy(() => import("../src/components/StatsCounter"));
const VideoSection = lazy(() => import("./components/VideoSection"));
const Solutions = lazy(() => import("./pages/Solutions"));
const GlobalServices = lazy(() => import("./components/GlobalServices"));

// Admin components (lazy-loaded)
const AdminAuthProvider = lazy(() =>
  import("./admin/contexts/AdminAuthContext").then((m) => ({ default: m.AdminAuthProvider }))
);
const AdminLogin = lazy(() =>
  import("./admin/pages/AdminLogin").then((m) => ({ default: m.AdminLogin }))
);
const DashboardLayout = lazy(() =>
  import("./admin/layouts/DashboardLayout").then((m) => ({ default: m.DashboardLayout }))
);
const Dashboard = lazy(() =>
  import("./admin/pages/Dashboard").then((m) => ({ default: m.Dashboard }))
);
const ContentList = lazy(() =>
  import("./admin/pages/ContentList").then((m) => ({ default: m.ContentList }))
);
const Comments = lazy(() =>
  import("./admin/pages/Comments").then((m) => ({ default: m.Comments }))
);
const MediaLibrary = lazy(() =>
  import("./admin/pages/MediaLibrary").then((m) => ({ default: m.MediaLibrary }))
);
const Gallery = lazy(() =>
  import("./admin/pages/Gallery").then((m) => ({ default: m.Gallery }))
);
const Settings = lazy(() =>
  import("./admin/pages/Settings").then((m) => ({ default: m.Settings }))
);
const Inquiries = lazy(() =>
  import("./admin/pages/Inquiries").then((m) => ({ default: m.Inquiries }))
);
const InquiryDetail = lazy(() =>
  import("./admin/pages/InquiryDetail").then((m) => ({ default: m.InquiryDetail }))
);
const UsersManagement = lazy(() =>
  import("./admin/pages/UsersManagement").then((m) => ({ default: m.UsersManagement }))
);
const ProtectedRoute = lazy(() =>
  import("./admin/components/ProtectedRoute").then((m) => ({ default: m.ProtectedRoute }))
);
const ContentEditor = lazy(() =>
  import("./admin/pages/ContentEditor").then((m) => ({ default: m.ContentEditor }))
);
import "./App.css";
import FloatingChat from "./components/FloatingChat";
const Resources = lazy(() => import("./pages/Resources"));
const BlogPost = lazy(() => import("./components/BlogPost"));
const Products = lazy(() => import("./pages/Products"));

// ✅ Custom layout to handle hiding Header/Footer for admin pages
function AppContent() {
  const location = useLocation();

  // ✅ Hide Header & Footer when path starts with /admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!isAdminRoute && <Header />}
      <main className="flex-grow">
        <Suspense fallback={<div className="min-h-[40vh] w-full" />}>
          <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/GlobalServices" element={<GlobalServices />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/StatsCounter" element={<StatsCounter end={undefined} />} />
          <Route path="/contact-success" element={<ContactSuccess />} />
          <Route path="/estore" element={<Estore />} />
          <Route path="/worldmap" element={<WorldMap />} />
          <Route path="/videosection" element={<VideoSection />} />
          <Route path="/buyer-inquiry" element={<BuyerInquiryForm />} />
          <Route path="/manufacturer-inquiry" element={<ManufacturerInquiryForm />} />
          <Route path="/products" element={<Products />} />
          {/* Blog routes */}
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blog-post/:slug" element={<BlogPost />} />
          <Route path="/case-study/:slug" element={<BlogPost />} />
          <Route path="/white-paper/:slug" element={<BlogPost />} />
          <Route path="/news/:slug" element={<BlogPost />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminAuthProvider><Outlet /></AdminAuthProvider>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="login" element={<AdminLogin />} />

            <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="content" element={<ContentList />} />
              <Route path="comments" element={<Comments />} />
              <Route path="inquiries" element={<Inquiries />} />
              <Route path="inquiries/:id" element={<InquiryDetail />} />
              <Route path="media" element={<MediaLibrary />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="content/new" element={<ContentEditor />} />
              <Route path="content/edit/:id" element={<ContentEditor />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<UsersManagement />} />
            </Route>

            {/* Admin fallback */}
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
          </Routes>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}

      {/* Chatbot only on public routes */}
      {!isAdminRoute && (
        <>
          <FloatingChat />
          {/* <button
            className="chatbot-button"
            onClick={() => setShowChat(true)}
            aria-label="Open chat"
          >
            💬
          </button>
          <ChatDrawer open={showChat} onOpenChange={setShowChat} /> */}
        </>
      )}
    </div>
  );
}

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <ChatProvider>
          <Router basename="/">
            <ScrollToTop />
            <AppContent />
          </Router>
        </ChatProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
