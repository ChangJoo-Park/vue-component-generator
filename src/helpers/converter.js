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

function getProps (props) {
  const availableProps = props.filter((prop) => {
    return prop.name.trim() !== ''
  })
  // TODO: Add has props
  let hasValidation = false
  for (var i = 0; i < availableProps.length; i++) {
    if (availableProps[i].validation) {
      hasValidation = true
      break
    }
  }
  console.log(hasValidation)

  let result = availableProps.map((prop) => {
    if (prop.validation) {
      if (prop.required) {
        return `${prop.name}: {type: ${prop.type},\n required: ${prop.required}\n},`
      } else {
        return `${prop.name}: ${prop.type},`
      }
    } else {
      if (hasValidation) {
        return `${prop.name}: null,`
      }
      console.log('no')
      console.log(`'${prop.name}'`)
      return `'${prop.name}',`
    }
  }).join('')

  if (hasValidation) {
    // REMOVE
    result = result.replace(/,\s*$/, '')
    return `props: {\n${result}\n},`
  } else {
    result = result.slice(0, -1)
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
