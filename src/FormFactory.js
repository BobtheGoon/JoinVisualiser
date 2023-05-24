const FormFactory = () => {
  const form = document.createElement('form')

  const addSubmitEvent = (submitEvent) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const formData = getFormData()
      console.log(formData)

      //Perform input sanitisation and ensure each input field is filled out, after which send values to submitEvent

      submitEvent(formData)
    })
  }

  const getForm = () => form

  const createInputs = (...args) => {
    //Take in arguments for joint parameters and make them into input fields with the parameter as the inputs id

    const inputs = args.map(input => {
      const container = document.createElement('div')
      container.id = input

      const inputElement = document.createElement('input')
      inputElement.name = input
      container.append(inputElement)
      return container
      })

    inputs.forEach(input => {
        form.append(input)
    })
  }

  //Get values from form inputs
  const getFormData = () => {
    return Object.fromEntries(new FormData(form).entries())
  } 

  const checkInputs = (formData) => {

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

  const createSubmitButton = (buttonText) => {
    const button = document.createElement('button')
    button.textContent = buttonText

    form.append(button)
  }

  return {addSubmitEvent, getForm, createInputs, createLabels, createSubmitButton}
}

export {FormFactory}