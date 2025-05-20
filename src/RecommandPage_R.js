import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

const ResourceSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
`;

const ResourceBox = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const RecommendationPage = () => {
  const { topic } = useParams();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const learningStyle = localStorage.getItem("learningStyle") || "Balanced";

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);

      // Simulate fetching text-based resources (replace with real API if needed)
      const textResources = [
        {
          title: `Learn About ${topic} - Wikipedia`,
          url: `https://en.wikipedia.org/wiki/${topic}`,
        },
        {
          title: `Introduction to ${topic}`,
          url: `https://www.khanacademy.org/search?page_search_query=${topic}`,
        },
        {
          title: `In-depth Article on ${topic}`,
          url: `https://www.researchgate.net/search.Search.html?type=publication&query=${topic}`,
        },
      ];

      // Simulate loading text-based resources based on the topic
      setResources(textResources);
      setLoading(false);
    };

    fetchResources();
  }, [topic]);

  return (
    <Wrapper>
      <Title>Recommended Content for: {topic}</Title>
      <h3>Your Learning Style: <strong>{learningStyle}</strong></h3>

      {loading ? (
        <p>Loading resources...</p>
      ) : (
        <ResourceSection>
          {resources.length === 0 ? (
            <p>No resources found for "{topic}". Try another search.</p>
          ) : (
            resources.map((resource, index) => (
              <ResourceBox key={index}>
                <h4>{resource.title}</h4>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  Visit Resource
                </a>
              </ResourceBox>
            ))
          )}
        </ResourceSection>
      )}
    </Wrapper>
  );
};

export default RecommendationPage;
