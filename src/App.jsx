import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import menu from "./data/menu.json";

import Home from "./components/Home";
import ReservationForm from "./components/ReservationForm";
import ReservationList from "./components/ReservationList";
import TopBar from "./components/TopBar";
import NotFound from "./components/NotFound";
import MenuList from "./components/MenuList";
import PastaDetails from "./components/PastaDetails";
import ClassComponent from "./components/ClassComponent";

// ROUTING IN REACT

// per fare in modo di poter avere un cambio di pagina effettivo, seppur virtuale, in una SPA (Single Page Application)
// dovremo avvalerci di un sistema che renderizzi in maniera CONDIZIONALE i componenti a partire da un indirizzo URL,
// in modo che i componenti riflettano il cambio di pagina per quel dato indirizzo

// quindi implementiamo il pacchetto react-router-dom con questo comando:
// npm i react-router-dom

// a questo punto possiamo importare i 3 componenti fondamentali per il funzionamento di questa meccanica (cambio pagina virtuale):
// BrowserRouter, Routes, Route.

// 1) BrowserRouter permette agli altri due componenti Routes e Route di funzionare: lo inseriamo come CORNICE DI TUTTO il contenuto da rendere dinamico.
// Anche la TopBar nonostante non sia renderizzata condizionalmente, dovrà stare all'interno di BrowserRouter per poter usare il componente <Link />
// al suo interno per dirottare l'utente su altre pagine

// 2) Routes sarà il secondo componente da utilizzare DENTRO a BrowserRouter (l'ordine è importante!)
// Potremo usare un Routes solo con BrowserRouter all'esterno
// Con Routes delimiteremo solamente il contenuto da rendere DINAMICO (visibile condizionalmente)
// quindi delle rotte singole che attiveranno il proprio Component quando ci sarà corrispondenza tra path nella URL e il path specificato come prop
// della rotta.

// 3) Route è il componente che può esiste solo DENTRO Routes e dovrà contenere il componente da renderizzare e definire a quale path
// corrisponderà l'attivazione del componente

function App() {
  return (
    <BrowserRouter>
      <TopBar claim="— Niente secondi piatti" />
      <Routes>
        {/* i componenti possono tranquillamente ricevere props al loro interno */}
        <Route path="/" element={<Home menu={menu} />} />
        <Route path="/prenotazioni" element={<ReservationList />} />
        <Route path="/prenota-tavolo" element={<ReservationForm />} />
        <Route path="/menu" element={<MenuList menu={menu} />} />
        {/* 
          applicando i : dopo lo slash renderà quella parte di rotta DINAMICA
          significa che potremo leggere il dato dinamico da dentro il componente ritrovandolo con lo stesso nome applicato dopo i :
        */}
        <Route path="/menu/dettagli/:pastaId" element={<PastaDetails menu={menu} />} />
        <Route path="/class-component/:dynamicParam" element={<ClassComponent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
