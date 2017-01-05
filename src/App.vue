<template lang="pug">
  #app
    div.header
    //- Left (Generator)
    div.generator
      div.options
        div.form-group
          label Template
          select(v-model="newComponent.selectedTemplate")
            option(v-for="option in options.template" v-bind:value="option") {{option}}
        div.form-group
          label Script
          select(v-model="newComponent.selectedScript")
            option(v-for="option in options.scripts" v-bind:value="option") {{option}}
        div.form-group
          label Style
          select(v-model="newComponent.selectedStyle")
            option(v-for="option in options.styles" v-bind:value="option") {{option}}
        div.form-group
          label Scoped Style
            input(type="checkbox" v-model="newComponent.selectedScoped")
      div.component-form
        div.form-group
          label Component Name
          input(type="text", placeholder="file-name" v-model="newComponent.name")
        div.form-group
          button(v-on:click="addNewProp") Add Prop
          div(v-for="(prop, index) in newComponent.props")
            label Props {{prop}}
              input(type="text", placeholder="props" v-model="prop.name")
              button(v-on:click="removeProp(index)") Remove
        div.form-group
          button(v-on:click="addNewData") Add Data
          div(v-for="(data, index) in newComponent.data")
            label Data {{data}}
              input(type="text", v-model="data.name")
              button(v-on:click="removeData(index)") Remove
        div.form-group
          button(v-on:click="addNewWatch") Add Watch
          div(v-for="(watch, index) in newComponent.watches")
            label Watch {{watch}}
              input(type="text", v-model="watch.name")
              button(v-on:click="removeWatch(index)") Remove
        div.form-group
          button(v-on:click="addNewComputed") Add Computed
          div(v-for="(computed, index) in newComponent.computed")
            label Computed {{computed}}
              input(type="text", v-model="computed.name")
              button(v-on:click="removeComputed(index)") Remove
        div.form-group
          button(v-on:click="addNewMethod") Add Method
          div(v-for="(method, index) in newComponent.methods")
            label Method {{method}}
              input(type="text", v-model="method.name")
              button(v-on:click="removeMethod(index)") Remove
        //- LifeCycle Hook
        div.form-group LifeCycle Hooks
          label
            input(type="checkbox" value="beforeCreate", v-model="newComponent.lifecycleHooks")
            | beforeCreate
          label
            input(type="checkbox" value="created", v-model="newComponent.lifecycleHooks")
            | created
          label
            input(type="checkbox" value="beforeMount", v-model="newComponent.lifecycleHooks")
            | beforeMount
          label
            input(type="checkbox" value="mounted", v-model="newComponent.lifecycleHooks")
            | mounted
          label
            input(type="checkbox" value="beforeUpdate", v-model="newComponent.lifecycleHooks")
            | beforeUpdate
          label
            input(type="checkbox" value="updated", v-model="newComponent.lifecycleHooks")
            | updated
          label
            input(type="checkbox" value="beforeDestroy", v-model="newComponent.lifecycleHooks")
            | beforeDestroy
          label
            input(type="checkbox" value="destroyed", v-model="newComponent.lifecycleHooks")
            | destroyed
        div.form-group
          button  Reset
          button(v-on:click="saveComponent")  Confirm
    //- Right (Result)
    div.result
      pre {{options}}
      pre {{newComponent}}
      pre {{compiledComponents}}
</template>

<script>
// function htmlEscape (str) {
//   return str.replace(/&/g, '&amp;') // first!
//             .replace(/>/g, '&gt;')
//             .replace(/</g, '&lt;')
//             .replace(/"/g, '&quot;')
//             .replace(/'/g, '&#39;')
//             .replace(/`/g, '&#96;')
// }
//
// function html (literalSections, ...substs) {
//   // Use raw literal sections: we don’t want
//   // backslashes (\n etc.) to be interpreted
//   let raw = literalSections.raw
//
//   let result = ''
//
//   substs.forEach((subst, i) => {
//     // Retrieve the literal section preceding
//     // the current substitution
//     let lit = raw[i]
//
//     // In the example, map() returns an array:
//     // If substitution is an array (and not a string),
//     // we turn it into a string
//     if (Array.isArray(subst)) {
//       subst = subst.join('')
//     }
//
//     // If the substitution is preceded by a dollar sign,
//     // we escape special characters in it
//     if (lit.endsWith('$')) {
//       subst = htmlEscape(subst)
//       lit = lit.slice(0, -1)
//     }
//     result += lit
//     result += subst
//   })
//   // Take care of last literal section
//   // (Never fails, because an empty template string
//   // produces one literal section, an empty string)
//   result += raw[raw.length - 1] // (A)
//
//   return result
// }

