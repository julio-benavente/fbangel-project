import styled from "styled-components";
import { Link } from "react-router-dom";
import { transparentize } from "polished";

// Styles
import {
  Container,
  H1,
  H2,
  H4,
  RoundedBtn,
  Tiny,
  Parragraph,
  breakpoint,
  liBullets,
} from "./GlobalStyles";

export const Home = styled.div``;

// Banner section
export const BannerSection = styled(Container)`
  padding: clamp(150px, 15vh, 300px) 40px;
  grid-template-columns: 1fr 1fr;
  max-width: 1200px;
  align-items: start;
  align-content: start;
  position: relative;
  @media screen and ${breakpoint.sm} {
    grid-template-columns: 1fr;
  }
`;

export const LeftSide = styled(Container)`
  padding: 0;
`;

export const Headline = styled(H1)`
  line-height: 1;
  margin-bottom: 10px;
  color: ${(props) => props.theme.color.primary};

  @media screen and ${breakpoint.sm} {
    text-align: center;
  }
`;

export const Subheadline = styled(H4)`
  font-weight: 400;
  margin-bottom: 40px;
  color: ${(props) => transparentize(0.2, props.theme.color.primary)};

  @media screen and ${breakpoint.sm} {
    text-align: center;
  }
`;

export const StartButton = styled(Link)`
  ${RoundedBtn}
  font-weight: 500;
  transform: scale(1.2);
  background-color: ${(props) => props.theme.color.secondary};
  color: ${(props) => props.theme.color.white};
  justify-self: end;

  @media screen and ${breakpoint.md} {
    transform: scale(1);
  }
  @media screen and ${breakpoint.sm} {
    justify-self: center;
  }
`;

export const Image = styled.img`
  justify-self: end;
  padding-right: clamp(0px, 5vw, 100px);
  width: clamp(200px, 30vw, 300px);
  transform: scaleX(-1);

  @media screen and ${breakpoint.md} {
    padding-right: 0;
  }

  @media screen and ${breakpoint.sm} {
    position: absolute;
    bottom: 0px;
    right: 0;
    transform: scaleX(-1) translateX(-30%);
    z-index: -1;
    width: clamp(150px, 20vw, 200px);
  }
`;
export const ProcessSection = styled(Container)`
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  position: relative;

  @media screen and ${breakpoint.md} {
    gap: 20px;
  }

  @media screen and ${breakpoint.sm} {
    gap: 50px 20px;
    grid-template-columns: repeat(2, 1fr);
  }
`;
export const Card = styled.div`
  display: grid;
  grid-template-rows: 45px auto;
  position: relative;
`;
export const Number = styled.div`
  position: absolute;
  color: ${(props) => transparentize(0.9, props.theme.color.secondary)};
  font-weight: 800;
  font-size: 7rem;
  line-height: 1;
  transform: translate(-30px, calc(-100% + 48px));
`;
export const CardTitle = styled(H4)``;

export const CardInfo = styled.p`
  margin-bottom: 10px;
`;
export const Disclaimer = styled(Tiny)``;

// Requirements section
export const RequirementsSection = styled.div`
  background-color: ${(props) => props.theme.color.gray100};
  position: relative;
`;

export const MoneyImage = styled.img`
  position: absolute;
  height: clamp(100px, 10vw, 150px);
  transform: rotate(90deg) translate(-50%, 20%);
  left: clamp(-30px, -10vw, -300px);

  @media screen and ${breakpoint.md} {
    left: 0px;
  }
`;

export const TaskListImage = styled.img`
  display: none;
  position: absolute;
  width: clamp(100px, 20vw, 200px);
  bottom: 0;
  right: clamp(-30px, -10vw, -300px);
  transform: translate(30%, 0%);

  @media screen and ${breakpoint.md} {
    right: 0px;
  }
`;

export const RequirementsSectionWrapper = styled(Container)`
  position: relative;
  grid-template-columns: 1fr 1fr;

  @media screen and ${breakpoint.md} {
    grid-template-columns: 1fr;
  }
`;
export const SectionTitle = styled(H2)`
  grid-column: 1/-1;
`;

export const RequirementsInfo = styled(Parragraph)`
  grid-column: 1/-1;
  p {
    span {
      color: ${(props) => props.theme.color.green};
    }
  }
`;

