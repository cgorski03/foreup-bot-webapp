/*
This sucked. The library is so poorly documented and has terrible customization.

The fact that it is not possible for the first option to not be automatically selected
EVERY SINGLE TIME you start typing is completely infuriating. If that was not bad enough,
there has been an open pull request for a simple prop that disables for 3 years with a 
solution that has not been merged with the main branch.

Hopefully, this will not be in my project for too long because I hate this library and 
I will make this component myself.
*/
const selectStyles = {
  option: (provided, state) => ({
    ...provided,
    padding: 12,
    fontSize: 15,
    width: "100%",
    backgroundColor:
      state.isSelected || state.isFocused
        ? "var(--secondary-color)"
        : "var(--primary-color)",
    ":active": {
      backgroundColor: "rgba(99, 106, 117, .18)",
    },
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  }),
  control: (provided, state) => ({
    ...provided, // Spread the provided styles here
    padding: 10,
    fontSize: 27,
    width: "100%",
    backgroundColor: "var(--secondary-color-dark)",
    border: "none",
    overflow: "hidden",
    borderTopLeftRadius: ".8rem",
    borderTopRightRadius: ".8rem",
    borderBottomRightRadius: ".8rem",
    borderBottomLeftRadius: ".8rem",
    boxShadow: "0px 9px 19px 8px rgba(26,26,26,.1)",
    ":hover": {
      cursor: "text",
    },
    ":focus": {
      
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: "var(--primary-color)",
    boxShadow: "0px 9px 19px 8px rgba(26,26,26,.2)",
    marginTop: 0,
    marginBottom: 0,
    borderTopLeftRadius: ".8rem",
    borderTopRightRadius: ".8rem",
    borderBottomRightRadius: ".8rem",
    borderBottomLeftRadius: ".8rem",
    boxSizing: "border-box",
  }),
  menuList: (provided, state) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
    borderTopLeftRadius: ".8rem",
    borderTopRightRadius: ".8rem",
    borderBottomRightRadius: ".8rem",
    borderBottomLeftRadius: ".8rem",
    "::-webkit-scrollbar": {
      width: "0px",
      height: "0px",
    },
  }),

  input: (provided, state) => ({
    ...provided,
    color: "var(--text-color)",
    textAlign: "center",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "var(--text-color)",
  }),
  indicatorContainer: (provided, state) => ({
    display: "none",
  }),
  indicatorSeparator: (provided, state) => ({
    display: "none",
  }),
  dropdownIndicator: (provided, state) => ({
    display: "none",
  }),
};

export default selectStyles;
