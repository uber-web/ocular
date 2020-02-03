import styled from 'styled-components';
import {Link} from 'gatsby';

export const Banner = styled.section`
  position: relative;
  height: 30rem;
  background: ${props => props.theme.colors.mono900};
  color: ${props => props.theme.colors.mono100};
  z-index: 0;
`;

export const Container = styled.div`
  position: relative;
  padding: 2rem 2rem 2rem 4rem;
  max-width: 80rem;
  width: 100%;
  height: 100%;
  font: ${props => props.theme.typography.font400};
  margin: 0;
`;

export const BannerContainer = styled(Container)`
  padding-top: 192px;
  z-index: 0;
  pointer-events: none;
`;

export const HeroExampleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

export const Section = styled.section`
  &:nth-child(2n+1) {
    background: #E8E8E8;
  }
`;

export const ProjectName = styled.h1`
  font-size: 5em;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: 700;
  margin: 0;
  margin-bottom: 16px;
`;

export const GetStartedLink = styled(Link)`
  pointer-events: all;
  font-size: 12px;
  line-height: 44px;
  letter-spacing: 2px;
  font-weight: bold;
  margin: 24px 0;
  padding: 0 4rem;
  pointer-events: all;
  display: inline-block;
  text-decoration: none;
  transition: background-color 250ms ease-in, color 250ms ease-in;
  border: solid 2px ${props => props.theme.colors.primary400};
  color: ${props => props.theme.colors.mono100};
  border-image: linear-gradient(to right, ${props => props.theme.colors.primary400} 0%, ${props => props.theme.colors.primary100} 100%);
  border-image-slice: 2;
  &:visited {
    color: ${props => props.theme.colors.mono100};
  }
  &:active {
    color: ${props => props.theme.colors.mono100};
  }
  &:hover {
    color: ${props => props.theme.colors.mono100};
    background-color: ${props => props.theme.colors.primary400};
  }
`;

export const Footer = styled.footer`
  position: absolute;
  bottom: -$footer-height;
  width: 100%;
  z-index: 2;
  background-image: url(data:image/gif;base64,R0lGODlhIAAgAKIAABUjMRYkMhclM0xXYU1YYgAAAAAAAAAAACwAAAAAIAAgAAADKjgjEP4wyklWmzg/IbTPwPWNZGmeaKqubOu+cCzPdG3feK7vfO//wKAwAQA7);
  background-size: 32px;
  background-repeat: repeat;
  background-position: 16px -8px;
  color: ${props => props.theme.colors.mono100};
`;

export const FooterText = styled.div`
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  letter-spacing: 2px;
  opacity: 0.4;
  margin-bottom: 1rem;
  margin-right: 1rem;
`;

export const FooterLogo = styled.img`
  max-height: 32px;
  display: inline-block;
`;
