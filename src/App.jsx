import { useState ,useEffect } from "react";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();

      setData(jsonData);
    } catch (error) {
      setError(error);
    }
  }
  const handleClick = () => {
    fetchData();
  };
  return (
    <>
      <GlobalStyles />
      <Main>
        {data && (
          <AdviceContainer>
            <p>{data.slip.advice}</p>
          </AdviceContainer>
        )}
        <button onClick={handleClick}>Advice</button>
      </Main>
    </>
  );
}

const Main = styled.main`
  width: 343px;
  height: 315px;
`;

const AdviceContainer = styled.p`
  border-radius: 10px;
  background: var(--Dark-Grayish-Blue, #313a48);
  box-shadow: 30px 50px 80px 0px rgba(0, 0, 0, 0.1);
  width: 343px;
  height: 315px;
  flex-shrink: 0;
`;
export default App;
