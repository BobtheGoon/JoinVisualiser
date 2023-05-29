const CanvasFactory = () => {
  //Size of drawing canvas
  const canvasHeight = 500
  const canvasWidth = 500
  
  //Create svg canvas
  const svgns = 'http://www.w3.org/2000/svg'
  const canvas = document.createElementNS(svgns, 'svg')
  canvas.id = 'canvas'
  canvas.setAttribute('width', canvasWidth)
  canvas.setAttribute('height', canvasHeight)
  canvas.setAttribute('viewBox', `0 0 ${canvasWidth} ${canvasHeight}`)
  
  const getCanvas = () => canvas
  
  const ConvertFormDataToInt = (formData) => {
    //[e1, e2, p1, p2, boltSize, boltCount, profileHeight, profileWidth, profileThickness]
    return Object.values(formData).map((value) => parseInt(value, 10))
  }

  const calculateEndPlateScale = (maxHeight, maxWidth) => {
    const scale = Math.max(maxHeight/canvasHeight, maxWidth/canvasWidth)*1.2 //Add 20% padding to canvas
    if (scale > 1) return scale
    else return 1
  }
  
  const calculatePlateDims = (e1, e2, p1, p2, boltCount) => {
    const plateHeight = e1*2 + p1
    const plateWidth = e2*2 + p2*(boltCount-1)
    
    const scale = calculateEndPlateScale(plateHeight, plateWidth)
    
    return {plateHeight, plateWidth, scale}
  }

  //Draw plate
  const drawPlate = (plateHeight, plateWidth) => {    
    const plate = document.createElementNS(svgns, 'rect')
    plate.setAttribute('x', canvasWidth/2 - plateWidth/2)
    plate.setAttribute('y', canvasHeight/2 - plateHeight/2)
    plate.setAttribute('height', plateHeight)
    plate.setAttribute('width', plateWidth)
    plate.setAttribute('fill', '#dddddd')
    
    return plate
  }
  
  //Draw profile
  const drawProfile = (height, width, thickness) => {
    const profile = document.createElementNS(svgns, 'rect')
    
    //Since stroke-width is set inwards, we need to subtract it from height and width so the profile size is displayed correctly
    height -= thickness
    width -= thickness
    
    profile.setAttribute('x', canvasWidth/2 - width/2)
    profile.setAttribute('y', canvasHeight/2 - height/2)
    profile.setAttribute('width', width)
    profile.setAttribute('height', height)
    profile.setAttribute('stroke', 'black')
    profile.setAttribute('fill', 'transparent')
    profile.setAttribute('stroke-width', thickness)
    
    return profile    
  }
  
  //Draw bolts
  const drawBolts = (e1, e2, p1, p2, boltCount, boltSize) => {
    const {plateHeight, plateWidth} = calculatePlateDims(e1, e2, p1, p2, boltCount)
    let bolts = []
    
    //Create top bolt row
    for(let i=0 ; i < boltCount; i++) {
      const bolt = document.createElementNS(svgns, 'circle')
      bolt.setAttribute('cx', canvasWidth/2 - plateWidth/2 + e2 + p2*i)
      bolt.setAttribute('cy', canvasHeight/2 - plateHeight/2 + e1)
      bolt.setAttribute('r', boltSize/2)
      bolt.setAttribute('fill', '#000000')
      bolts.push(bolt)
    }
    
    //Create bottom bolt row
    for(let i=0 ; i < boltCount; i++) {
      const bolt = document.createElementNS(svgns, 'circle')
      bolt.setAttribute('cx', canvasWidth/2 - plateWidth/2 + e2 + p2*i)
      bolt.setAttribute('cy', canvasHeight/2 + plateHeight/2 - e1)
      bolt.setAttribute('r', boltSize/2)
      bolt.setAttribute('fill', '#000000')
      bolts.push(bolt)
    }
    
    return bolts
  }

  //Main function for drawing end plate connection
  const drawEndPlateConnection = (formData) => {
    canvas.innerHTML = ''

    //Convert values to int, get max plate size and scale factor
    const dimensions = ConvertFormDataToInt(formData)
    let {plateHeight, plateWidth, scale} = calculatePlateDims(dimensions[0], dimensions[1], dimensions[2], dimensions[3], dimensions[5])
    const [boltCount] = dimensions.splice(5, 1)
    console.log(boltCount)

    //Scale dimensions
    const scaled_dims = dimensions.map(dim => dim /= scale)
    const [e1, e2, p1, p2, boltSize, profileHeight, profileWidth, profileThickness] = scaled_dims
    plateHeight /= scale
    plateWidth /= scale

    console.log(scale)
    console.log(scaled_dims)
    
    //Draw plate to canvas
    const plate = drawPlate(plateHeight, plateWidth)
    canvas.appendChild(plate)

    //Scale profile and draw to canvas
    const profile = drawProfile(profileHeight, profileWidth, profileThickness)
    canvas.appendChild(profile)
    
    //Scale bolt size and draw to canvas
    const bolts = drawBolts(e1, e2, p1, p2, boltCount, boltSize)
    bolts.forEach((bolt) => canvas.appendChild(bolt))
  }

  const drawSpliceJointConnection = (formData) => {
    console.log('spliceplate')
  }

  return {getCanvas, drawEndPlateConnection, drawSpliceJointConnection}
}

export {CanvasFactory}