import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Flags from "country-flag-icons/react/3x2";
import i18next from "i18next";
// Styles
import {
  NavbarSection,
  Logo,
  NavLinks,
  NavbarLink,
  Link,
  NavbarWrapper,
  Menu,
  LanguageDropdown,
  GlobalIcon,
  Language,
  Languages,
} from "../../styles/NavbarStyles";

// Assets
import { ReactComponent as OpenNav } from "../../assets/svgs/menu.svg";
import { ReactComponent as CloseNav } from "../../assets/svgs/close.svg";
import { ReactComponent as GlobalSvg } from "../../assets/svgs/global.svg";

const hamburgerMenuVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const navbarVariants = {
  initial: { display: "none", height: 0 },
  animate: {
    display: "grid",
    height: "100vh",
    transition: {
      when: "beforeChildren",
      ease: "easeInOut",
      staggerChildren: 0.05,
      hegiht: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  },
  exit: {
    height: "0vw",
    transitionEnd: {
      display: "none",
    },
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
      ease: "easeInOut",
    },
  },
};

const navLinkVariants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: { opacity: 0, x: -20 },
};

const Navbar = () => {
  const { t } = useTranslation();
  const [navIsOpen, setNavIsOpen] = useState(false);
  const openNavbar = () => setNavIsOpen(true);
  const closeNavbar = () => setNavIsOpen(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const widthMark = innerWidth < 1001;

  const size = useWindowSize();

  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, [size]);

  const navLinks = [
    {
      link: t("navbar.home"),
      to: "/",
      active: "active",
    },
    {
      link: t("navbar.how_it_works"),
      to: "/how-it-works",
      active: "active",
    },

    {
      link: t("navbar.referral_program"),
      to: "/referral-program",
      active: "active",
    },
    {
      link: t("navbar.faq"),
      to: "/faq",
      active: "active",
    },
    {
      link: t("navbar.contact"),
      to: "/contact",
      active: "active",
    },
    {
      link: t("navbar.join_now"),
      to: "/join-now",
      active: "noActive",
      className: "joinNow",
    },
    {
      link: t("navbar.login"),
      to: "/login",
      className: "login",
    },
  ];

  const languages = [
    { code: "es", name: "Español", flag: <Flags.ES /> },
    { code: "en", name: "English", flag: <Flags.GB /> },
    { code: "fr", name: "Français", flag: <Flags.FR /> },
  ];

  const [languageDropdownIsOn, setLanguageDropdownIsOn] = useState(false);
  return (
    <NavbarSection className="Navbar">
      <NavbarWrapper>
        <Logo to="/">
          <span>fb</span> fbangel
        </Logo>
        <AnimatePresence>
          {(!widthMark || navIsOpen) && (
            <NavLinks
              as={widthMark && motion.div}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={navbarVariants}
            >
              {navLinks.map(({ link, to, active, className }, index) => (
                <NavbarLink
                  key={index}
                  as={motion.div}
                  variants={navLinkVariants}
                  onClick={closeNavbar}
                >
                  <Link
                    to={to}
                    exact
                    className={className}
                    activeClassName={active}
                  >
                    {link}
                  </Link>
                </NavbarLink>
              ))}
            </NavLinks>
          )}
        </AnimatePresence>

        <LanguageDropdown
          onClick={() => setLanguageDropdownIsOn(!languageDropdownIsOn)}
        >
          <GlobalIcon>
            <GlobalSvg />
          </GlobalIcon>
          {languageDropdownIsOn && (
            <Languages>
              {languages.map(({ code, name, flag }, index) => {
                return (
                  <Language
                    onClick={() => {
                      i18next.changeLanguage(code);
                      setLanguageDropdownIsOn(false);
                    }}
                  >
                    <div className="flag">{flag}</div>
                    <p className="language">{name}</p>
                  </Language>
                );
              })}
            </Languages>
          )}
        </LanguageDropdown>

        {widthMark && (
          <Menu open={navIsOpen}>
            {!navIsOpen && <OpenNav className="openNav" onClick={openNavbar} />}
            {navIsOpen && (
              <CloseNav className="closeNav" onClick={closeNavbar} />
            )}
          </Menu>
        )}
      </NavbarWrapper>
    </NavbarSection>
  );
};

export default Navbar;

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
