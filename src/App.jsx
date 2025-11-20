import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import InPersonTraining from "./components/InPersonTraining";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entrenamiento-presencial" element={<InPersonTraining />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;
