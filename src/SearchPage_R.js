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

const SearchBox = styled.input`
  padding: 10px;
  width: 300px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e55347;
  }
`;

const SearchPage = () => {
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (topic.trim()) {
      // Redirect to the RecommendationPage with the search query
      navigate(`/read/${topic}`);
    }
  };

  return (
    <Wrapper>
      <Title>Search for Learning Resources</Title>
      <SearchBox
        type="text"
        placeholder="Enter a topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </Wrapper>
  );
};

export default SearchPage;
