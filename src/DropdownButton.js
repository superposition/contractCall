import React, { Component } from "react";
import styled, { css } from "styled-components";
import Downshift from "downshift";
import PropTypes from "prop-types";

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

const StyledButton = styled.button`
  position: relative;
`;

export const DropDownButtonWrapper = styled(({ showArrow, ...rest }) => (
  <div {...rest} />
))`
  ${props =>
    props.showArrow &&
    css`
      & ${StyledButton} {
        padding-right: 2rem;
      }

      & ${StyledButton}:before {
        content: "";
        position: absolute;
        top: 50%;
        right: 0.625rem;
        pointer-events: none;
        border-width: 0.375rem 0.375rem 0 0.375rem;
        border-style: solid;
        border-color: gray transparent transparent transparent;
        z-index: 1;
        box-sizing: border-box;
        margin-top: -0.1875rem;
      }

      & ${StyledButton}:hover:before {
        border-color: black transparent transparent transparent;
      }
    `};

  & ${List} {
    box-sizing: border-box;
    position: relative;
    padding: 0.5rem 0;
    list-style: none;
    margin: 0;
    position: absolute;
    top: 0;
    right: 0;
    background: white;
    z-index: 4;
    cursor: default;

    border: 1px solid gray;
    white-space: nowrap;
  }
`;

const ButtonDropDownPlaceholder = styled.div`
  position: relative;
`;

export class DropDownItem {
  constructor(text, id) {
    this.text = text;
    this.id = id;
  }
}

class DropDownButton extends Component {
  static propTypes = {
    showArrow: PropTypes.bool,
    plain: PropTypes.bool,
    children: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.instanceOf(DropDownItem)),
    onSelect: PropTypes.func.isRequired
  };

  static defaultProps = {
    showArrow: true,
    plain: false
  };

  render() {
    const { children, items, onSelect, showArrow, plain } = this.props;
    return (
      <DropDownButtonWrapper showArrow={showArrow}>
        <Downshift
          onSelect={onSelect}
          itemToString={item => item && item.text}
          render={({
            isOpen,
            getButtonProps,
            getItemProps,
            highlightedIndex
          }) => (
            <div>
              <StyledButton {...getButtonProps({ plain: plain })}>
                {children}
              </StyledButton>
              <ButtonDropDownPlaceholder>
                {isOpen && (
                  <List>
                    {items.map((item, index) => (
                      <ListItem
                        {...getItemProps({
                          key: item.id,
                          index,
                          item: item,
                          highlighted: highlightedIndex === index
                        })}
                        manualHighlight
                      >
                        {item.text}
                      </ListItem>
                    ))}
                  </List>
                )}
              </ButtonDropDownPlaceholder>
            </div>
          )}
        />
      </DropDownButtonWrapper>
    );
  }
}

export default DropDownButton;
