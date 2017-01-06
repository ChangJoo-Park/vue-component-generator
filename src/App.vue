<template lang="pug">
  #app
    nav.header
      a.brand Vue Component Generator
      div.menu
        a.button.icon-puzzle(href="https://github.com/ChangJoo-Park/vue-component-generator", target="_blank") Github Repo
    div.flex.two
      codemirror.container(v-bind:code="compiledComponent", v-bind:options="editorOption")
      div.container
        div
          div.card.introduce
            | Vue Component Generator was created for the purpose of describing the vue component. Please refer to the guide because some parts are not included.
            br
            | 이 프로젝트는 Vue 컴포넌트에 대한 설명을 위해 만들었습니다. 꼭 필요한 부분만 포함하였으므로 자세한 내용은 가이드를 참조하세요
            br
            | - ChangJoo Park
            br
            a(href="https://twitter.com/pcjpcj2", target="_blank") twitter
            a(href="https://github.com/pcjpcj2", target="_blank") github
            a(href="https://github.com/vuejs-kr", target="_blank") vue.js Korean user organization
          div
            label.label-header Component Name
              small (camelCase -> kebab-case)
            input(type="text", v-model="newComponent.name")
          hr
          div.flex.one
            div
              label.label-header Template
              select(v-model="newComponent.selectedTemplate")
                option(v-for="option in options.template" v-bind:value="option") {{option}}
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
                  small
                    a(href="https://vuejs.org/v2/guide/components.html#Prop-Validation", target="_blank")
                      img.guide(src="https://vuejs.org/images/logo.png")
                label.label-header.header
                  input(type="checkbox" value="selectedPropsValidation", v-model="newComponent.selectedPropsValidation")
                  span.checkable.mini Validation
              button(v-on:click="addNewProp") Add
              div(v-if="newComponent.selectedPropsValidation")
                div(v-for="(prop, index) in newComponent.props")
                  div.flex.two
                    div
                      label.label-header Name
                        input(type="text", v-model="prop.name")
                    div
                      label.label-header Type
                        select(v-model="prop.type")
                          option(v-for="option in options.propsType" v-bind:value="option") {{option}}
                  div.flex.two
                    div
                      label.label-header
                        input(type="checkbox" value="prop.required", v-model="prop.required")
                        span.checkable Required
                    div.remove-button-wrapper
                      button.error.button(v-on:click="removeProp(index)") Remove
              div(v-else)
                div(v-for="(prop, index) in newComponent.props")
                  label.label-header Name
                    input(type="text", v-model="prop.name")
                  div.remove-button-wrapper
                    button.error.button(v-on:click="removeProp(index)") Remove
            div
              h2 Data
                small
                  a(href="https://vuejs.org/v2/api/#Options-Data", target="_blank")
                    img.guide(src="https://vuejs.org/images/logo.png")
              button(v-on:click="addNewData") Add
              div(v-for="(data, index) in newComponent.data")
                label.label-header Name
                  input(type="text", v-model="data.name")
                div.remove-button-wrapper
                  button.error.button(v-on:click="removeData(index)") Remove
          hr
          div.flex.two
            div
              h2 Computed
                small
                  a(href="https://vuejs.org/v2/guide/computed.html#Computed-Properties", target="_blank")
                    img.guide(src="https://vuejs.org/images/logo.png")
              button(v-on:click="addNewComputed") Add
              div(v-for="(computed, index) in newComponent.computed")
                label.label-header Name
                  input(type="text", v-model="computed.name")
                div.remove-button-wrapper
                  button.error.button(v-on:click="removeComputed(index)") Remove
            div
              h2 Watch
                small
                  a(href="https://vuejs.org/v2/guide/computed.html#Watchers", target="_blank")
                    img.guide(src="https://vuejs.org/images/logo.png")
              button(v-on:click="addNewWatch") Add
              div(v-for="(watch, index) in newComponent.watches")
                label.label-header Name
                  input(type="text", v-model="watch.name")
                div.remove-button-wrapper
                  button.error.button(v-on:click="removeWatch(index)") Remove
          hr
          div.flex.two
            div
              h2 Method
                small
                  a(href="https://vuejs.org/v2/api/#methods", target="_blank")
                    img.guide(src="https://vuejs.org/images/logo.png")
              button(v-on:click="addNewMethod") Add
              div(v-for="(method, index) in newComponent.methods")
                label.label-header Name
                  input(type="text", v-model="method.name")
                div.remove-button-wrapper
                  button.error.button(v-on:click="removeMethod(index)") Remove
            div
              h2 Lifecycle Hooks
                small
                  a(href="https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks", target="_blank")
                    img.guide(src="https://vuejs.org/images/logo.png")
              div.flex.two
                div(v-for="option in options.lifecycles")
                  label.label-header
                    input(type="checkbox" v-bind:value="option", v-model="newComponent.lifecycleHooks")
                    span.checkable.mini {{option.name}}
</template>

<script>
import Beautify from 'js-beautify'
import converter from './helpers/converter'

export default {
  name: 'app',
  mounted () {
    console.log(converter)
  },
  data: function () {
    return {
      options: {
        template: ['html', 'pug'],
        styles: ['css', 'scss', 'sass', 'stylus'],
        scripts: ['javascript', 'coffeescript'],
        scopedStyle: [true, false],
        propsType: ['null', 'String', 'Number', 'Boolean', 'Function', 'Object', 'Array'],
        lifecycles: [
          { name: 'beforeCreate', order: 0 },
          { name: 'created', order: 1 },
          { name: 'beforeMount', order: 2 },
          { name: 'mounted', order: 3 },
          { name: 'beforeUpdate', order: 4 },
          { name: 'updated', order: 5 },
          { name: 'beforeDestroy', order: 6 },
          { name: 'destroyed', order: 7 }
        ]
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
      this.newComponent.props.push({name: '', type: 'String', required: false})
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
      scriptBody += converter.convertToKebabCase(component.name)
      // Props
      if (component.props && component.props.length > 0) {
        scriptBody += converter.getProps(component.props, component.selectedPropsValidation)
      }
      // Check Data
      if (component.data && component.data.length > 0) {
        scriptBody += `data () {return {${converter.getData(component.data)}}},`
      }
      // LifeCycle Hooks
      if (component.lifecycleHooks && component.lifecycleHooks.length > 0) {
        scriptBody += converter.getLifecycleHooks(component.lifecycleHooks)
      }
      // Watches
      if (component.watches && component.watches.length > 0) {
        scriptBody += `watch: { ${converter.getWatches(component.watches)} },`
      }
      // Computed
      if (component.computed && component.computed.length > 0) {
        scriptBody += `computed: { ${converter.getComputed(component.computed)} },`
      }
      // Methods
      if (component.methods && component.methods.length > 0) {
        scriptBody += `methods: { ${converter.getMethods(component.methods)} },`
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
html {
  font-size: 12px;
}
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
  margin-top: 40px;
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
  padding: .5em;
  margin: 0;
}
.mini {
  user-select: none;
  font-size: 14px;
}
.guide {
  width: 15px;
}
.introduce {
  padding: 5px !important;
}
</style>
