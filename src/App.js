/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home"
import ReadWrite1 from "./ReadWrite1";
import ReadWrite2 from "./ReadWrite2";
import ReadWrite3 from "./ReadWrite3";
import RW_Quiz1 from "./RW_Quiz1";
import RW_Quiz2 from "./RW_Quiz2";
import RW_Quiz3 from "./RW_Quiz3";
import Visual1 from "./Visual1";
import Visual_Quiz1 from "./Visual_Quiz1"
import Visual2 from "./Visual2";
import Visual_Quiz2 from "./Visual_Quiz2"
import Result from "./Result"
import SearchPage_V from "./SearchPage_V";
import SearchPage_R from "./SearchPage_R";
import RecommendationPage_V from "./RecommandPage_V";
import RecommendationPage_R from "./RecommandPage_R";
import Kinesthetic1 from "./Kinesthetic1";
import Kinesthetic2 from "./kinesthetic2";
import Kinesthetic_Quiz1 from "./Kinesthetic_Quiz1";
import Audio from "./Audio";
import A_Quiz from "./Audio_Quiz";
import { ScoreProvider } from "./ScoreProvider";

function App() {
  return (
    <ScoreProvider>
      <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/readwrite1" element={<ReadWrite1 />} />
          <Route path="/readwrite2" element={<ReadWrite2 />} />
          <Route path="/readwrite3" element={<ReadWrite3 />} />
          <Route path="/rw_quiz1" element={<RW_Quiz1 />} />
          <Route path="/rw_quiz2" element={<RW_Quiz2 />} />
          <Route path="/rw_quiz3" element={<RW_Quiz3 />} />
          <Route path="/visual1" element={<Visual1 />} />
          <Route path="/vquiz1" element={<Visual_Quiz1 />} />
          <Route path="/visual2" element={<Visual2 />} />
          <Route path="/vquiz2" element={<Visual_Quiz2 />} />
          <Route path="/kinesthetic1" element={<Kinesthetic1/>} />
          <Route path="/kinesthetic2" element={<Kinesthetic2/>} />
          <Route path="/kinesthetic_quiz1" element={<Kinesthetic_Quiz1 />}/>
          <Route path="/audio" element={<Audio />}/>
          <Route path="/a_quiz" element={<A_Quiz />}/>
          <Route path="/result" element={<Result />} />
          <Route path="/Vsearch" element={<SearchPage_V />}/>
          <Route path="/Rsearch" element={<SearchPage_R />}/>
          <Route path="/video/:topic" element={<RecommendationPage_V />}/>
          <Route path="/read/:topic" element={<RecommendationPage_R />}/>
        </Routes>
      </div>
    </Router>
    </ScoreProvider>

  );
}

export default App;
