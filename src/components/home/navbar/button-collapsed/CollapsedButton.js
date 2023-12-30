import './CollapsedButton.css'
const CollapsedButton = ({onClick, content, Current}) => {
    console.log(content)
  return (
    <button
        className="collapsedButtonStyling"
        onClick={onClick}>
            {content}
    </ button>
  )
}

export default CollapsedButton;