import './CollapsedButton.css'
const CollapsedButton = ({onClick, content, isExpanded}) => {

  return (
    <button
        id="navButtonClickable"
        onClick={onClick}>
            {!isExpanded ? <div className='collapsedIconStyling'>{content[0]}</div> : 
            <div className='expandedButtonStyling'>
              <div className='expandedIconStyling'>{content[0]}</div>
              <div className='expandedTextStyling'>{content[1]}</div>
            </div>}
    </ button>
  )
}

export default CollapsedButton;