export const HowItWorksBtn = styled(Link)`
  ${RoundedBtn}
  grid-column: 1/-1;
  margin-bottom: 50px;
`;
export const RequirementsSubtitle = styled(H4)``;
export const RequirementsList = styled.ul`
  grid-column: 1/2;
  position: relative;
  margin-left: 20px;
  li {
    position: relative;

    ${liBullets}
  }

  @media screen and ${breakpoint.md} {
    li {
      max-width: 500px;
    }
  }
`;

export const Video = styled.video`
  width: clamp(200px, 100%, 400px);
  z-index: 5;
  @media screen and ${breakpoint.md} {
    grid-column: 1/2;
    grid-row: 4/5;
    justify-self: center;
    margin-bottom: 2rem;
  }

  @media screen and ${breakpoint.sm} {
    justify-self: start;
  }
`;

// Referral section
export const ReferralSection = styled.div``;

export const ReferralSectionWrapper = styled(Container)`
  grid-template-columns: 1fr 1fr;
  position: relative;

  > * {
    grid-column: 1/2;
  }

  @media screen and ${breakpoint.sm} {
    grid-template-columns: 1fr;

    > * {
      grid-column: auto;
    }
  }
`;
export const ReferralSectionTitle = styled(H2)`
  @media screen and ${breakpoint.md} {
    grid-column: 1/-1;
  }
`;
export const ReferralInfo = styled(Parragraph)``;
export const RegisterBtn = styled(Link)`
  ${RoundedBtn}
`;

export const ReferrealTiny = styled(Tiny)`
  margin-top: 100px;

  @media screen and ${breakpoint.sm} {
    margin-top: 150px;
  }
`;
export const FriendsImage = styled.img`
  grid-column: 2/-1;
  grid-row: 1/5;
  width: clamp(240px, 30vw, 350px);
  justify-self: end;
  margin-top: clamp(50px, 10vh, 150px);

  @media screen and ${breakpoint.md} {
    width: clamp(240px, 20vw, 350px);
    grid-row: 2/5;
  }

  @media screen and ${breakpoint.sm} {
    max-width: none;
    position: absolute;
    margin-top: 0;
    height: clamp(100px, 60vw, 200px);
    grid-row: 3/4;
    z-index: -1;
    bottom: -150px;
  }
`;

// Testimonies section
export const TestimoniesSection = styled.div`
  background-color: ${(props) => props.theme.color.gray100};
  overflow-x: hidden;
  position: relative;
`;

export const TestimoniesSectionWrapper = styled(Container)``;

export const TestimoniesSectionTitle = styled(H2)``;

export const TestimoniesInfo = styled(Parragraph)``;

export const TestimoniesCardWrapper = styled.div`
  width: calc(100vw - 64px);
  max-width: 960px;
  display: grid;
  grid-auto-columns: 400px;
  grid-auto-flow: column;
  gap: 50px;
  margin-bottom: 50px;
`;
export const TestimonyCard = styled.div`
  display: grid;
  grid-template-rows: 1fr auto auto;
  padding: 24px;
  box-shadow: 4px 4px 10px ${(props) => props.theme.color.gray300};
  overflow-x: hidden;
`;
export const Testimony = styled.div`
  position: relative;
  margin-bottom: 1rem;
  &::before {
    content: "";
    position: absolute;
    bottom: -1rem;
    width: calc(100% + 100px);
    left: -40px;
    height: 0.5px;
    background-color: ${(props) =>
      transparentize(0.6, props.theme.color.gray300)};
  }
`;
export const Author = styled.p`
  font-weight: 600;
  font-size: 1.2rem;
  margin-top: 20px;
`;
export const Membership = styled.div`
  font-weight: 300;
  font-size: 0.875rem;
`;
export const TestimoniesNav = styled.div`
  display: grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  justify-content: center;
  justify-items: center;
  gap: 5px;
`;
export const TestimoniesNavLink = styled.div`
  height: 10px;
  width: 30px;
  background-color: ${(props) =>
    props.active
      ? props.theme.color.secondary
      : transparentize(0.6, props.theme.color.secondary)};
  cursor: pointer;
`;
