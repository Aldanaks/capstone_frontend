import { Route, Routes, useNavigate } from "react-router-dom";
import UserContext, { UserProvider } from "./context/UserContext";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CreatorsLink from "../pages/CreatorsLink";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import ProductDetails from "./pages/ProductDetails";
import Receipt from "./pages/Receipt";
import CustomerSupport from "./pages/CustomerSupport";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser(true);
    }
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider value={[user, setUser]}>
        <Navbar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/:creatorUsername" Component={CreatorsLink} />
          <Route path="/cart" Component={Cart} />
          <Route path="/CheckOut" Component={CheckOut} />
          <Route path="/productdetails/:productId" Component={ProductDetails} />
          <Route path="/Receipt" Component={Receipt} />
          <Route path="/customersupport" Component={CustomerSupport} />
        </Routes>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
