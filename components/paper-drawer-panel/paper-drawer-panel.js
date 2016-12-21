const template=`
<custom-style>
<style>
:host {
	display: table;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	@apply --paper-font-common-base;
	display: table;
}
#drawer,
#main {
  display: table-cell;
  vertical-align: top;
}
#paper-drawer-panel{
	width: 100%;
	height: 100%;
}
#paper-drawer-panel #drawer{
	background-color:yellow;
	position: relative;
	 display: block;
	 min-height: 100%;
	 overflow-y: auto;
	 overflow-x: hidden;
	 border: none;
	 -webkit-transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
	 -o-transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
	 transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
#paper-drawer-panel #main{
	background-color:grey;
}
#drawer.open {
  min-width: 280px;
  width: 280px;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
#drawer{
  width: 0;
  -webkit-transform: translate3d(-280px, 0, 0);
  transform: translate3d(-280px, 0, 0);
}
#drawer.open {
  min-width: 280px;
  width: 280px;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.drawer-fixed-left,
.drawer-fixed-right,
.drawer-stacked {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 1035;
}
.drawer-stacked {
  left: 0;
}
.drawer-fixed-left {
  left: 0;
  box-shadow: 2px 0px 15px rgba(0, 0, 0, 0.35);
  -webkit-box-shadow: 2px 0px 15px rgba(0, 0, 0, 0.35);
}
.drawer-fixed-right {
  right: 0;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.35);
  -webkit-box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.35);
  -webkit-transform: translate3d(280px, 0, 0);
  transform: translate3d(280px, 0, 0);
}
.drawer-fixed-right.open {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.sidebar-overlay {
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background: #000;
  z-index: 1034;
  -webkit-transition: visibility 0 linear 0.4s, opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  -moz-transition: visibility 0 linear 0.4s, opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transition: visibility 0 linear 0.4s, opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
}
.sidebar-overlay.active {
  opacity: 0.5;
  visibility: visible;
  -webkit-transition-delay: 0;
  -moz-transition-delay: 0;
  transition-delay: 0;
}
</style>
</custom-style>
<div id="paper-drawer-panel">
	<div class="sidebar-overlay"></div>
	<div id="drawer" class="" >
		<slot name="drawer">DRAWER</slot>
	</div>
	<div id="main">
		<slot name="main">MAIN</slot>
	</div>
</div>
`;
class PaperDrawerPanel extends HTMLElement{
	constructor () {
		super();
		let shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = template;
	}
	connectedCallback() {
		this.icon = this.getAttribute('icon');
		//this.$.main = this.querySelector("#main");
		//this.$.drawer = this.querySelector("#drawer");
	}
}
customElements.define('paper-drawer-panel',PaperDrawerPanel,{extends:'div'});
