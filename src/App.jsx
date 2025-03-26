import { Nav } from "src/components/Nav";
import { RecipePage } from "src/pages/RecipePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export function App() {
  return (
    <div className="relative min-w-[375px] bg-teal700">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<RecipePage />} />
        </Routes>
      </Router>
    </div>
  );
}
