import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Review from "./Review";
import AddQuestion from "./AddQuestion";
import PageNotFound from "./PageNotFound";
import Question from "./Question";
import Navbar from "./Navbar";
import EditQuestion from "./EditQuestion";
import Quiz from "./Quiz";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/questions" element={<Review />} />
            <Route path="/questions/:questionId" element={<Question />} />
            <Route path="/questions/edit/:questionId" element={<EditQuestion/>} />
            <Route path="/addQuestion" element={<AddQuestion />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
