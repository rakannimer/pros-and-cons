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
  height: 100%;
  /* min-height: 60px; */
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
const ExportButtonContainer = styled.div`
  flex: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid ${colors.white} 1px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 50px;
  margin-right: 10px;
`;

const ListTitleAndItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 60vh;
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
              <ListTitleAndItemsContainer>
                <ListTitle>PROS</ListTitle>
                <ListItems>
                  <ListItem />
                  <ListItem />
                </ListItems>
              </ListTitleAndItemsContainer>
              <ListFooter>
                <AddArgumentButton>
                  <div>icon</div>
                  <div>Add</div>
                </AddArgumentButton>
              </ListFooter>
            </ProsList>
            <ConsList>
              <ListTitleAndItemsContainer>
                <ListTitle>CONS</ListTitle>
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
              </ListTitleAndItemsContainer>
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
