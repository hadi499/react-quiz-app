import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./views/Home";
import { ListQuiz } from "./views/english/ListQuiz";
import { PluralSingular } from "./views/english/PluralSingular";
import { Noun } from "./views/english/Noun";
import { Penjumlahan } from "./views/math/Penjumlahan";
import { ListQuizMath } from "./views/math/ListQuizMath";
import { Perkalian } from "./views/math/Perkalian";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav className="flex justify-center items-center h-12 shadow-lg bg-white">
          <Link to="/" className="text-indigo-800 font-semibold">
            Beranda
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/english" element={<ListQuiz />} />
          <Route path="/math" element={<ListQuizMath />} />
          <Route path="/english/plural-singular" element={<PluralSingular />} />
          <Route path="/english/word" element={<Noun />} />
          <Route path="/math/penjumlahan" element={<Penjumlahan />} />
          <Route path="/math/perkalian" element={<Perkalian />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
