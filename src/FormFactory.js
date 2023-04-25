const FormFactory = () => {
  const form = document.createElement('form')

  const getForm = () => form

  const createInputs = (...args) => {
    //Take in arguments for joint parameters and make them into input fields with the parameter as the inputs id

    const inputs = args.map(input => {
      const container = document.createElement('div')
      container.id = input

      const inputElement = document.createElement('input')
      container.append(inputElement)
      return container
      })

    inputs.forEach(input => {
        form.append(input)
    })
  }

  const createLabels = (labels) => {
    //Create labels provided as an array and apply correct label elements to inputs
    let index = 0

    labels.forEach(() => {
      const labelElement = document.createElement('label')
      labelElement.textContent = labels[index]
      
      form.childNodes[index].append(labelElement)

      index++
    })
  }
  
  return {getForm, createInputs, createLabels}
}

export {FormFactory}