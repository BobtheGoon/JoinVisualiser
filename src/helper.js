const clearContent = () => {
  const content = document.getElementById('form')
  content.replaceChildren()
}

const FormFactory = () => {
  const form = document.createElement('form')

  const getForm = () => form

  const createInputs = (...args) => {
    //Take in arguments for joint parameters and make them into input fields with the parameter as the inputs id

    const inputs = args.map(input => {
      const element = document.createElement('input')
      element.id = input
      return element
      })

    inputs.forEach(input => {
        form.append(input)
    })
  }

  const createFormLabels = (labels) => {
    console.log('inprog')
  }
  
  return {getForm, createInputs}
}

export {FormFactory, clearContent}