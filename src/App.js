import { Route, Routes, useNavigate } from "react-router-dom";
import UserContext, { UserProvider } from "./context/UserContext";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/NavBar";
import CreatorsLink from "./pages/CreatorsLink";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import ProductDetails from "./pages/ProductDetails";
import Receipt from "./pages/Receipt";
import CustomerSupport from "./pages/CustomerSupport";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

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
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
