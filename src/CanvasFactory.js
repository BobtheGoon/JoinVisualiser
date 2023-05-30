/*  TODO:
      -Take e1 dimensions from edge of hole instead of center
*/

import { drawPlate, drawProfile, drawBolts } from "./svgDrawer"

const CanvasFactory = () => {
  //SVG namespace
  const svgns = 'http://www.w3.org/2000/svg'
  //Size of drawing canvas
  const canvasHeight = 500
  const canvasWidth = 500
  //Create svg canvas
  const canvas = document.createElementNS(svgns, 'svg')
  canvas.id = 'canvas'
  canvas.setAttribute('width', canvasWidth)
  canvas.setAttribute('height', canvasHeight)
  canvas.setAttribute('viewBox', `0 0 ${canvasWidth} ${canvasHeight}`)

  const getCanvas = () => canvas
  
  const ConvertFormDataToInt = (formData) => {
    return Object.values(formData).map((value) => parseInt(value, 10))
  }

  const calculateEndPlateScale = (maxHeight, maxWidth) => {
    const scale = Math.max(maxHeight/canvasHeight, maxWidth/canvasWidth)*1.2 //Add 20% padding to canvas
    if (scale > 1) return scale
    else return 1
  }
  
  const calculatePlateDims = (e1, e2, p1, p2, boltCount, boltRows) => {
    const plateHeight = e1*2 + p1*boltRows
    const plateWidth = e2*2 + p2*(boltCount-1)
    
    const scale = calculateEndPlateScale(plateHeight, plateWidth)
    
    return {plateHeight, plateWidth, scale}
  }

  //Main function for drawing end plate connection
  const drawEndPlateConnection = (formData) => {
    canvas.innerHTML = ''
    
    //Convert values to int, get max plate size and scale factor
    const dimensions = ConvertFormDataToInt(formData)
    let {plateHeight, plateWidth, scale} = calculatePlateDims(dimensions[0], dimensions[1], dimensions[2], dimensions[3], dimensions[5], 1)
    
    //Prevent boltCount from being scaled
    const [boltCount] = dimensions.splice(5, 1)
    const boltRows = 2

    //Scale dimensions
    const [e1, e2, p1, p2, boltSize, profileHeight, profileWidth, profileThickness] = dimensions.map(dim => dim /= scale)
    plateHeight /= scale
    plateWidth /= scale

    //Draw plate to canvas
    const plate = drawPlate(plateHeight, plateWidth, canvasHeight, canvasWidth)
    canvas.appendChild(plate)

    //Scale profile and draw to canvas
    const profile = drawProfile(profileHeight, profileWidth, profileThickness, canvasHeight, canvasWidth)
    canvas.appendChild(profile)
    
    //Scale bolt size and draw to canvas
    const bolts = drawBolts(e1, e2, p1, p2, boltCount, boltRows, boltSize, plateHeight, plateWidth, canvasHeight, canvasWidth)
    bolts.forEach((bolt) => canvas.appendChild(bolt))
  }

  //Main function for drawing splice plate
  const drawSpliceJointConnection = (formData) => {
    canvas.innerHTML = ''

    const dimensions = ConvertFormDataToInt(formData)
    let {plateHeight, plateWidth, scale} = calculatePlateDims(dimensions[0], dimensions[1], dimensions[2], dimensions[3], dimensions[5], dimensions[6])
    
    //Prevent boltCount and boltRows from being scaled
    const [boltCount, boltRows] = dimensions.splice(5, 2)

    const [e1, e2, p1, p2, boltSize, profileHeight] = dimensions.map(dim => dim /= scale)
    plateHeight /= scale
    plateWidth /= scale

    //Draw plate to canvas
    const plate = drawPlate(plateHeight, plateWidth, canvasHeight, canvasWidth)
    canvas.appendChild(plate)

    //Scale bolt size and draw to canvas
    const bolts = drawBolts(e1, e2, p1, p2, boltCount, boltRows, boltSize, plateHeight, plateWidth, canvasHeight, canvasWidth)
    bolts.forEach((bolt) => canvas.appendChild(bolt))
  }

  return {getCanvas, drawEndPlateConnection, drawSpliceJointConnection}
}

export {CanvasFactory}