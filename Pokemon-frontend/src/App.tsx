import { BrowserRouter, Route, Routes } from "react-router";
import { lazy, Suspense, useState } from "react";
import Header from "./layout/header";
import Footer from "./layout/footer";
import { AuthContext, AuthToken } from "./context/AuthContext";
import React from "react";
import AdminLayout from "./layout/AdminLayout";

// Admin  routes
const Pokemon = lazy(() => import("./User-pages/Pokemon"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Moves = lazy(() => import("./pages/moves"));
const Pokedex = lazy(() => import("./pages/pokedex"));
const Types = lazy(() => import("./pages/types"));
const Weakness = lazy(() => import("./pages/weakness"));
const Region = lazy(() => import("./pages/regions"));
// Edit componenets
const EditPokedex = lazy(() => import("./components/Edit/EditPokedex"));
const EditRegion = lazy(() => import("./components/Edit/EditRegion"));
const EditType = lazy(() => import("./components/Edit/EditTypes"));
const EditMove = lazy(() => import("./components/Edit/EditMoves"));
// create componenets
const CreateRegion = lazy(() => import("./components/Create/CreateRegion"));
const CreateMoves = lazy(() => import("./components/Create/CreateMoves"));
const CreatePokedex = lazy(() => import("./components/Create/CreatePokedex"));
const CreateTypes = lazy(() => import("./components/Create/CreateTypes"));

// Noramal user routes
const PokemonDetails = lazy(() => import("./User-pages/PokemonDetail"));
const Signup = lazy(() => import("./authenticate/singup"));
const Login = lazy(() => import("./authenticate/login"));
const Search = lazy(() => import("./User-pages/Search"));
const RegionDetail = lazy(() => import("./User-pages/RegionDetail"));

function App() {
  const [auth, setAuth] = useState<AuthToken>({
    token: localStorage.getItem("token"),
  });

  const changeAuth = (token: string) => {
    localStorage.setItem("token", token);
    setAuth({ token });
  };

  return (
    <AuthContext.Provider value={{ auth, changeAuth }}>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<p>Loading.....</p>}>
          <Routes>
            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="move" element={<Moves />}></Route>
              <Route path="pokedex" element={<Pokedex />}></Route>
              <Route path="type" element={<Types />}></Route>
              <Route path="weakness" element={<Weakness />}></Route>
              <Route path="region" element={<Region />}></Route>
              {/* edit button */}
              <Route path="/admin/pokedex/:id" Component={EditPokedex} />
              <Route path="/admin/region/:id" Component={EditRegion} />
              <Route path="/admin/type/:id" Component={EditType} />
              <Route path="/admin/move/:id" Component={EditMove} />
              {/* create button */}
              <Route path="/admin/CreateRegion" Component={CreateRegion} />
              <Route path="/admin/CreateMoves" Component={CreateMoves} />
              <Route path="/admin/CreatePokedex" Component={CreatePokedex} />
              <Route path="/admin/CreateType" Component={CreateTypes} />
            </Route>
            {/* normal routes */}
            <Route path="/" element={<Pokemon />} />
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/Pokemons/:id" element={<PokemonDetails />}></Route>
            <Route path="/Pokemons" element={<Search />}></Route>
            <Route path="/regions/:id" element={<RegionDetail />}></Route>
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
