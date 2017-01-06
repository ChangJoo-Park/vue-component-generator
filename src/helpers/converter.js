import changeCase from 'change-case'

function convertToKebabCase (name) {
  let tempName = ''
  if (!name || name.trim() === '') {
    tempName = 'myNewComponent'
  }
  const newComponentName = tempName || name
  const result = changeCase.paramCase(newComponentName)
  return 'name: ' + "'" + result + "',"
}

function getLifecycleHooks (hooks) {
  console.log('getLifecycleHooks', hooks)
  const sortedHooks = hooks.sort((a, b) => {
    return a.order - b.order
  })

  return sortedHooks.map(hook => `${hook.name}() {\n\n},`).join(' ')
}

function getWatches (watches) {
  const availableWatches = watches.filter((w) => {
    return w.name.trim() !== ''
  })
  return availableWatches.map(watch => `${watch.name} (newVal, oldVal){\n\n}`).join(',')
}

function getComputed (computed) {
  const availableComputed = computed.filter((c) => {
    return c.name.trim() !== ''
  })
  return availableComputed.map(c => `${c.name} () {}`).join(',')
}

function getProps (props, selectedPropsValidation) {
  const availableProps = props.filter((prop) => {
    return prop.name.trim() !== ''
  })
  let result = availableProps.map((prop) => {
    if (selectedPropsValidation) {
      if (prop.required) {
        return `${prop.name}: {type: ${prop.type},\n required: ${prop.required}\n},`
      } else {
        return `${prop.name}: ${prop.type},`
      }
    } else {
      return `'${prop.name}',`
    }
  }).join('').slice(0, -1)

  if (selectedPropsValidation) {
    return `props: {\n${result}\n},`
  } else {
    return `props: [${result}],`
  }
}

function getData (items) {
  const availableData = items.filter((item) => item.name !== '')
  return availableData.map(data => data.name + ": ''").join(',')
}

function getMethods (methods) {
  const availableMethods = methods.filter((method) => {
    return method.name.trim() !== ''
  })
  return availableMethods.map(method => `${method.name} () {\n\n}`).join(',')
}

export default {
  convertToKebabCase,
  getLifecycleHooks,
  getWatches,
  getComputed,
  getProps,
  getData,
  getMethods
}
