//OnkeyDown
export const saveContentAfterPressEnter = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.target.blur()
  }
}

// Select on input value
export const selectAllInLineText = (e) => {
  e.target.focus()
  e.target.select()
  //document.execCommand('selectAll', false, null)
}
