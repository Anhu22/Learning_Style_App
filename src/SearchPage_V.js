import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, rgb(166, 243, 243), rgb(244, 180, 250));
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border-radius: 5px;
  width: 300px;
  text-align: center;
`;

const SearchPage = () => {
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!topic.trim()) return;
    navigate(`/video/${topic}`);
  };

  return (
    <Wrapper>
      <Title>Search for Videos</Title>
      <SearchBar
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic to search"
      />
      <button onClick={handleSearch}>Search</button>
    </Wrapper>
  );
};

export default SearchPage;
