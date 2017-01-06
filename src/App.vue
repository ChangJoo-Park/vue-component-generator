<template lang="pug">
  #app
    nav.header
      a.brand Vue Component Generator
    div.flex.two
      codemirror.container(v-bind:code="compiledComponent", v-bind:options="editorOption")
      div.container
        div
          div
            label.label-header Component Name
            input(type="text", v-model="newComponent.name")
          hr
          div.flex.two
            div
              label.label-header Template
              select(v-model="newComponent.selectedTemplate")
                option(v-for="option in options.template" v-bind:value="option") {{option}}
            div
              label.label-header Script
              select(v-model="newComponent.selectedScript")
                option(v-for="option in options.scripts" v-bind:value="option") {{option}}
          div.flex.two
            div
              label.label-header Style
              select(v-model="newComponent.selectedStyle")
                option(v-for="option in options.styles" v-bind:value="option") {{option}}
            div
              label.label-header Scoped Style
                br
                input(type="checkbox" v-model="newComponent.selectedScoped")
                span.checkable on
        hr
        div.component-form
          div.flex.two
            div
              div.flex.two
                h2 Props
                label.label-header.header
                  input(type="checkbox" value="selectedPropsValidation", v-model="newComponent.selectedPropsValidation")
                  span.checkable Validation
              button(v-on:click="addNewProp") Add
              div(v-for="(prop, index) in newComponent.props" v-if="newComponent.selectedPropsValidation")
                div.flex.two
                  div
                    label.label-header Name
                      input(type="text", v-model="prop.name")
                  div
                    label.label-header Type
                      select(v-model="prop.type")
                        option(v-for="option in options.propsType" v-bind:value="option") {{option}}
                      div.remove-button-wrapper
                        button.error.button(v-on:click="removeProp(index)") Remove
              div(v-for="(prop, index) in newComponent.props" v-else)
                label.label-header Name
                  input(type="text", v-model="prop.name")
                div.remove-button-wrapper
                  button.error.button(v-on:click="removeProp(index)") Remove
            div
              h2 Data
              button(v-on:click="addNewData") Add
              div(v-for="(data, index) in newComponent.data")
                label.label-header Data
                  input(type="text", v-model="data.name")
                div.remove-button-wrapper
                  button.error.button(v-on:click="removeData(index)") Remove
          hr
          div.flex.two
            div
              h2 Watch
              button(v-on:click="addNewWatch") Add
              div(v-for="(watch, index) in newComponent.watches")
                label.label-header Watch
                  input(type="text", v-model="watch.name")
                div.remove-button-wrapper
                  button.error.button(v-on:click="removeWatch(index)") Remove
            div
              h2 Computed
              button(v-on:click="addNewComputed") Add
              div(v-for="(computed, index) in newComponent.computed")
                label.label-header Computed
                  input(type="text", v-model="computed.name")
                div.remove-button-wrapper
                  button.error.button(v-on:click="removeComputed(index)") Remove
          hr
          div.flex.two
            div
              h2 Method
              button(v-on:click="addNewMethod") Add
              div(v-for="(method, index) in newComponent.methods")
                label.label-header Method
                  input(type="text", v-model="method.name")
                div.remove-button-wrapper
                  button.error.button(v-on:click="removeMethod(index)") Remove
            div
              h2 Lifecycle Hooks
              div
                label.label-header
                  input(type="checkbox" value="beforeCreate", v-model="newComponent.lifecycleHooks")
                  span.checkable beforeCreate
                label.label-header
                  input(type="checkbox" value="created", v-model="newComponent.lifecycleHooks")
                  span.checkable created
              div
                label.label-header
                  input(type="checkbox" value="beforeMount", v-model="newComponent.lifecycleHooks")
                  span.checkable beforeMount
                label.label-header
                  input(type="checkbox" value="mounted", v-model="newComponent.lifecycleHooks")
                  span.checkable mounted
              div
                label.label-header
                  input(type="checkbox" value="beforeUpdate", v-model="newComponent.lifecycleHooks")
                  span.checkable beforeUpdate
                label.label-header
                  input(type="checkbox" value="updated", v-model="newComponent.lifecycleHooks")
                  span.checkable updated
              div
                label.label-header
                  input(type="checkbox" value="beforeDestroy", v-model="newComponent.lifecycleHooks")
                  span.checkable beforeDestroy
                label.label-header
                  input(type="checkbox" value="destroyed", v-model="newComponent.lifecycleHooks")
                  span.checkable destroyed
</template>

<script>
import Beautify from 'js-beautify'

