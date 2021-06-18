import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useTranslation } from "react-i18next";

// Styles
import {
  Home,
  // Banner Section
  BannerSection,
  BannerSectionWrapper,
  LeftSide,
  Headline,
  Subheadline,
  StartButton,
  Image,
  // Process Section
  ProcessSection,
  Card,
  CardSvgImage,
  Number,
  CardTitle,
  CardInfo,
  Disclaimer,
  // How much section
  HowMuchSection,
  HowMuchSectionTitle,
  HowMuchSectionWarpper,
  HowMuchInfo,
  HowMuchImage,
  // Requirements Section
  RequirementsSection,
  RequirementsSectionWrapper,
  MoneyImage,
  TaskListImage,
  SectionTitle,
  RequirementsInfo,
  HowItWorksBtn,
  RequirementsSubtitle,
  RequirementsList,
  Video,
  // Referral Section
  ReferralSection,
  ReferralSectionWrapper,
  ReferralSectionTitle,
  ReferralInfo,
  ReferrealTiny,
  FriendsImage,
  RegisterBtn,
  // Testimonies section
  TestimoniesSection,
  TestimoniesSectionWrapper,
  TestimoniesSectionTitle,
  TestimoniesInfo,
  TestimoniesCardWrapper,
  TestimonyCard,
  Testimony,
  Author,
  Membership,
  TestimoniesNav,
  TestimoniesNavLink,
  Picture,
} from "../../styles/HomePageStyles";

