import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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

const VideoEmbed = styled.iframe`
  width: 100%;
  height: 400px;
  border: none;
`;

const RecommendationPage = () => {
  const { topic } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);

      try {
        // Log to verify the topic being searched
        console.log("Searching for topic:", topic);

        // Replace 'YOUR_VIMEO_API_KEY' with your actual Vimeo access token
        const response = await axios.get("https://api.vimeo.com/videos", {
          headers: {
            Authorization: `Bearer 12f1b05cf0665b9619202a3db085eb42`,
          },
          params: {
            query: topic, // Use the topic from the URL parameter
            per_page: 5,   // Limit results to 5 videos
          },
        });

        // Log the response to check the data structure
        console.log("Vimeo API Response: ", response.data);

        // Extract and set the video data
        setVideos(response.data.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [topic]);

  return (
    <Wrapper>
      <Title>Recommended Content for: {topic}</Title>
      {loading ? (
        <p>Loading videos...</p>
      ) : (
        <ResourceSection>
          {videos.length === 0 ? (
            <p>No videos found for "{topic}". Try another search.</p>
          ) : (
            videos.map((video) => {
              // Extract the video ID from the URI and use it for embedding
              const videoId = video.uri.split("/").pop();
              const videoEmbedUrl = `https://player.vimeo.com/video/${videoId}`;

              return (
                <ResourceBox key={video.uri}>
                  <h4>{video.name}</h4>
                  <VideoEmbed
                    src={videoEmbedUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></VideoEmbed>
                </ResourceBox>
              );
            })
          )}
        </ResourceSection>
      )}
    </Wrapper>
  );
};

export default RecommendationPage;
