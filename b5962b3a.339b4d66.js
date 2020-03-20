(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{184:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"rightToc",(function(){return r})),n.d(t,"default",(function(){return s}));n(210),n(211),n(207),n(212),n(213),n(214);var a=n(208);function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var i={id:"quickstart-rich-styling",title:"Rich Styling"},r=[{value:"EditorState: Yours to Command",id:"editorstate-yours-to-command",children:[]},{value:"RichUtils and Key Commands",id:"richutils-and-key-commands",children:[]},{value:"Styling Controls in UI",id:"styling-controls-in-ui",children:[]}],d={rightToc:r},l="wrapper";function s(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,["components"]);return Object(a.b)(l,o({},d,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Now that we have established the basics of the top-level API, we can go a step\nfurther and examine how basic rich styling can be added to a ",Object(a.b)("inlineCode",{parentName:"p"},"Draft")," editor."),Object(a.b)("p",null,"A ",Object(a.b)("a",o({parentName:"p"},{href:"https://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/rich"}),"rich text example"),"\nis also available to follow along."),Object(a.b)("h2",{id:"editorstate-yours-to-command"},"EditorState: Yours to Command"),Object(a.b)("p",null,"The previous article introduced the ",Object(a.b)("inlineCode",{parentName:"p"},"EditorState")," object as a snapshot of the full state of the editor, as provided by the ",Object(a.b)("inlineCode",{parentName:"p"},"Editor")," core via the ",Object(a.b)("inlineCode",{parentName:"p"},"onChange")," prop."),Object(a.b)("p",null,"However, since your top-level React component is responsible for maintaining the state, you also have the freedom to apply changes to that ",Object(a.b)("inlineCode",{parentName:"p"},"EditorState")," object in any way you see fit."),Object(a.b)("p",null,"For inline and block style behavior, for example, the ",Object(a.b)("a",o({parentName:"p"},{href:"/docs/api-reference-rich-utils"}),Object(a.b)("inlineCode",{parentName:"a"},"RichUtils"))," module provides a number of useful functions to help manipulate state."),Object(a.b)("p",null,"Similarly, the ",Object(a.b)("a",o({parentName:"p"},{href:"/docs/api-reference-modifier"}),"Modifier")," module also provides a\nnumber of common operations that allow you to apply edits, including changes\nto text, styles, and more. This module is a suite of edit functions that\ncompose simpler, smaller edit functions to return the desired ",Object(a.b)("inlineCode",{parentName:"p"},"EditorState"),"\nobject."),Object(a.b)("p",null,"For this example, we'll stick with ",Object(a.b)("inlineCode",{parentName:"p"},"RichUtils")," to demonstrate how to apply basic\nrich styling within the top-level component."),Object(a.b)("h2",{id:"richutils-and-key-commands"},"RichUtils and Key Commands"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"RichUtils")," has information about the core key commands available to web editors,\nsuch as Cmd+B (bold), Cmd+I (italic), and so on."),Object(a.b)("p",null,"We can observe and handle key commands via the ",Object(a.b)("inlineCode",{parentName:"p"},"handleKeyCommand")," prop, and\nhook these into ",Object(a.b)("inlineCode",{parentName:"p"},"RichUtils")," to apply or remove the desired style."),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{className:"language-js"}),"import {Editor, EditorState, RichUtils} from 'draft-js';\n\nclass MyEditor extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {editorState: EditorState.createEmpty()};\n    this.onChange = editorState => this.setState({editorState});\n    this.handleKeyCommand = this.handleKeyCommand.bind(this);\n  }\n\n  handleKeyCommand(command, editorState) {\n    const newState = RichUtils.handleKeyCommand(editorState, command);\n\n    if (newState) {\n      this.onChange(newState);\n      return 'handled';\n    }\n\n    return 'not-handled';\n  }\n\n  render() {\n    return (\n      <Editor\n        editorState={this.state.editorState}\n        handleKeyCommand={this.handleKeyCommand}\n        onChange={this.onChange}\n      />\n    );\n  }\n}\n")),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},Object(a.b)("inlineCode",{parentName:"p"},"handleKeyCommand")),Object(a.b)("p",{parentName:"blockquote"},"The ",Object(a.b)("inlineCode",{parentName:"p"},"command")," argument supplied to ",Object(a.b)("inlineCode",{parentName:"p"},"handleKeyCommand")," is a string value, the\nname of the command to be executed. This is mapped from a DOM key event. The\n",Object(a.b)("inlineCode",{parentName:"p"},"editorState")," argument represents the latest editor state as it might be\nchanged internally by draft when handling the key. Use this instance of the\neditor state inside ",Object(a.b)("inlineCode",{parentName:"p"},"handleKeyCommand"),". See\n",Object(a.b)("a",o({parentName:"p"},{href:"/docs/advanced-topics-key-bindings"}),"Advanced Topics - Key Binding")," for more\non this, as well as details on why the function returns ",Object(a.b)("inlineCode",{parentName:"p"},"handled")," or ",Object(a.b)("inlineCode",{parentName:"p"},"not-handled"),".")),Object(a.b)("h2",{id:"styling-controls-in-ui"},"Styling Controls in UI"),Object(a.b)("p",null,"Within your React component, you can add buttons or other controls to allow\nthe user to modify styles within the editor. In the example above, we are using\nknown key commands, but we can add more complex UI to provide these rich\nfeatures."),Object(a.b)("p",null,'Here\'s a super-basic example with a "Bold" button to toggle the ',Object(a.b)("inlineCode",{parentName:"p"},"BOLD")," style."),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{className:"language-js"}),"class MyEditor extends React.Component {\n  // ...\n\n  _onBoldClick() {\n    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));\n  }\n\n  render() {\n    return (\n      <div>\n        <button onClick={this._onBoldClick.bind(this)}>Bold</button>\n        <Editor\n          editorState={this.state.editorState}\n          handleKeyCommand={this.handleKeyCommand}\n          onChange={this.onChange}\n        />\n      </div>\n    );\n  }\n}\n")))}s.isMDXComponent=!0}}]);