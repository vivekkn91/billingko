// export default App;
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import Sidebar from "./components/billsidepanel";
import PageOne from "./components/pageOne";
import Cart from "./components/cart";
import { useState, useEffect } from "react";
function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  return (
    <div className="App">
      <div id="body-pd">
        <Header />
        <Sidebar
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        <div className="height-100 bg-light">
          <PageOne selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>
  );
}

export default App;
