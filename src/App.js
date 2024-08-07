
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Topbar";
import { UserProvider } from "./context/UserContext";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import CreatorsLink from "./pages/CreatorsLink";
import CustomerSupport from "./pages/CustomerSupport";
import ProductDetails from "./pages/ProductDetails";
import Receipt from "./pages/Receipt";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./App.css";
import Footer from "./components/Footer";
const stripePromise = loadStripe(
  "pk_test_51PgqytRtWWL31ZdbCxkYslRowxBNzcIQDGyc9UnwGt0LB9NZz47vybBXudbMOM2Svb2NNl8gI7BMRGFBstleOQkf00qt1iL1ii"
);

function App() {
  const [user, setUser] = useState();

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider value={[user, setUser]}>
        <Navbar />
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/:creatorUsername" Component={CreatorsLink} />
            <Route path="/cart" Component={Cart} />
            <Route path="/CheckOut" Component={CheckOut} />
            <Route
              path="/productdetails/:productId"
              Component={ProductDetails}
            />
            <Route path="/Receipt/:receiptId" Component={Receipt} />
            <Route path="/customersupport" Component={CustomerSupport} />
          </Routes>
        </Elements>
        <Footer />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
