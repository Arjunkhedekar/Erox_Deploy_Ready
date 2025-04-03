/**
 * Disables scrolling on the body element and compensates for the scrollbar width.
 */
export const disableBodyScroll = () => {
   const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
   document.body.style.overflow = "hidden";
   document.body.style.paddingRight = `${scrollbarWidth}px`;
};

/**
 * Enables scrolling on the body element and removes the padding.
 */
export const enableBodyScroll = () => {
   document.body.style.overflow = "";
   document.body.style.paddingRight = "";
};
