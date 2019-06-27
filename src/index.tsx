import * as React from "react";
import { render } from "react-dom";

import styled from "styled-components";

import {
  AppContainer,
  LeftSidebar,
  LeftSidebarHome,
  PageHeader,
  ProjectTitleAndShareContainer,
  ProsAndConsAndRightSidebar,
  ProsAndConsContainer,
  ProsList,
  ConsList,
  RightSidebar,
  AppWithoutLeftSidebar,
  ListTitle,
  ListItems,
  ListItemContainer,
  ArgumentDescriptionContainer,
  ArgumentWeightContainer,
  ArgumentDeleteContainer
} from "./atoms";

import "./styles.css";
import { colors } from "./colors";
import { range } from "./utils";

function ListItem() {
  return (
    <ListItemContainer>
      <ArgumentDescriptionContainer
        onInput={ev => {
          console.log("Value is ", ev.currentTarget.innerText);
        }}
        contentEditable
      >
        Lorem Ipsum Dorum jhjhjhsdsdsdsds
      </ArgumentDescriptionContainer>
      <ArgumentWeightContainer>
        <select>
          {range(1, 10).map(w => (
            <option key={w}>{w}</option>
          ))}
        </select>
      </ArgumentWeightContainer>
      <ArgumentDeleteContainer>
        <div>x</div>
      </ArgumentDeleteContainer>
    </ListItemContainer>
  );
}

const ListFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: violet; */
  /* height: 100%; */
  /* min-height: 60px; */
  min-height: 8vh;
  width: 100%;
  bottom: 0;
`;

const AddArgumentButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProjectTitleContainer = styled.div`
  flex: 6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;
const ExportButtonContainer = styled.button`
  flex: 0.8;
  background: inherit;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid ${colors.white} 1px;
  height: 5vh;
  border-radius: 50px;
  margin-right: 10px;
  font-family: "Montserrat", sans-serif;
`;

const ListItemsAndFooter = styled.div`
  width: 100%;
  background: ${colors.gray};
`;

function App() {
  return (
    <AppContainer>
      <LeftSidebar>
        <LeftSidebarHome>H</LeftSidebarHome>
      </LeftSidebar>
      <AppWithoutLeftSidebar>
        <PageHeader>PROS & CONS</PageHeader>
        <ProjectTitleAndShareContainer>
          <ProjectTitleContainer>Lorem Ipsum</ProjectTitleContainer>
          <ExportButtonContainer>
            Export
            <div>+</div>
          </ExportButtonContainer>
        </ProjectTitleAndShareContainer>
        <ProsAndConsAndRightSidebar>
          <ProsAndConsContainer>
            <ProsList>
              <ListTitle>PROS</ListTitle>
              <ListItemsAndFooter>
                <ListItems>
                  <ListItem />
                  <ListItem />
                </ListItems>
                <ListFooter>
                  <AddArgumentButton>
                    <div>icon</div>
                    <div>Add</div>
                  </AddArgumentButton>
                </ListFooter>
              </ListItemsAndFooter>
            </ProsList>

            <ConsList>
              <ListTitle>CONS</ListTitle>
              <ListItemsAndFooter>
                <ListItems>
                  <ListItem />
                  <ListItem />
                </ListItems>
                <ListFooter>
                  <AddArgumentButton>
                    <div>icon</div>
                    <div>Add</div>
                  </AddArgumentButton>
                </ListFooter>
              </ListItemsAndFooter>
            </ConsList>
          </ProsAndConsContainer>
          <RightSidebar>Sidebar</RightSidebar>
        </ProsAndConsAndRightSidebar>
      </AppWithoutLeftSidebar>
    </AppContainer>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
