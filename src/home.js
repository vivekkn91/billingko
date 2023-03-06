import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import Sidebar from "./components/side";
import PageOne from "./components/pageOne";

function App() {
  return (
    <div className="App">
      <body id="body-pd">
        <Header />
        {/* <Sidebar /> */}
        <div className="height-100 bg-light">
          <PageOne />
        </div>
      </body>
    </div>
  );
}

export default App;
