import React, { useState, useEffect } from "react";
import { useRouteMatch, useLocation, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/auth/auth";
import { motion, AnimatePresence } from "framer-motion";

// Styles
import {
  DashboardNavbar,
  Logo,
  NavbarWrapper,
  NavbarItem,
  Menu,
} from "../../styles/Dashboard/DashboardNavbarStyles";

// Assets
import { ReactComponent as UsersSvg } from "../../assets/svgs/user.svg";
import { ReactComponent as PaymentsSvg } from "../../assets/svgs/payments.svg";
import { ReactComponent as ConfigurationSvg } from "../../assets/svgs/configuration.svg";
import { ReactComponent as PeopleSvg } from "../../assets/svgs/people.svg";
import { ReactComponent as OrderSvg } from "../../assets/svgs/order.svg";
import { ReactComponent as OpenNav } from "../../assets/svgs/menu.svg";
import { ReactComponent as CloseNav } from "../../assets/svgs/close.svg";
import { NavbarLink } from "../../styles/NavbarStyles";

const navbarVariants = {
  initial: {
    display: "none",
    position: "abosulte",
    height: 0,
  },
  animate: {
    display: "grid",
    height: "100vh",
    width: "50vw",
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

const MainComponent = () => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();

  const { authLevel } = useSelector(getUser);

  const hamburgerMenuVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const [navIsOpen, setNavIsOpen] = useState(false);
  const openNavbar = () => setNavIsOpen(true);
  const closeNavbar = () => setNavIsOpen(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const widthMark = innerWidth < 901;

  const size = useWindowSize();

  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, [size]);

  return (
    <DashboardNavbar>
      {widthMark && (
        <Menu open={navIsOpen}>
          {!navIsOpen && <OpenNav className="openNav" onClick={openNavbar} />}
          {navIsOpen && <CloseNav className="closeNav" onClick={closeNavbar} />}
        </Menu>
      )}
      <AnimatePresence>
        {(!widthMark || navIsOpen) && (
          <NavbarWrapper
            as={widthMark && motion.div}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={navbarVariants}
          >
            <Logo>fbangel</Logo>

            <NavbarItem as={motion.div} variants={navLinkVariants}>
              <NavLink
                to={() => `${path}/payments`}
                activeClassName="active"
                isActive={() => {
                  if (
                    pathname === "/dashboard" ||
                    /^\/dashboard\/payments/.test(pathname)
                  )
                    return true;
                }}
                onClick={closeNavbar}
              >
                <PaymentsSvg />
                <p>Payments</p>
              </NavLink>
            </NavbarItem>

            {authLevel === "user" && (
              <NavbarItem as={motion.div} variants={navLinkVariants}>
                <NavLink
                  activeClassName="active"
                  to={() => `${path}/referrals`}
                  onClick={closeNavbar}
                >
                  <PeopleSvg />
                  <p>Referrals</p>
                </NavLink>
              </NavbarItem>
            )}
            <NavbarItem as={motion.div} variants={navLinkVariants}>
              <NavLink
                activeClassName="active"
                to={() => `${path}/profile`}
                onClick={closeNavbar}
              >
                <ConfigurationSvg />
                <p>Profile</p>
              </NavLink>
            </NavbarItem>

            {authLevel === "admin" && (
              <NavbarItem as={motion.div} variants={navLinkVariants}>
                <NavLink
                  to={() => `${path}/users`}
                  activeClassName="active"
                  onClick={closeNavbar}
                >
                  <UsersSvg />
                  <p>Users</p>
                </NavLink>
              </NavbarItem>
            )}

            {authLevel === "admin" && (
              <NavbarItem as={motion.div} variants={navLinkVariants}>
                <NavLink
                  activeClassName="active"
                  to={() => `${path}/orders`}
                  onClick={closeNavbar}
                >
                  <OrderSvg />
                  <p>Orders</p>
                </NavLink>
              </NavbarItem>
            )}
          </NavbarWrapper>
        )}
      </AnimatePresence>
    </DashboardNavbar>
  );
};

export default MainComponent;

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
