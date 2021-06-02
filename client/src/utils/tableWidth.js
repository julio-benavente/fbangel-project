import React, { useState, useEffect } from "react";

export const useTableWidth = (columns, element, breakpoint = 600) => {
  const [tableWidth, setTableWidth] = useState(null);
  const width = () =>
    setTableWidth(() => {
      if (window.innerWidth < breakpoint) {
        return {
          gridTemplateColumns: `1fr`,
        };
      }
      const elem = document.querySelector(`.${element}`);

      const parentWidth = elem.offsetWidth;
      const paddingLeft = parseInt(
        window.getComputedStyle(elem, null).getPropertyValue("padding-left")
      );
      const paddingRight = parseInt(
        window.getComputedStyle(elem, null).getPropertyValue("padding-right")
      );

      const realWidth = parentWidth - (paddingLeft + paddingRight);

      const grid = () => {
        var template = "";
        columns.map((column) => {
          const { width, min } = column;
          const value =
            (realWidth * width) / 100 > min ? `${width}%` : `${min}px`;
          template += `${value} `;
          return null;
        });

        return template;
      };

      return {
        gridTemplateColumns: grid(),
      };
    });

  useEffect(() => {
    width();
    window.addEventListener("resize", width);

    return () => window.removeEventListener("resize", width);
  }, []);

  return tableWidth;
};
