import React from "react";
import styled, { css } from "styled-components";

export const List = styled.ul`
  box-sizing: border-box;
  position: relative;
  padding: 0.5rem 0;
  list-style: none;
  margin: 0;
`;

export const ListItem = styled(
  ({ selected, highlighted, manualHighlight, children, ...rest }) => (
    <li {...rest}>{children}</li>
  )
)`
  box-sizing: border-box;
  position: relative;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: black;

  ${({ manualHighlight }) =>
    !manualHighlight &&
    css`
      &:hover {
        background-color: ${({ selected }) => (selected ? "gray" : "darkgray")};
      }
    `};

  ${({ highlighted, manualHighlight }) =>
    manualHighlight &&
    highlighted &&
    css`
      background-color: ${({ selected }) => (selected ? "gray" : "darkgray")};
    `};

  ${({ selected }) =>
    selected &&
    css`
      background-color: gray;
      font-weight: 500;
    `};
`;
ListItem.displayName = "ListItem";
