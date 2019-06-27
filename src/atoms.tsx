import styled from "styled-components";

export const AppContainer = styled.div`
  background-color: beige;
  height: 100vh;
  width: 100vw;
  display: flex;
`;

export const LeftSidebar = styled.div`
  height: 100vh;
  width: 10vw;

  background: brown;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  /* position: fixed; */
`;

export const LeftSidebarHome = styled.div``;

export const PageHeader = styled.div`
  width: 100%;
  background: blue;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

export const ProjectTitle = styled.div`
  height: 10vh;
  background: gold;
`;

export const ProsAndConsAndRightSidebar = styled.div`
  width: 100%;
  height: 80vh;
  background: green;
  display: flex;
`;

export const ProsAndConsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  overflow: auto;
`;

export const ProsList = styled.div`
  width: 40%;
  min-width: 300px;
  text-align: center;
  background: pink;
  margin-bottom: 10px;
`;

export const ConsList = styled.div`
  width: 40%;
  min-width: 300px;
  text-align: center;
  background: pink;
  margin-bottom: 10px;
`;

export const RightSidebar = styled.div`
  background: skyblue;
  width: 15%;
`;

export const AppWithoutLeftSidebar = styled.div`
  width: 90%;
  background: pink;
`;

export const ListTitle = styled.div`
  width: 100%;
  background: royalblue;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ListItems = styled.div``;

export const ListItemContainer = styled.div`
  display: flex;
  background: gray;
  min-height: 60px;
  border-bottom: solid 1px black;
`;

export const ArgumentDescriptionContainer = styled.div`
  flex: 3;
  background: yellow;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ArgumentWeightContainer = styled.div`
  flex: 1;
  background: papayawhip;
`;

export const ArgumentDeleteContainer = styled.div`
  flex: 1;
  background: orangered;
`;
