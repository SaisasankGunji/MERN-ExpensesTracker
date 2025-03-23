import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroSection from "./components/Home/HomePage";
import PrivateSection from "./components/Home/PrivatePage";
import PublicNavbar from "./components/NavBar/PublicNavbar";
import LoginForm from "./components/Users/Login";
import { useSelector } from "react-redux";
import RegistrationForm from "./components/Users/Register";
import PrivateNavbar from "./components/NavBar/PrivateNavbar";
import { getUserFromStorage } from "./utils/getUserFromStorage";
import AddCategory from "./components/Category/AddCategory";
import CategoriesList from "./components/Category/CategoriesList";
import UpdateCategory from "./components/Category/UpdateCategory";
import TransactionForm from "./components/Transactions/TransactionForm";
import UpdateTransaction from "./components/Transactions/UpdateTransaction"; // Import the update transaction component
import Dashboard from "./components/Users/Dashboard";
import UserProfile from "./components/Users/UserProfile";
import AuthRoute from "./components/Auth/AuthRoute";

function App() {
  const user = useSelector((state) => state?.auth?.user);
  const token = getUserFromStorage();

  return (
    <BrowserRouter>
      {/* Navbar */}
      {user ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/home" element={<PrivateSection />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route
          path="/add-category"
          element={
            <AuthRoute>
              <AddCategory />
            </AuthRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <AuthRoute>
              <CategoriesList />
            </AuthRoute>
          }
        />
        <Route
          path="/update-category/:id"
          element={
            <AuthRoute>
              <UpdateCategory />
            </AuthRoute>
          }
        />
        <Route
          path="/add-transaction"
          element={
            <AuthRoute>
              <TransactionForm />
            </AuthRoute>
          }
        />
        {/* New Route for Updating Transactions */}
        <Route
          path="/update-transaction/:id"
          element={
            <AuthRoute>
              <UpdateTransaction />
            </AuthRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <UserProfile />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
