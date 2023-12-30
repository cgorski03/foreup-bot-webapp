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
      width: 700,
      backgroundColor: (state.isSelected || state.isFocused) ? '#333842' : '#21252b',
      color: '#cccccc',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      ':hover':{
        backgroundColor: '#333842',
      }
    }),
    control: (provided, state) => ({
      ...provided, // Spread the provided styles here
      padding: 10,
      fontSize: 27,
      width: 700,
      backgroundColor: '#1a1e22',
      border: 'none',
      /*
      border: '1px solid',
      borderColor : ' #646a75 !important',*/
      overflow: 'hidden',
      borderTopLeftRadius : '7px',
      borderTopRightRadius : '7px',
      borderBottomRightRadius : '0px',
      borderBottomLeftRadius : '0px',
      boxShadow: '0px 9px 19px 8px rgba(26,26,26,.5)',
      ':hover' : {
        cursor: 'text',
      },
      ':focus' : {
      },
    }),
    menu: (provided, state) => ({
        ...provided,
        backgroundColor : '#21252b',
        boxShadow: '0px 9px 19px 8px rgba(26,26,26,.5)',
        marginTop: 0,
        marginBottom: 0,
        borderBottomLeftRadius:7,
        borderBottomRightRadius:7,
        boxSizing: 'border-box',

      }),
    menuList: (provided, state) => ({
        ...provided,
        paddingTop : 0,
        paddingBottom : 0,
        borderBottomLeftRadius:7,
        borderBottomRightRadius:7,
        
      }),
    
    
    input: (provided, state) => ({
        ...provided,
        color: '#cccccc !important',
        textAlign: 'center',
      }),
    singleValue: (provided, state) => ({
        ...provided,
        color: '#cccccc !important',
      }),
    indicatorContainer: (provided, state) => ({
        display:'none',
      }),
    indicatorSeparator: (provided, state) => ({
        display: 'none',
      }),
    dropdownIndicator: (provided, state) => ({
        display: 'none',
        /*
        ...provided,
        'color': '#646a75',
        */
      }),
  };
  
  export default selectStyles;
  