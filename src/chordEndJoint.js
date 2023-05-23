import { clearContent } from "./helper"
import { FormFactory } from "./FormFactory"
import { CanvasFactory} from "./CanvasFactory"

const createForm = () => {
  const form = FormFactory()
  form.createInputs('e1', 'e2', 'p1', 'p2', 'boltSize', 'boltCount', 'profileHeight', 'profileWidth')
  form.createLabels(['e1', 'e2', 'p1', 'p2', 'Bolt Size', 'Bolt Count', 'Profile Height', 'Profile Width'])

  return form
}

const createCanvas = () => {
  const canvas = CanvasFactory()
  // canvas.drawConnection(45, 45, 150, 60, 80, 80, 5, 3, 30)
  //e1, e2, p1, p2, profile height, profile width, profile thickness, bolt count, bolt size
  canvas.drawConnection(50, 50, 230, 80, 120, 120, 6, 4, 40)

  return canvas
}

const renderChordEndJoint = () => {
  // clearContent()

  const root = document.createElement('div')
  root.id = 'chord-end-joint'

  const form = createForm()
  const canvas = createCanvas()

  root.append(form.getForm())
  root.append(canvas.getCanvas())
  document.getElementById('content').append(root)
}

export default renderChordEndJoint