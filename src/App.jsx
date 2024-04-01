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
          <div>
            <h1>ADVICE {` #${data.slip.id}`}</h1>
            <AdviceContainer>
              <p>{data.slip.advice}</p>
            </AdviceContainer>
          </div>
        )}
        <img
          src="/images/pattern-divider-mobile.svg"
          alt="pattern-divider-mobile"
        />
        <Button onClick={handleClick}>
          <img src="/images/Group 3.svg" alt="button-icon" />
        </Button>
      </Main>
    </>
  );
}

const Main = styled.main`
  position: relative;

  & > div {
    position: relative;
  }

  & > div h1 {
    color: var(--Neon-Green, #53ffaa);
    text-align: center;
    font-family: Manrope;
    font-size: 11px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 3.457px;
    position: absolute;
    top: 5rem;
    right: 11.5rem;
    @media (min-width: 768px) {
      right: 22.5rem;
    }
  }

  & > img {
    position: absolute;
    bottom: 12rem;
    left: 2.5rem;

    @media (min-width: 768px) {
      content: url("/images/pattern-divider-desktop.svg ");
      left: 5rem;
    }
  }
`;

const Button = styled.button`
  width: 64px;
  height: 64px;
  background-color: transparent;
  border: none;
  position: relative;
  :hover {
    box-shadow: 0 4px 8px hsla(150, 100%, 66%, 0.5);
  }
  & > img {
    position: absolute;
    top: -3rem;
    left: 14.2rem;
    border-radius: 50%;
    cursor: pointer;

    @media (min-width: 768px) {
      left: 24.5rem;
    }
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

  @media (min-width: 768px) {
    width: 54rem;
    height: 33.2rem;
  }

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
