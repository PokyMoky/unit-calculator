import './App.css'
import Layout from "./components/layout/Layout.jsx";
import HeroSection from "./components/layout/main/HeroSection.jsx";
import Calculator from "./components/layout/main/calculator/Calculator.jsx";
import About from "./components/layout/main/About.jsx";

function App() {

   return (
      <>
         <Layout>
            <HeroSection/>
            <div className="back">
               <Calculator/>
               <About/>
            </div>
         </Layout>
      </>
   )
}

export default App
