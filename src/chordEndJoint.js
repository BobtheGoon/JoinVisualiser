import { clearContent } from "./helper"
import { FormFactory } from "./FormFactory"
import { CanvasFactory} from "./CanvasFactory"

const createForm = (submitEvent) => {
  const form = FormFactory()
  form.createInputs('e1', 'e2', 'p1', 'p2', 'boltSize', 'boltCount', 'profileHeight', 'profileWidth', 'profileThickness')
  form.createLabels(['e1', 'e2', 'p1', 'p2', 'Bolt Size', 'Bolt Count', 'Profile Height', 'Profile Width', 'Profile Thickness'])
  form.createSubmitButton('Submit')
  form.addSubmitEvent(submitEvent)

  return form
}

const createCanvas = () => {
  const canvas = CanvasFactory()
  //e1, e2, p1, p2, profile height, profile width, profile thickness, bolt count, bolt size
  // canvas.drawConnection({e1:50, e2:50, p1:230, p2:80, boltCount:4, boltSize:40, profileHeight:120, profileWidth:120, profileThickness:6})

  return canvas
}

const renderChordEndJoint = () => {
  // clearContent()

  const root = document.createElement('div')
  root.id = 'chord-end-joint'

  const canvas = createCanvas()
  const form = createForm(canvas.drawConnection)

  root.append(form.getForm())
  root.append(canvas.getCanvas())
  document.getElementById('content').append(root)
}

export default renderChordEndJoint