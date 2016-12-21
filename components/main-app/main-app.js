
var PaperButton =  require('../paper-button/paper-button');
var PaperFab =  require('../paper-fab/paper-fab');
var PaperIcon =  require('../paper-icon/paper-icon');
var PaperDrawerPanel =  require('../paper-drawer-panel/paper-drawer-panel');

var template = `
<custom-style>
<style>

</style>
</custom-style>
<paper-drawer-panel>
	<div slot="main">MI CASA</div>
	<div slot="drawer">DORY</div>
</paper-drawer-panel>

`;
class MainApp extends HTMLElement {
	constructor(){
		super();
		let shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML =template;
	}

	connectedCallback() {}
	disconnectedCallback() {}
	attributeChangedCallback(attrName, oldVal, newVal) {}


}

customElements.define('main-app',MainApp);
customElements.whenDefined('main-app').then(() => {
	console.log('registered main-app');
});
module.exports = MainApp;
