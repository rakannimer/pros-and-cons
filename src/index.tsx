import * as React from "react";
import { render } from "react-dom";
import styled from "styled-components";
import "./styles.css";

const HEADER_HEIGHT = 60;

const AppContainer = styled.div`
  background-color: beige;
  height: 100vh;
  width: 100vw;
  display: flex;
`;
const LeftSidebar = styled.div`
  height: 100vh;
  width: 10vw;

  background: brown;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  /* position: fixed; */
`;

const LeftSidebarHome = styled.div``;

const PageHeader = styled.div`
  width: 100%;
  background: blue;
  height: 10vh;
`;

const ListTitle = styled.div`
  height: 10vh;
  background: gold;
`;

const ProsAndConsAndRightSidebar = styled.div`
  width: 100%;
  height: 80vh;
  background: green;
  display: flex;
`;

const ProsAndConsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  overflow: auto;
`;

const ProsList = styled.div`
  width: 40%;
  min-width: 300px;
  text-align: center;
  background: pink;
  margin-bottom: 10px;
`;

const ConsList = styled.div`
  width: 40%;
  min-width: 300px;
  text-align: center;
  background: pink;
  margin-bottom: 10px;
`;

const ListHeader = styled.div`
  width: 30vw;
`;

const RightSidebar = styled.div`
  background: skyblue;
  width: 15%;
`;

const PageCenter = styled.div`
  width: 90%;
  background: pink;
`;

function App() {
  return (
    <AppContainer>
      <LeftSidebar>
        <LeftSidebarHome>H</LeftSidebarHome>
      </LeftSidebar>
      <PageCenter>
        <PageHeader />
        <ListTitle />
        <ProsAndConsAndRightSidebar>
          <ProsAndConsContainer>
            <ProsList>Pros</ProsList>
            <ConsList>Cons</ConsList>
          </ProsAndConsContainer>
          <RightSidebar>Sidebar</RightSidebar>
        </ProsAndConsAndRightSidebar>
      </PageCenter>
    </AppContainer>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
