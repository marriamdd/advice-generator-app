import { useState } from "react";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
        console.log("jsonData");
      }
      const jsonData = await response.json();
      console.log(jsonData);
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
        <button onClick={handleClick}>Advice</button>
        {data && <AdviceContainer><p>{data.slip.advice}</p></AdviceContainer>}
      </Main>
    </>
  );
}

const Main = styled.main`
  width: 343px;
  height: 315px;
 
`;

const AdviceContainer = styled.p`
  color: wheat;
  
  color: #c8c2c2;
 

`;
export default App;