export default {
  name: 'app',
  data: function () {
    return {
      options: {
        template: ['html', 'pug'],
        styles: ['css', 'scss', 'sass', 'stylus'],
        scripts: ['javascript', 'coffeescript'],
        scopedStyle: [true, false]
      },
      newComponent: {
        name: '',
        props: [],
        data: [],
        watches: [],
        computed: [],
        methods: [],
        lifecycleHooks: [],
        selectedTemplate: 'html',
        selectedStyle: 'css',
        selectedScript: 'javascript',
        selectedScoped: false
      },
      components: []
    }
  },
  methods: {
    addNewProp () {
      this.newComponent.props.push({name: ''})
    },
    removeProp (index) {
      this.newComponent.props.splice(index, 1)
    },
    addNewData () {
      this.newComponent.data.push({name: ''})
    },
    removeData (index) {
      this.newComponent.props.splice(index, 1)
    },
    addNewWatch () {
      this.newComponent.watches.push({name: ''})
    },
    removeWatch (index) {
      this.newComponent.props.splice(index, 1)
    },
    addNewComputed () {
      this.newComponent.computed.push({name: ''})
    },
    removeComputed (index) {
      this.newComponent.props.splice(index, 1)
    },
    addNewMethod () {
      this.newComponent.methods.push({name: ''})
    },
    removeMethod (index) {
      this.newComponent.props.splice(index, 1)
    },
    saveComponent () {
      var component = JSON.parse(JSON.stringify(this.newComponent))
      this.components.push(component)
    }
  },
  computed: {
    compiledComponents: function () {
      return this.components.map((c) => {
        const component = JSON.parse(JSON.stringify(c))
        const templateLanguage = component.selectedTemplate === 'html' ? '' : ` lang='${component.selectedTemplate}'`
        const styleLanguage = component.selectedStyle === 'css' ? '' : ` lang='${component.selectedStyle}'`
        const styleScoped = component.selectedScoped ? ' scoped' : ''
        const scriptLanguage = component.selectedScript === 'javascript' ? '' : ` lang='${component.selectedScript}'`
        let scriptBody = 'export default {'
        // Props
        if (component.props && component.props.length > 0) {
          let scriptProps = component.props.map(prop => `'${prop.name}',`).join(' ').slice(0, -1)
          scriptBody += `props: [${scriptProps}],`
        }
        // Check Data
        if (component.data && component.data.length > 0) {
          let scriptData = component.data.map(data => data.name + ": '' ,").join(' ').slice(0, -1)
          scriptBody += `data: function () {return {${scriptData}}},`
        }
        // LifeCycle Hooks
        if (component.lifecycleHooks && component.lifecycleHooks.length > 0) {
          scriptBody += component.lifecycleHooks.map(hook => `${hook}() {},`).join(' ')
        }
        // Watches
        if (component.watches && component.watches.length > 0) {
          let scriptWatches = component.watches.map(watch => `${watch.name} (newVal, oldVal){},`).join(' ')
          scriptBody += `watch: { ${scriptWatches} },`
        }
        // Computed
        if (component.computed && component.computed.length > 0) {
          let scriptComputed = component.computed.map(computed => `${computed.name} () {},`).join(' ')
          scriptBody += `computed: { ${scriptComputed} },`
        }
        // Methods
        if (component.methods && component.methods.length > 0) {
          let scriptMethods = component.methods.map(method => `${method.name} () {},`).join(' ')
          scriptBody += `methods: { ${scriptMethods} },`
        }
        scriptBody = scriptBody.trim().slice(0, -1)
        scriptBody += '}'
        // console.log(templateLanguage, scriptLanguage, styleLanguage, styleScoped)
        const compiledComponent = '<template' + templateLanguage + '><div>' + '</template>' +
                                  '<script' + scriptLanguage + '>' +
                                  scriptBody +
                                  '</scri' + 'pt>' +
                                  '<style' + styleLanguage + styleScoped + '>' + '</style>'
        return compiledComponent
      })
    }
  }
}
</script>

<style>
</style>
