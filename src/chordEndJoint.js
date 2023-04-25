import { clearContent } from "./helper"
import { FormFactory } from "./FormFactory"

const renderChordEndJoint = () => {
  // clearContent()
  const form = FormFactory()
  form.createInputs('e1', 'e2', 'p1', 'p2', 'boltSize', 'pHeight', 'pWidth')
  form.createLabels(['e1', 'e2', 'p1', 'p2', 'Bolt', 'Profile Height', 'Profile Width'])


  const root = document.createElement('div')
  root.id = 'chord-end-joint'
  root.append(form.getForm())
  document.getElementById('content').append(root)
}

export default renderChordEndJoint