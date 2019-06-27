import * as React from "react";
import { render } from "react-dom";

import styled from "styled-components";

import {
  AppContainer,
  LeftSidebar,
  LeftSidebarHome,
  PageHeader,
  ProjectTitle,
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

function ListItem() {
  return (
    <ListItemContainer>
      <ArgumentDescriptionContainer>item 1</ArgumentDescriptionContainer>
      <ArgumentWeightContainer />
      <ArgumentDeleteContainer />
    </ListItemContainer>
  );
}

const ListFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: violet;
  min-height: 60px;
`;

const AddArgumentButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <AppContainer>
      <LeftSidebar>
        <LeftSidebarHome>H</LeftSidebarHome>
      </LeftSidebar>
      <AppWithoutLeftSidebar>
        <PageHeader>Pros & Cons</PageHeader>
        <ProjectTitle />
        <ProsAndConsAndRightSidebar>
          <ProsAndConsContainer>
            <ProsList>
              <ListTitle>Pro ss</ListTitle>
              <ListItems style={{ border: "solid 1px black" }}>
                <ListItem />
                <ListItem />
              </ListItems>
              <ListFooter>
                <AddArgumentButton>
                  <div>icon</div>
                  <div>Add</div>
                </AddArgumentButton>
              </ListFooter>
            </ProsList>
            <ConsList>
              <ListTitle>Cons</ListTitle>
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
