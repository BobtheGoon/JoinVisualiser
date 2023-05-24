import { clearContent } from "./helper"
import { FormFactory } from "./FormFactory"
import { CanvasFactory} from "./CanvasFactory"


const renderChordEndJoint = () => {
  //Clear previous form if present
  clearContent()

  const root = document.createElement('div')
  root.id = 'joint-form'

  //Create the canvas
  const canvas = CanvasFactory()

  //Create the form with the correct inputs for end joint
  const form = FormFactory()
  form.createInputs('e1', 'e2', 'p1', 'p2', 'boltSize', 'boltCount', 'profileHeight', 'profileWidth', 'profileThickness')
  form.createLabels(['e1', 'e2', 'p1', 'p2', 'Bolt Size', 'Bolt Count', 'Profile Height', 'Profile Width', 'Profile Thickness'])
  form.createSubmitButton('Submit')
  form.addSubmitEvent(canvas.drawConnection)

  root.append(form.getForm())
  root.append(canvas.getCanvas())
  document.getElementById('content').append(root)
}


export default renderChordEndJoint