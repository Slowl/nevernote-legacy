import React from 'react';
import styled from 'styled-components'

const MainInput = styled.div`
  display: block;
  box-sizing: border-box;
  min-width: 100%;
  max-width: 100%;
  height: calc(100% - 7.2em);
  border: 0;
  padding: 1em 1.5em 0em 1.5em;
  resize: none;
  font-family: 'Montserrat', sans-serif;;
  font-weight: 400;
  font-size: 1.4em;
  letter-spacing: 1px;
  word-spacing: 2px;
  color: rgba(0,0,0, .8);

  :focus {
    outline: 0;
  }

  :empty:before{
    content: 'write your note ...';
    color: #979797;
}
`

export default class ContentEditable extends React.Component {

  shouldComponentUpdate(nextProps){
        return nextProps.html !== this.noteInputRef.innerHTML
    }

    componentDidUpdate() {
      if ( this.props.html !== this.noteInputRef.innerHTML ) {
         this.noteInputRef.innerHTML = this.props.html
      }
    }

 emitChange = () => {
        const html = this.noteInputRef.innerHTML
        if (this.props.onChange && html !== this.lastHtml) {
            this.props.onChange({
                target: {
                    value: html
                }
            })
        }
        this.lastHtml = html
}

render() {
    return(
      <MainInput ref={(ref) => {this.noteInputRef = ref} }
            onInput={this.emitChange}
            onBlur={this.emitChange}
            contentEditable
            dangerouslySetInnerHTML={{__html: this.props.html}}>{this.props.value}</MainInput>
    )
  }
}

// Code to handle onBlur effect to force the update and get latest states
// but push the cursor at the beginning each update <- issue to fix [wip]
// can pass the emitChange to the handleBlur = à tester

// state = {
//   isBlurred: true,
//   html: ''
// }
//
// shouldComponentUpdate(){
//   return this.state.isBlurred
// }
//
// componentDidUpdate() {
//     if ( this.state.isBlurred ) {
//        this.nodeSelect.innerHTML = this.props.html
//     }
// }
//
// emitChange = () => {
//     const html = this.nodeSelect.innerHTML
//     if (this.props.onChange && html !== this.lastHtml) {
//         this.props.onChange({
//             target: {
//                 value: html
//             }
//         })
//     }
//     this.lastHtml = html
// }
//
// handleBlur = blurFunc => {
//   this.setState(prevState => ({
//     isBlurred: !prevState.isBlurred
//   }))
//   console.log(this.state.isBlurred)
// }
//
// handleFocus = () => {
//   this.setState(prevState => ({
//     isBlurred: !prevState.isBlurred
//   }))
//   console.log(this.state.isBlurred)
// }
//
//
// render() {
//   const { ...otherAttributes } = this.props;
//   return(
//     <MainInput ref={(ref) => {this.nodeSelect = ref} }
//           onInput={this.emitChange}
//           onBlur={() => this.handleBlur(this.props.onBlur)}
//           onFocus={this.handleFocus}
//           contentEditable
//           dangerouslySetInnerHTML={{__html: this.props.html}}>{this.props.value}</MainInput>
//   )
// }
// }