// let codemirror
export default {
  name: 'app',
  mounted () {

  },
  data: function () {
    return {
      options: {
        template: ['html', 'pug'],
        styles: ['css', 'scss', 'sass', 'stylus'],
        scripts: ['javascript', 'coffeescript'],
        scopedStyle: [true, false],
        propsType: ['null', 'String', 'Number', 'Boolean', 'Function', 'Object', 'Array']
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
        selectedPropsValidation: false,
        selectedScoped: false
      },
      editorOption: {
        tabSize: 2,
        mode: 'text/javascript',
        theme: 'solarized light',
        lineNumbers: true,
        line: true,
        keyMap: 'sublime',
        extraKeys: { 'Ctrl': 'autocomplete' },
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        styleSelectedText: true,
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
        viewportMargin: Infinity
      }
    }
  },
  methods: {
    addNewProp () {
      this.newComponent.props.push({name: '', type: 'String'})
    },
    removeProp (index) {
      this.newComponent.props.splice(index, 1)
    },
    addNewData () {
      this.newComponent.data.push({name: ''})
    },
    removeData (index) {
      this.newComponent.data.splice(index, 1)
    },
    addNewWatch () {
      this.newComponent.watches.push({name: ''})
    },
    removeWatch (index) {
      this.newComponent.watches.splice(index, 1)
    },
    addNewComputed () {
      this.newComponent.computed.push({name: ''})
    },
    removeComputed (index) {
      this.newComponent.computed.splice(index, 1)
    },
    addNewMethod () {
      this.newComponent.methods.push({name: ''})
    },
    removeMethod (index) {
      this.newComponent.methods.splice(index, 1)
    }
  },
  computed: {
    compiledComponent: function () {
      const component = JSON.parse(JSON.stringify(this.newComponent))
      const isHTML = component.selectedTemplate === 'html'
      const templateLanguage = isHTML ? '' : ` lang='${component.selectedTemplate}'`
      const styleLanguage = component.selectedStyle === 'css' ? '' : ` lang='${component.selectedStyle}'`
      const styleScoped = component.selectedScoped ? ' scoped' : ''
      const scriptLanguage = component.selectedScript === 'javascript' ? '' : ` lang='${component.selectedScript}'`
      let scriptBody = 'export default {'
      // TODO: Transform "kebab-case"
      scriptBody += 'name: ' + "'" + component.name + "',"
      // Props
      // TODO: Add Validation
      if (component.props && component.props.length > 0) {
        let scriptProps = component.props.map((prop) => {
          if (component.selectedPropsValidation) {
            return `${prop.name}: ${prop.type}`
          } else {
            return `'${prop.name}'`
          }
        }).join(',')
        if (component.selectedPropsValidation) {
          scriptBody += `props: {\n${scriptProps}\n},`
        } else {
          scriptBody += `props: [${scriptProps}],`
        }
      }
      // Check Data
      if (component.data && component.data.length > 0) {
        let scriptData = component.data.map(data => data.name + ": ''").join(',')
        scriptBody += `data () {return {${scriptData}}},`
      }
      // LifeCycle Hooks
      if (component.lifecycleHooks && component.lifecycleHooks.length > 0) {
        scriptBody += component.lifecycleHooks.map(hook => `${hook}() {},`).join(' ')
      }
      // Watches
      if (component.watches && component.watches.length > 0) {
        let scriptWatches = component.watches.map(watch => `${watch.name} (newVal, oldVal){}`).join(',')
        scriptBody += `watch: { ${scriptWatches} },`
      }
      // Computed
      if (component.computed && component.computed.length > 0) {
        let scriptComputed = component.computed.map(computed => `${computed.name} () {}`).join(',')
        scriptBody += `computed: { ${scriptComputed} },`
      }
      // Methods
      if (component.methods && component.methods.length > 0) {
        let scriptMethods = component.methods.map(method => `${method.name} () {}`).join(',')
        scriptBody += `methods: { ${scriptMethods} },`
      }
      scriptBody = scriptBody.trim().slice(0, -1)
      scriptBody += '}'
      scriptBody = Beautify(scriptBody, {
        'indent_size': 2,
        'indent_char': ' ',
        'other': ' ',
        'indent_level': 0,
        'indent_with_tabs': false,
        'preserve_newlines': true,
        'max_preserve_newlines': 2,
        'jslint_happy': true,
        'indent_handlebars': true,
        'object': {}
      })
      // let dummyText = '<!-- This Component is generated by Vue Component Generator - ChangJoo Park. --> \n'
      let templateBody = isHTML ? '\n\t<div>\n\n\t</div>\n' : '\n\tdiv\n'
      let templateResult = '<template' + templateLanguage + '>' + templateBody + '</template>\n\n'
      let scriptResult = '<script' + scriptLanguage + '>\n' + scriptBody + '\n</scri' + 'pt>\n\n'
      let styleResult = '<style' + styleLanguage + styleScoped + '>\n\n' + '</style>'
      const compiledComponent = templateResult + scriptResult + styleResult
      return compiledComponent
    }
  }
}
</script>

<style>
.generator {
  padding: 30px;
  padding-top: 10px;
}
.container {
  font-family: 'Source Code Pro', 'Monaco','menlo', monospace !important;
  width: 49% !important;
  height: 100% !important;
  margin-top: 55px;
}
.CodeMirror {
  height: 100vh !important;
  margin-top: 53px;
  position: fixed;
  left: 0;
  top: 0;
}
.label-header {
  font-size: 20px;
  margin-bottom: 10px;
}
.remove-button-wrapper {
  text-align: right;
}
.remove-button-wrapper .button {
  font-size: .75em;
}
.label-header.header {
  padding: .9em;
  margin: 0;
}
</style>
