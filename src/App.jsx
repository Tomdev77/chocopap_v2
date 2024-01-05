import "./styles/App.css";
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageFicheProduit from "./pages/PageFicheProduit";
import BoutiqueSection from "./pages/BoutiqueSection";
import Footer from "./components/footer";
import { PanierContextProvider } from "./store/panier-context"; // Import PanierContextProvider
import Navbar from "./components/Navbar";

function App() {


return (
<Router>
<PanierContextProvider> {/* Wrap your application with PanierContextProvider */}
<div className="App">
<Navbar/>
<Switch>
<Route path="/" exact component={Homepage} />
<Route path="/boutique" component={BoutiqueSection} />
<Route path="/ficheproduit" component={PageFicheProduit} />
</Switch>
<Footer />
</div>
</PanierContextProvider>
</Router>
);
}

export default App;
