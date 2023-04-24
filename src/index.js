import renderSpliceJoint from "./spliceJoint"
import renderChordEndJoint from "./chordEndJoint"
import renderWindframeJoint from "./windframeJoint"

const renderHome = (() => { 
    const root = document.getElementById('content')

    const header = document.createElement('h1')
    header.textContent = 'Joint Visualiser'

    const renderSpliceButton = document.createElement('button')
    renderSpliceButton.textContent = 'Render splice joint'
    renderSpliceButton.addEventListener('click', renderSpliceJoint)

    const renderChordEndJointButton = document.createElement('button')
    renderChordEndJointButton.textContent = 'Render chord end joint'
    renderChordEndJointButton.addEventListener('click', renderChordEndJoint)

    const renderWindframeJointButton = document.createElement('button')
    renderWindframeJointButton.textContent = 'Render windframe joint'
    renderWindframeJointButton.addEventListener('click', renderWindframeJoint)

    root.append(header)
    root.append(renderChordEndJointButton)
    root.append(renderWindframeJointButton)
    root.append(renderSpliceButton)
})()