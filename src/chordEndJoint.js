import {createInputs, createForm, clearContent} from "./helper"

const renderChordEndJoint = () => {
  // clearContent()
  const inputs = createInputs('e1', 'e2', 'p1', 'p2', 'boltSize', 'pHeight', 'pWidth')
  const form = createForm(inputs)


  const root = document.createElement('div')
  root.id = 'chord-end-joint'
  root.append(form)
  document.getElementById('content').append(root)
}

export default renderChordEndJoint