// Assets
import bannerWoman from "../../assets/images/bannerWoman.png";
import money from "../../assets/images/money.png";
import task_list from "../../assets/images/tasks-list.png";
import friends_chatting from "../../assets/svgs/friends-chatting.svg";
import { ReactComponent as TimeSvg } from "../../assets/svgs/time.svg";
import { ReactComponent as MoneySvg } from "../../assets/svgs/money.svg";
import { ReactComponent as FormSvg } from "../../assets/svgs/form.svg";
import { ReactComponent as ShareSvg } from "../../assets/svgs/share.svg";
import { ReactComponent as StackOfMoneySvg } from "../../assets/svgs/stackOfMoney.svg";
import poster from "../../assets/images/video-poster.jpg";
import fb4cashVideo from "../../assets/videos/fb4cash.mp4";
import profilePictureOne from "../../assets/images/profilePictureOne.jpg";
import profilePictureTwo from "../../assets/images/profilePictureTwo.jpg";
import profilePictureThree from "../../assets/images/profilePictureThree.jpg";
import stackOfDollars from "../../assets/images/stackOfDollars.png";

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const [currentTestimony, setCurrentTestimony] = useState(0);
  const testimoniesNavAnimation = useAnimation();
  const { width } = useWindowSize();

  const distance = width < 600 ? 300 : 400;
  const handleTestimoniesNav = to => {
    const translate = to => (distance + 50) * -to;
    testimoniesNavAnimation.start({
      x: translate(to),
      transition: {
        esae: "esaeInOut",
      },
    });
    setCurrentTestimony(to);
  };

  // TITLE
  useEffect(() => {
    const title = document.querySelector("title");
    title.innerText = t("navbar.home");
  }, [language]);

  useEffect(() => {
    handleTestimoniesNav(currentTestimony);
  }, [distance]);

  return (
    <Home className="Home" id="Home">
      <BannerSection>
        <BannerSectionWrapper>
          <LeftSide>
            <Headline>{t("home.banner.headline")}</Headline>
            <Subheadline>{t("home.banner.sub_headline")}</Subheadline>
            <StartButton to="/join-now">{t("home.banner.start_button")}</StartButton>
          </LeftSide>
          <Image src={bannerWoman}></Image>
        </BannerSectionWrapper>
      </BannerSection>

      <ProcessSection>
        {t("home.process.cards", {
          returnObjects: true,
        }).map(({ number, title, info, disclaimer }, index) => {
          const svgs = {
            "01": <FormSvg />,
            "02": <TimeSvg />,
            "03": <MoneySvg />,
            "04": <ShareSvg />,
          };

          return (
            <Card key={index}>
              <CardSvgImage> {svgs[number]} </CardSvgImage>

              <CardTitle>
                <Number>{number}</Number>
                {title}
              </CardTitle>
              <CardInfo>{info}</CardInfo>
              {disclaimer && (
                <Disclaimer>
                  <span>* </span>
                  {disclaimer}
                </Disclaimer>
              )}
            </Card>
          );
        })}
      </ProcessSection>

      <HowMuchSection>
        <HowMuchSectionWarpper>
          <div className="sideContent">
            <HowMuchSectionTitle>{t("home.requirements.title")}</HowMuchSectionTitle>

            <HowMuchInfo>
              <p>
                <span>{t("home.requirements.info.span")} </span>
                {t("home.requirements.info.p")}
              </p>
            </HowMuchInfo>
            <HowItWorksBtn to="/how-it-works">{t("home.requirements.how_it_works_btn")}</HowItWorksBtn>
          </div>
          <HowMuchImage>
            <img src={stackOfDollars} alt="Stack of dollars" />
            {/* <StackOfMoneySvg /> */}
          </HowMuchImage>
        </HowMuchSectionWarpper>
      </HowMuchSection>

      <RequirementsSection>
        <RequirementsSectionWrapper>
          <RequirementsSubtitle>{t("home.requirements.sub_title")}</RequirementsSubtitle>
          <RequirementsList>
            {t("home.requirements.list", { returnObjects: true }).map((e, index) => (
              <li key={index}>{e}</li>
            ))}
          </RequirementsList>
          <Video controls poster={poster}>
            <source src={fb4cashVideo} type="video/mp4"></source>
          </Video>
        </RequirementsSectionWrapper>
      </RequirementsSection>

      <ReferralSection>
        <ReferralSectionWrapper>
          <ReferralSectionTitle>{t("home.referral.title")}</ReferralSectionTitle>
          <div className="contentWrapper">
            <ReferralInfo>
              <p>
                {t("home.referral.info.p_1.0")}
                <span> {t("home.referral.info.p_1.1")} </span>
                {t("home.referral.info.p_1.2")}
              </p>
              <p>
                {t("home.referral.info.p_2.0")} <span> {t("home.referral.info.p_2.1")} </span>
                {t("home.referral.info.p_2.2")}
              </p>
            </ReferralInfo>
            <RegisterBtn to="/referral-program">{t("home.referral.register_btn")}</RegisterBtn>
            <ReferrealTiny>
              <p>
                <span>* </span>
                {t("home.referral.tiny.p_1")}
              </p>
              <p>
                <span>* </span>
                {t("home.referral.tiny.p_2")}
              </p>
            </ReferrealTiny>
          </div>
        </ReferralSectionWrapper>
      </ReferralSection>

      <TestimoniesSection>
        <TestimoniesSectionWrapper>
          <TestimoniesSectionTitle>{t("home.testimonies.title")}</TestimoniesSectionTitle>
          <TestimoniesInfo>{t("home.testimonies.info")}</TestimoniesInfo>
          <TestimoniesCardWrapper
          // style={{ gridTemplateColumns: width < 600 && "repeat(3,300px)" }}
          >
            {t("home.testimonies.testimonies", { returnObjects: true }).map(({ testimony, author, membership }, i) => {
              const pictures = {
                0: profilePictureOne,
                1: profilePictureTwo,
                2: profilePictureThree,
              };

              return (
                <TestimonyCard key={i} as={motion.div} animate={testimoniesNavAnimation}>
                  <Testimony>{testimony}</Testimony>
                  <Author>{author}</Author>
                  <Membership>{membership}</Membership>
                  <Picture src={pictures[i]} />
                </TestimonyCard>
              );
            })}
          </TestimoniesCardWrapper>
          {/* <TestimoniesNav>
            {t("home.testimonies.testimonies", { returnObjects: true }).map(
              (e, i) => (
                <TestimoniesNavLink
                  key={i}
                  active={i == currentTestimony}
                  onClick={() => handleTestimoniesNav(i)}
                />
              )
            )}
          </TestimoniesNav> */}
        </TestimoniesSectionWrapper>
      </TestimoniesSection>
    </Home>
  );
};

export default HomePage;

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}
