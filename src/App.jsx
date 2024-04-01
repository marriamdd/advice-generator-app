import { useState, useEffect } from "react";
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
          <>
            <h1>ADVICE {` # ${data.slip.id}`}</h1>
            <AdviceContainer>
              <p>{data.slip.advice}</p>
            </AdviceContainer>
          </>
        )}
        <button onClick={handleClick}>Advice</button>
      </Main>
    </>
  );
}

const Main = styled.main`
  width: 343px;
  height: 315px;
  & > h1 {
    color: var(--Neon-Green, #53ffaa);
    text-align: center;
    font-family: Manrope;
    font-size: 11px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 3.457px;
  }
`;

const AdviceContainer = styled.div`
  border-radius: 10px;
  background: var(--Dark-Grayish-Blue, #313a48);
  box-shadow: 30px 50px 80px 0px rgba(0, 0, 0, 0.1);
  width: 343px;
  height: 315px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7.9rem 2.4rem;

  & > p {
    color: var(--Light-Cyan, #cee3e9);
    text-align: center;
    font-family: Manrope;
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: -0.257px;
  }
`;
export default App;
