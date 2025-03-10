import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "../pages/Post/Home";
import PostPage from "../pages/Post/PostPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

