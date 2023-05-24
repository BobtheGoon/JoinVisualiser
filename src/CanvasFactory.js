const CanvasFactory = () => {
  //Size of drawing canvas
  const canvasHeight = 400
  const canvasWidth = 400

  //Create an svg canvas
  const svgns = 'http://www.w3.org/2000/svg'
  const canvas = document.createElementNS(svgns, 'svg')
  canvas.id = 'canvas'
  canvas.setAttribute('width', canvasWidth)
  canvas.setAttribute('height', canvasHeight)
  canvas.setAttribute('viewBox', `0 0 ${canvasWidth} ${canvasHeight}`)

  const getCanvas = () => canvas

  
  const calculatePlateDims = (e1, e2, p1, p2, boltCount) => {
    const plateHeight = e1*2 + p1
    const plateWidth = e2*2 + p2*(boltCount-1)
    
    return {plateHeight, plateWidth}
  }

  //Draw plate
  const drawPlate = (e1, e2, p1, p2, boltCount) => {
    const {plateHeight, plateWidth} = calculatePlateDims(e1, e2, p1, p2, boltCount)
    
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

  const convertFormDataToInt = (formData) => {
    return Object.values(formData).map((value) => parseInt(value, 10))
  }
  
  //Parent function for drawing connection
  const drawConnection = (formData) => {
    canvas.innerHTML = ''
    const [e1, e2, p1, p2, boltSize, boltCount, profileHeight, profileWidth, profileThickness] = convertFormDataToInt(formData)
    
    const plate = drawPlate(e1, e2, p1, p2, boltCount)
    canvas.appendChild(plate)
    
    const profile = drawProfile(profileHeight, profileWidth, profileThickness)
    canvas.appendChild(profile)
    
    const bolts = drawBolts(e1, e2, p1, p2, boltCount, boltSize)
    bolts.forEach((bolt) => canvas.appendChild(bolt))
  }
  
  return {getCanvas, drawConnection}
}

export {CanvasFactory}