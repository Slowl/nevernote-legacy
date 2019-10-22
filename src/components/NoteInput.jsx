import React from 'react'
import ContentEditable from './ContentEditable'

const NoteInput = ({ onChange, value }) => {
  return (
      <ContentEditable html={value} onChange={onChange} />
  )
}

export default NoteInput
