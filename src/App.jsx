import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./views/Home";
import { ListQuiz } from "./views/english/ListQuiz";
import { PluralSingular } from "./views/english/PluralSingular";


function App() {
  return (
    <>
      <BrowserRouter>
        <nav className="flex justify-center items-center h-12 shadow-lg bg-white">

          <Link to="/" className="text-indigo-800 font-semibold">Beranda</Link>


        </nav>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/english" element={<ListQuiz />} />
          <Route path="/english/plural-singular" element={<PluralSingular />} />


        </Routes>
      </BrowserRouter >
    </>


  );
}

export default App;