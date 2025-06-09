import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import {
  Users,
  Package,
  Calendar,
  Mail,
  TrendingUp,
  Bell,
  Search,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  LogOut,
  Download,
  Send,
  Phone,
  MessageSquare,
  AlertCircle,
  BarChart3,
  Shield,
} from "lucide-react";

// 🔥 SMOOTH EASING fra jeres tema
const SMOOTH_EASE = [0.215, 0.61, 0.355, 1];

// 🔥 LOGIN KOMPONENT
const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (err) {
      setError("Forkert email eller adgangskode");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-brand-blue-lighter-bg)] via-[var(--color-background)] to-[var(--color-secondary-light)] flex items-center justify-center px-6">
      <motion.div
        className="bg-[var(--color-background)] p-8 rounded-2xl shadow-lg border border-[var(--color-primary)]/20 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: SMOOTH_EASE }}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-primary)] rounded-xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-foreground)] font-[var(--font-heading)]">
            Admin Login
          </h1>
          <p className="text-[var(--color-foreground)]/70 font-[var(--font-body)]">
            Log ind for at administrere systemet
          </p>
        </div>

        <div className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-[var(--color-primary)]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-[var(--color-background)]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
              Adgangskode
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-[var(--color-primary)]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-[var(--color-background)]"
              required
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-primary)] text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition-all duration-300"
          >
            {loading ? "Logger ind..." : "Log ind"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// 🔥 STAT CARD KOMPONENT
const StatCard = ({ title, value, icon, trend, loading = false }) => {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      className="bg-[var(--color-background)] rounded-2xl p-6 shadow-sm border border-[var(--color-primary)]/20"
      initial={{ opacity: 0, y: 20 }}
      animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: SMOOTH_EASE }}
      style={{ willChange: "transform, opacity" }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--color-foreground)]/70 font-[var(--font-body)]">
            {title}
          </p>
          <p className="text-2xl font-bold text-[var(--color-foreground)] mt-1 font-[var(--font-heading)]">
            {loading ? "..." : value}
          </p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-[var(--font-body)]">
                {trend}
              </span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-xl bg-[var(--color-brand-blue)]/10">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

