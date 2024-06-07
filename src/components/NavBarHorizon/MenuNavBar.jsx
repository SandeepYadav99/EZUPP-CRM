import { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import Dropdown from "./DDHorizon";
import styles from "./Style.module.css";
import { Typography } from "@mui/material";

const MenuItems = ({ items, depthLevel, routes }) => {
  const [dropdown, setDropdown] = useState(false);

  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items?.is_sidebar && !items?.parent && (
        <>
          {items?.path && items?.is_parent ? (
            <>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={dropdown ? "true" : "false"}
                onClick={() => setDropdown((prev) => !prev)}
              >
                {window.innerWidth < 960 && depthLevel === 0 ? (
                  items?.sidebarName
                ) : (
                  <div>{items?.sidebarName}</div>
                )}

                {depthLevel > 0 && window.innerWidth < 960 ? null : depthLevel >
                    0 && window.innerWidth > 960 ? (
                  <span>&raquo;</span>
                ) : (
                  <span className="arrow" />
                )}
              </button>
              <Dropdown
                parent={items?.slug}
                submenus={items?.is_parent}
                dropdown={dropdown}
                routes={routes}
              />
            </>
          ) : (
            <Link to={items?.path}>
              <div className={styles.linkClass}>
                <items.icon />
                <Typography variant="body1">{items?.sidebarName}</Typography>
              </div>
            </Link>
          )}
        </>
      )}
    </li>
  );
};

export default MenuItems;
