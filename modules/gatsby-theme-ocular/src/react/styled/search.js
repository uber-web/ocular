import {Link} from 'gatsby';
import styled from 'styled-components';

// search

export const SearchContainer = styled.div`
  position: relative;
  height: ${props => props.theme.sizing.scale1000};
  margin-bottom: 20px;
  background: ${props => props.theme.colors.mono200};
`;

export const IconContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.theme.sizing.scale1000};
  height: ${props => props.theme.sizing.scale1000};
`;

export const SearchInput = styled.input`
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0) 0px 2px 6px;
  border: 1px solid transparent;
  transition: 0.3s;
  font-size: 14px;
  font-weight: 500;
  line-jeight: 20px;
  padding: 10px 10px 10px 40px;
  &:focus {
    box-shadow: rgba(39, 110, 241, 0.32) 0px 2px 6px;
    border-color: rgb(39, 110, 241);
    outline: none;
  }
`;

export const MainSearch = styled.main`
  font: ${props => props.theme.typography.font300};
  max-width: 600px;
  margin: 104px auto 0px;
`;

export const SearchResultItem = styled.div`
  margin: 1em 0;
`;

export const SearchResultLink = styled(Link)`
  font: ${props => props.theme.typography.font450};
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.linkText};
  text-decoration: none;
  &:visited {
    color: ${props => props.theme.colors.linkVisited};
  }
  &:active {
    color: ${props => props.theme.colors.linkHover};
  }
  &:hover {
    color: ${props => props.theme.colors.linkHover};
  }
`;

export const SearchResultContent = styled.div`
  max-height: 5rem;
  overflow: hidden;
`;