// 🔥 LEAD CARD KOMPONENT
const LeadCard = ({ lead, onStatusUpdate, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "contacted":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "converted":
        return "bg-green-100 text-green-800 border-green-200";
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "new":
        return <Bell className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "contacted":
        return <Mail className="w-4 h-4" />;
      case "converted":
        return <CheckCircle className="w-4 h-4" />;
      case "closed":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("da-DK", {
      style: "currency",
      currency: "DKK",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat("da-DK", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <motion.div
      className="bg-[var(--color-background)] rounded-2xl p-6 shadow-sm border border-[var(--color-primary)]/20 hover:border-[var(--color-brand-blue)] transition-all duration-300"
      whileHover={{ y: -2 }}
      style={{ willChange: "transform" }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[var(--color-foreground)] font-[var(--font-heading)]">
            {lead.name}
          </h3>
          <p className="text-[var(--color-foreground)]/70 font-[var(--font-body)]">
            {lead.email}
          </p>
          {lead.phone && (
            <p className="text-[var(--color-foreground)]/70 font-[var(--font-body)] flex items-center mt-1">
              <Phone className="w-4 h-4 mr-1" />
              {lead.phone}
            </p>
          )}
        </div>

        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            lead.status
          )}`}
        >
          {getStatusIcon(lead.status)}
          <span className="ml-1 capitalize">{lead.status}</span>
        </span>
      </div>

      <div className="mb-4">
        {lead.type === "package" && (
          <div className="p-3 bg-[var(--color-brand-blue)]/5 rounded-lg border border-[var(--color-brand-blue)]/10">
            <div className="flex items-center mb-2">
              <Package className="w-4 h-4 text-[var(--color-brand-blue)] mr-2" />
              <span className="font-medium text-[var(--color-brand-blue)] font-[var(--font-heading)]">
                {lead.packageTitle}
              </span>
            </div>
            <p className="text-lg font-bold text-[var(--color-brand-blue)] font-[var(--font-heading)]">
              {formatCurrency(lead.packagePrice)}
            </p>
          </div>
        )}

        {lead.type === "booking" && (
          <div className="p-3 bg-green-50 rounded-lg border border-green-100">
            <div className="flex items-center mb-2">
              <Calendar className="w-4 h-4 text-green-600 mr-2" />
              <span className="font-medium text-green-600 font-[var(--font-heading)]">
                Booking
              </span>
            </div>
            <p className="text-sm text-green-700 font-[var(--font-body)]">
              {formatDate(lead.bookingDateTime)}
            </p>
          </div>
        )}

        {lead.type === "contact" && (
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
            <div className="flex items-center">
              <MessageSquare className="w-4 h-4 text-purple-600 mr-2" />
              <span className="font-medium text-purple-600 font-[var(--font-heading)]">
                Kontakt henvendelse
              </span>
            </div>
          </div>
        )}
      </div>

      <p className="text-sm text-[var(--color-foreground)]/70 mb-4 font-[var(--font-body)] line-clamp-2">
        {lead.message}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--color-foreground)]/50 font-[var(--font-body)]">
          {formatDate(lead.createdAt)}
        </span>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onViewDetails(lead)}
            className="p-2 text-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue)]/10 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>

          <select
            value={lead.status}
            onChange={(e) =>
              onStatusUpdate(lead.id, e.target.value, lead.source)
            }
            className="text-xs border border-[var(--color-primary)]/20 rounded-lg px-2 py-1 bg-[var(--color-background)] text-[var(--color-foreground)]"
          >
            <option value="new">Ny</option>
            <option value="contacted">Kontaktet</option>
            <option value="converted">Konverteret</option>
            <option value="closed">Lukket</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};

// 🔥 HOVEDKOMPONENT
const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    pendingBookings: 0,
    monthlyRevenue: 0,
    conversionRate: 0,
  });
  const [selectedLead, setSelectedLead] = useState(null);

  // 🔥 AUTHENTICATION - Med email whitelist
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === "frederikbroesen1993@hotmail.com") {
        setUser(user); // Tillad kun din email
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // 🔥 FIRESTORE DATA LISTENERS - Med booking/contact matching
  useEffect(() => {
    if (!user) return;

    let contactsData = [];
    let bookingsData = [];

    // Contacts listener (leads, package orders, contact forms)
    const contactsUnsubscribe = onSnapshot(
      query(collection(db, "contacts"), orderBy("createdAt", "desc")),
      (snapshot) => {
        contactsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          source: "contacts",
        }));
        updateLeadsData();
      },
      (error) => {
        console.error("Error fetching contacts:", error);
      }
    );

    // Bookings listener (separate booking collection)
    const bookingsUnsubscribe = onSnapshot(
      query(collection(db, "bookings"), orderBy("createdAt", "desc")),
      (snapshot) => {
        bookingsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          source: "bookings",
          type: "booking",
        }));
        updateLeadsData();
      },
      (error) => {
        console.error("Error fetching bookings:", error);
      }
    );

    // Funktion til at kombinere booking og contact data
    const updateLeadsData = () => {
      // Kombiner bookings med deres tilhørende contact info
      const enrichedBookings = bookingsData.map((booking) => {
        // Find tilhørende contact info via bookingId
        const contactInfo = contactsData.find(
          (contact) =>
            contact.bookingId === booking.id ||
            contact.type === "booking-confirmation"
        );

        return {
          ...booking,
          // Tilføj contact info hvis fundet
          name: contactInfo?.name || booking.name || "Unavngiven",
          email: contactInfo?.email || booking.email || "Ingen email",
          phone: contactInfo?.phone || booking.phone,
          message: contactInfo?.message || booking.message,
          // Bevar booking-specific data
          dateTime: booking.dateTime,
          formattedDateTime: booking.formattedDateTime,
          status: booking.status || "pending",
        };
      });

      // Filtrer contacts for kun non-booking items (regular leads, packages etc.)
      const regularContacts = contactsData.filter(
        (contact) =>
          contact.type !== "booking-confirmation" && contact.type !== "booking"
      );

      // Kombiner alt data
      const allData = [...regularContacts, ...enrichedBookings];

      // Calculate stats
      const totalLeads = allData.length;
      const pendingBookings = allData.filter(
        (item) =>
          item.type === "booking" && (item.status === "pending" || !item.status)
      ).length;
      const packageLeads = allData.filter((item) => item.type === "package");
      const monthlyRevenue = packageLeads
        .filter((item) => item.status === "converted")
        .reduce((sum, item) => sum + (item.packagePrice || 0), 0);
      const conversionRate =
        totalLeads > 0
          ? (
              (allData.filter((item) => item.status === "converted").length /
                totalLeads) *
              100
            ).toFixed(1)
          : 0;

      setStats({
        totalLeads,
        pendingBookings,
        monthlyRevenue,
        conversionRate,
      });

      setLeads(allData);
    };

    return () => {
      contactsUnsubscribe();
      bookingsUnsubscribe();
    };
  }, [user]);

  // 🔥 HANDLE FUNCTIONS
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleStatusUpdate = async (itemId, newStatus, source = "contacts") => {
    try {
      const collectionName = source === "bookings" ? "bookings" : "contacts";
      await updateDoc(doc(db, collectionName, itemId), {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleBookingAction = async (booking, action) => {
    try {
      const newStatus = action === "approve" ? "confirmed" : "rejected";
      const collectionName =
        booking.source === "bookings" ? "bookings" : "contacts";

      await updateDoc(doc(db, collectionName, booking.id), {
        status: newStatus,
        updatedAt: serverTimestamp(),
        processedAt: serverTimestamp(),
      });

      // Send confirmation email
      if (action === "approve") {
        await handleSendEmail(booking, "booking-confirmation");
      }

      alert(`Booking ${action === "approve" ? "godkendt" : "afvist"}!`);
    } catch (error) {
      console.error("Error processing booking:", error);
      alert("Fejl ved behandling af booking");
    }
  };

  const handleSendEmail = async (lead, template) => {
    try {
      await addDoc(collection(db, "mail"), {
        to: lead.email,
        template: {
          name: template,
          data: {
            customerName: lead.name,
            packageTitle: lead.packageTitle || "",
            packagePrice: lead.packagePrice || 0,
          },
        },
        createdAt: serverTimestamp(),
      });
      alert("Email sendt!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Fejl ved afsendelse af email");
    }
  };

  // 🔥 FILTERED DATA - med robust error handling
  const filteredLeads = React.useMemo(() => {
    // Early return hvis leads ikke er klar endnu
    if (!Array.isArray(leads)) {
      return [];
    }

    try {
      return leads.filter((lead) => {
        // Sikre alle værdier er strenge før toLowerCase
        const searchLower = String(searchTerm || "").toLowerCase();
        const leadName = String(lead?.name || "").toLowerCase();
        const leadEmail = String(lead?.email || "").toLowerCase();

        const matchesSearch =
          leadName.includes(searchLower) || leadEmail.includes(searchLower);
        const matchesStatus =
          statusFilter === "all" || lead?.status === statusFilter;
        return matchesSearch && matchesStatus;
      });
    } catch (error) {
      console.error("Filter error:", error);
      return [];
    }
  }, [leads, searchTerm, statusFilter]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("da-DK", {
      style: "currency",
      currency: "DKK",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-[var(--color-brand-blue)] animate-spin mx-auto mb-4" />
          <p className="text-[var(--color-foreground)]/70 font-[var(--font-body)]">
            Indlæser...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLogin={() => setUser(auth.currentUser)} />;
  }

  return (
    <div className="min-h-screen bg-[var(--color-secondary-light)]">
      {/* Header */}
      <header className="bg-[var(--color-background)] border-b border-[var(--color-primary)]/20 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-foreground)] font-[var(--font-heading)]">
              Admin Dashboard
            </h1>
            <p className="text-[var(--color-foreground)]/70 font-[var(--font-body)]">
              Administrer leads, bookings og pakker
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-[var(--color-foreground)]/70 hover:text-[var(--color-foreground)] relative">
              <Bell className="w-5 h-5" />
              {stats.pendingBookings > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 text-[var(--color-foreground)]/70 hover:text-[var(--color-foreground)] hover:bg-[var(--color-primary)]/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-[var(--font-body)]">Log ud</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[var(--color-background)] min-h-screen shadow-sm">
          <nav className="p-4 space-y-2">
            {[
              {
                id: "overview",
                label: "Oversigt",
                icon: <TrendingUp className="w-5 h-5" />,
              },
              {
                id: "leads",
                label: "Leads",
                icon: <Users className="w-5 h-5" />,
              },
              {
                id: "bookings",
                label: "Bookings",
                icon: <Calendar className="w-5 h-5" />,
              },
              {
                id: "packages",
                label: "Pakker",
                icon: <Package className="w-5 h-5" />,
              },
              {
                id: "analytics",
                label: "Analytics",
                icon: <BarChart3 className="w-5 h-5" />,
              },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors font-[var(--font-body)] ${
                  activeTab === item.id
                    ? "bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)]"
                    : "text-[var(--color-foreground)]/70 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-foreground)]"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === "overview" && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: SMOOTH_EASE }}
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Totale Leads"
                  value={stats.totalLeads}
                  icon={
                    <Users className="w-6 h-6 text-[var(--color-brand-blue)]" />
                  }
                  trend="+12% denne måned"
                />
                <StatCard
                  title="Afventende Bookings"
                  value={stats.pendingBookings}
                  icon={<Calendar className="w-6 h-6 text-yellow-600" />}
                />
                <StatCard
                  title="Månedlig Omsætning"
                  value={formatCurrency(stats.monthlyRevenue)}
                  icon={<TrendingUp className="w-6 h-6 text-green-600" />}
                  trend="+8% vs. sidste måned"
                />
                <StatCard
                  title="Konverteringsrate"
                  value={`${stats.conversionRate}%`}
                  icon={<CheckCircle className="w-6 h-6 text-purple-600" />}
                  trend="+2.4% forbedring"
                />
              </div>

              {/* Quick Actions */}
              <div className="bg-[var(--color-background)] rounded-2xl p-6 shadow-sm border border-[var(--color-primary)]/20">
                <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 font-[var(--font-heading)]">
                  Hurtige Handlinger
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab("leads")}
                    className="p-4 border border-[var(--color-primary)]/20 rounded-xl hover:bg-[var(--color-primary)]/5 text-left transition-colors group"
                  >
                    <Mail className="w-6 h-6 text-[var(--color-brand-blue)] mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="font-medium font-[var(--font-heading)]">
                      Nye Leads
                    </h4>
                    <p className="text-sm text-[var(--color-foreground)]/70 font-[var(--font-body)]">
                      {leads.filter((l) => l.status === "new").length} nye
                      henvendelser
                    </p>
                  </button>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className="p-4 border border-[var(--color-primary)]/20 rounded-xl hover:bg-[var(--color-primary)]/5 text-left transition-colors group"
                  >
                    <Calendar className="w-6 h-6 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="font-medium font-[var(--font-heading)]">
                      Bekræft Bookings
                    </h4>
                    <p className="text-sm text-[var(--color-foreground)]/70 font-[var(--font-body)]">
                      {stats.pendingBookings} bookings venter
                    </p>
                  </button>
                  <button className="p-4 border border-[var(--color-primary)]/20 rounded-xl hover:bg-[var(--color-primary)]/5 text-left transition-colors group">
                    <Download className="w-6 h-6 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="font-medium font-[var(--font-heading)]">
                      Eksporter Data
                    </h4>
                    <p className="text-sm text-[var(--color-foreground)]/70 font-[var(--font-body)]">
                      Download månedlig rapport
                    </p>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-[var(--color-background)] rounded-2xl p-6 shadow-sm border border-[var(--color-primary)]/20">
                <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4 font-[var(--font-heading)]">
                  Seneste Aktivitet
                </h3>
                <div className="space-y-3">
                  {leads.slice(0, 5).map((lead) => (
                    <div
                      key={lead.id}
                      className="flex items-center justify-between p-3 hover:bg-[var(--color-primary)]/5 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[var(--color-brand-blue)]/10 rounded-full flex items-center justify-center">
                          {lead.type === "package" ? (
                            <Package className="w-4 h-4 text-[var(--color-brand-blue)]" />
                          ) : lead.type === "booking" ? (
                            <Calendar className="w-4 h-4 text-green-600" />
                          ) : (
                            <MessageSquare className="w-4 h-4 text-purple-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium font-[var(--font-heading)]">
                            {lead.name}
                          </p>
                          <p className="text-sm text-[var(--color-foreground)]/70 font-[var(--font-body)]">
                            {lead.email}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-[var(--color-foreground)]/50 font-[var(--font-body)]">
                        {lead.createdAt &&
                          new Date(lead.createdAt.toDate()).toLocaleDateString(
                            "da-DK"
                          )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "leads" && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: SMOOTH_EASE }}
            >
              {/* Filters */}
              <div className="bg-[var(--color-background)] rounded-2xl p-6 shadow-sm border border-[var(--color-primary)]/20">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-foreground)]/40" />
                    <input
                      type="text"
                      placeholder="Søg i leads..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-[var(--color-primary)]/20 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-transparent bg-[var(--color-background)]"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 border border-[var(--color-primary)]/20 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-[var(--color-background)]"
                    >
                      <option value="all">Alle statusser</option>
                      <option value="new">Nye</option>
                      <option value="pending">Afventende</option>
                      <option value="contacted">Kontaktet</option>
                      <option value="converted">Konverteret</option>
                      <option value="closed">Lukket</option>
                    </select>
                    <button className="p-2 text-[var(--color-foreground)]/70 hover:text-[var(--color-foreground)]">
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Leads Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredLeads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onStatusUpdate={handleStatusUpdate}
                    onViewDetails={setSelectedLead}
                  />
                ))}
              </div>

              {filteredLeads.length === 0 && (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-[var(--color-foreground)]/40 mx-auto mb-4" />
                  <p className="text-[var(--color-foreground)]/70 font-[var(--font-body)]">
                    Ingen leads fundet
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "bookings" && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: SMOOTH_EASE }}
            >
              <div className="bg-[var(--color-background)] rounded-2xl p-6 shadow-sm border border-[var(--color-primary)]/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[var(--color-foreground)] font-[var(--font-heading)]">
                    Booking Administration
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)] rounded-full text-sm font-medium">
                      {
                        leads.filter(
                          (item) =>
                            item.type === "booking" &&
                            (item.status === "pending" || !item.status)
                        ).length
                      }{" "}
                      afventer behandling
                    </span>
                  </div>
                </div>

                {/* Pending Bookings */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-[var(--color-brand-blue)] rounded-full"></div>
                    <h4 className="font-medium text-[var(--color-foreground)] font-[var(--font-heading)]">
                      Afventende Godkendelse
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {leads
                      .filter(
                        (item) =>
                          item.type === "booking" &&
                          (item.status === "pending" || !item.status)
                      )
                      .map((booking) => (
                        <div
                          key={booking.id}
                          className="p-6 border border-[var(--color-brand-blue)]/20 bg-[var(--color-brand-blue)]/5 rounded-2xl hover:border-[var(--color-brand-blue)]/40 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="font-semibold font-[var(--font-heading)] text-[var(--color-foreground)] text-lg">
                              {booking.name || "Unavngiven"}
                            </h5>
                            <span className="px-3 py-1 bg-[var(--color-brand-blue)] text-white rounded-full text-xs font-medium">
                              Afventer
                            </span>
                          </div>

                          <div className="space-y-3 mb-6">
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-[var(--color-brand-blue)]" />
                              <p className="text-sm text-[var(--color-foreground)] font-[var(--font-body)]">
                                {booking.email || "Ingen email"}
                              </p>
                            </div>
                            {booking.phone && (
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-[var(--color-brand-blue)]" />
                                <p className="text-sm text-[var(--color-foreground)] font-[var(--font-body)]">
                                  {booking.phone}
                                </p>
                              </div>
                            )}
                            {(booking.dateTime ||
                              booking.formattedDateTime) && (
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-[var(--color-brand-blue)]" />
                                <p className="text-sm font-medium text-[var(--color-brand-blue)] font-[var(--font-body)]">
                                  {booking.formattedDateTime ||
                                    (booking.dateTime &&
                                      new Date(
                                        booking.dateTime.toDate
                                          ? booking.dateTime.toDate()
                                          : booking.dateTime
                                      ).toLocaleString("da-DK"))}
                                </p>
                              </div>
                            )}
                            {booking.message && (
                              <div className="flex items-start space-x-2">
                                <MessageSquare className="w-4 h-4 text-[var(--color-brand-blue)] mt-0.5" />
                                <p className="text-sm text-[var(--color-foreground)]/80 font-[var(--font-body)] italic leading-relaxed">
                                  {booking.message}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="flex space-x-3">
                            <button
                              onClick={() =>
                                handleBookingAction(booking, "approve")
                              }
                              className="flex-1 px-4 py-2 bg-[var(--color-brand-blue)] text-white rounded-lg text-sm hover:bg-[var(--color-brand-blue-darker)] transition-colors font-medium"
                            >
                              Godkend
                            </button>
                            <button
                              onClick={() =>
                                handleBookingAction(booking, "reject")
                              }
                              className="flex-1 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm hover:bg-[var(--color-primary-darkest)] transition-colors font-medium"
                            >
                              Afvis
                            </button>
                            <button
                              onClick={() => setSelectedLead(booking)}
                              className="px-4 py-2 border border-[var(--color-primary)]/20 text-[var(--color-foreground)] rounded-lg text-sm hover:bg-[var(--color-primary)]/5 transition-colors"
                            >
                              Detaljer
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>

                  {leads.filter(
                    (item) =>
                      item.type === "booking" &&
                      (item.status === "pending" || !item.status)
                  ).length === 0 && (
                    <div className="text-center py-12">
                      <Calendar className="w-12 h-12 text-[var(--color-foreground)]/40 mx-auto mb-4" />
                      <p className="text-[var(--color-foreground)]/70 font-[var(--font-body)]">
                        Ingen afventende bookings
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirmed Bookings */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-[var(--color-brand-blue-darker)] rounded-full"></div>
                    <h4 className="font-medium text-[var(--color-foreground)] font-[var(--font-heading)]">
                      Godkendte Bookings
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {leads
                      .filter(
                        (item) =>
                          item.type === "booking" && item.status === "confirmed"
                      )
                      .map((booking) => (
                        <div
                          key={booking.id}
                          className="p-6 border border-[var(--color-brand-blue-darker)]/20 bg-[var(--color-brand-blue-darker)]/5 rounded-2xl"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="font-semibold font-[var(--font-heading)] text-[var(--color-foreground)] text-lg">
                              {booking.name || "Unavngiven"}
                            </h5>
                            <span className="px-3 py-1 bg-[var(--color-brand-blue-darker)] text-white rounded-full text-xs font-medium">
                              Godkendt
                            </span>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-[var(--color-brand-blue-darker)]" />
                              <p className="text-sm text-[var(--color-foreground)] font-[var(--font-body)]">
                                {booking.email}
                              </p>
                            </div>
                            {(booking.dateTime ||
                              booking.formattedDateTime) && (
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-[var(--color-brand-blue-darker)]" />
                                <p className="text-sm font-medium text-[var(--color-brand-blue-darker)] font-[var(--font-body)]">
                                  {booking.formattedDateTime ||
                                    (booking.dateTime &&
                                      new Date(
                                        booking.dateTime.toDate
                                          ? booking.dateTime.toDate()
                                          : booking.dateTime
                                      ).toLocaleString("da-DK"))}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>

                  {leads.filter(
                    (item) =>
                      item.type === "booking" && item.status === "confirmed"
                  ).length === 0 && (
                    <div className="text-center py-8 border border-[var(--color-primary)]/10 rounded-xl bg-[var(--color-secondary-light)]">
                      <p className="text-[var(--color-foreground)]/70 font-[var(--font-body)]">
                        Ingen godkendte bookings endnu
                      </p>
                    </div>
                  )}
                </div>

                {/* Rejected Bookings */}
                {leads.filter(
                  (item) =>
                    item.type === "booking" && item.status === "rejected"
                ).length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-[var(--color-primary)] rounded-full"></div>
                      <h4 className="font-medium text-[var(--color-foreground)] font-[var(--font-heading)]">
                        Afviste Bookings
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {leads
                        .filter(
                          (item) =>
                            item.type === "booking" &&
                            item.status === "rejected"
                        )
                        .map((booking) => (
                          <div
                            key={booking.id}
                            className="p-6 border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 rounded-2xl opacity-75"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h5 className="font-semibold font-[var(--font-heading)] text-[var(--color-foreground)] text-lg">
                                {booking.name || "Unavngiven"}
                              </h5>
                              <span className="px-3 py-1 bg-[var(--color-primary)] text-white rounded-full text-xs font-medium">
                                Afvist
                              </span>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-[var(--color-primary)]" />
                                <p className="text-sm text-[var(--color-foreground)] font-[var(--font-body)]">
                                  {booking.email}
                                </p>
                              </div>
                              {booking.formattedDateTime && (
                                <div className="flex items-center space-x-2">
                                  <Calendar className="w-4 h-4 text-[var(--color-primary)]" />
                                  <p className="text-sm text-[var(--color-primary)] font-[var(--font-body)]">
                                    {booking.formattedDateTime}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedLead(null)}
        >
          <motion.div
            className="bg-[var(--color-background)] rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-[var(--font-heading)]">
                Lead Detaljer
              </h2>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 hover:bg-[var(--color-primary)]/10 rounded-lg"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 font-[var(--font-heading)]">
                  Kontakt Information
                </h3>
                <p>
                  <strong>Navn:</strong> {selectedLead.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedLead.email}
                </p>
                {selectedLead.phone && (
                  <p>
                    <strong>Telefon:</strong> {selectedLead.phone}
                  </p>
                )}
              </div>

              {selectedLead.type === "package" && (
                <div>
                  <h3 className="font-semibold mb-2 font-[var(--font-heading)]">
                    Pakke Information
                  </h3>
                  <p>
                    <strong>Pakke:</strong> {selectedLead.packageTitle}
                  </p>
                  <p>
                    <strong>Pris:</strong>{" "}
                    {formatCurrency(selectedLead.packagePrice)}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2 font-[var(--font-heading)]">
                  Besked
                </h3>
                <p className="bg-[var(--color-primary)]/5 p-3 rounded-lg font-[var(--font-body)]">
                  {selectedLead.message}
                </p>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => handleSendEmail(selectedLead, "follow-up")}
                  className="flex items-center space-x-2 px-4 py-2 bg-[var(--color-brand-blue)] text-white rounded-lg hover:opacity-90"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Follow-up</span>
                </button>
                <select
                  value={selectedLead.status}
                  onChange={(e) => {
                    handleStatusUpdate(
                      selectedLead.id,
                      e.target.value,
                      selectedLead.source
                    );
                    setSelectedLead({
                      ...selectedLead,
                      status: e.target.value,
                    });
                  }}
                  className="px-3 py-2 border border-[var(--color-primary)]/20 rounded-lg bg-[var(--color-background)]"
                >
                  <option value="new">Ny</option>
                  <option value="contacted">Kontaktet</option>
                  <option value="converted">Konverteret</option>
                  <option value="closed">Lukket</option>
                </select>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminDashboard;
