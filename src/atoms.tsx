import styled from "styled-components";
import { colors } from "./colors";

export const AppContainer = styled.div`
  background-color: ${colors.black};
  height: 100vh;
  width: 100vw;
  display: flex;
  font-family: "Roboto", sans-serif;
  /* font-family: "Montserrat", sans-serif; */
`;
// font-family: 'Roboto', sans-serif;
export const LeftSidebar = styled.div`
  height: 100vh;
  width: 10vw;
  background: ${colors.gray};
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  /* position: fixed; */
`;

export const LeftSidebarHome = styled.div`
  margin-top: 14vh;
`;

export const PageHeader = styled.div`
  width: 100%;
  background: ${colors.gray};
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
`;

export const ProjectTitleAndShareContainer = styled.div`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${colors.blue};
  color: ${colors.white};
  /* background: gold; */
`;

export const ProsAndConsAndRightSidebar = styled.div`
  width: 100%;
  height: 80vh;
  /* background: green; */
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 40%;
  min-width: 300px;
  text-align: center;
  margin-bottom: 10px;
  max-height: 70vh;
  /* background: ${colors.gray}; */
  /* border: solid 1px black; */
  /* background: blue; */
`;

export const ConsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 40%;
  min-width: 300px;
  text-align: center;
  margin-bottom: 10px;
  max-height: 60vh;
  background: ${colors.gray};
`;

export const RightSidebar = styled.div`
  background: ${colors.gray};
  width: 15vw;
`;

export const AppWithoutLeftSidebar = styled.div`
  width: 90%;
  /* background: pink; */
`;

export const ListTitle = styled.div`
  width: 100%;
  background: ${colors.black};
  min-height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.5em;
  color: ${colors.white};
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
`;

export const ListItems = styled.div`
  /* max-height: 50vh; */
  width: 100%;
  border: solid 1px black;
  /* background: black; */
  flex: 1;
  overflow: auto;
`;

export const ListItemContainer = styled.div`
  display: flex;
  min-height: 60px;
  border-bottom: solid 1px ${colors.lightgray};
  color: ${colors.white};
  padding: 10;
`;

export const ArgumentDescriptionContainer = styled.div`
  flex: 3;
  /* background: yellow; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  margin-top: 5px;
`;

export const ArgumentWeightContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: papayawhip; */
`;

export const ArgumentDeleteContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: orangered; */
`;
