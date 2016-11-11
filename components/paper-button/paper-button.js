const template = `
<custom-style>
	<style>
		:host {
			box-sizing: border-box;
			min-width: 5.14em;
			margin: 0 0.29em;
			font: inherit;
			text-transform: uppercase;
			outline-width:0;
			border-radius: 3px;
			-moz-user-select: none;
			-ms-user-select:none;
			-webkit-user-select:none;
			user-select:none;
			cursor:pointer;
			padding: 0.7em 0.57em;
			transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
			display: inline-block;
			overflow:hidden;
			position:relative;
			contain: content;
			@apply --paper-font-common-base;
			contain: content;
			opacity:0.5;
		}
		:host(:hover){
			opacity:1;
		}
		:host([hidden]) {
			display: none !important;
		}
		:host([raised]:not([disabled])){
			@apply --shadow-elevation-2dp;
		}

		:host([disabled]) {
			background: #eaeaea;
			color: #a8a8a8;
			cursor: auto;
			pointer-events: none;
			box-shadow:none;
			@apply --paper-button-disabled;
		}

		:host([color]){
			color: var(--paper-button-color,'green');
		}

		:host:not([disabled]):focus{
			font-weight: 500;
		}
		:host([animated]) {
			@apply --shadow-transition;
		}
		#paper-button .ripple{
			position:absolute;
			transform: scale3d(0,0,0);
			opacity:1;
			transition: all 800ms cubic-bezier(0.4,0,0.2,1);
			border-radius: 50%;
			width:150px;
			height:150px;
			will-change: opacity transform;
			contain: content;
			z-index:-1;
		}

		#paper-button .ripple.run{
			opacity: 0;
			transform:none;
		}
	</style>
</custom-style>
<div id="paper-button">
	<slot>
	My Paper Button
	</slot>
</div>
`;

class PaperButton extends HTMLElement {
	constructor(){
		super();
		let shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = template;
		this.addListeners();
	}
	addListeners(){
		this.addEventListener('keydown',e=>{
			if(e.keyCode===32|| e.keyCode===13){
				this.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}));
			}
		});
		this.addEventListener('click',e => {
			if(this.disabled){
				e.preventDefault();
				e.stopPropagation();
			}else{
				this.drawRipple(e.offsetX, e.offsetY);
			}
		});
	}
	drawRipple(x, y) {
		let div = document.createElement('div');
		div.classList.add('ripple');
		this.shadowRoot.querySelector("#paper-button").appendChild(div);
		div.style.top = `${y - div.clientHeight/2}px`;
		div.style.left = `${x - div.clientWidth/2}px`;
		div.style.backgroundColor = getComputedStyle(this).color;
		div.classList.add('run');
		div.addEventListener('transitionend', e => div.remove());
	}
	connectedCallback() {
		 this.color = this.getAttribute('color');
	}
	disconnectedCallback() {}
	attributeChangedCallback(attrName, oldVal, newVal) {}
	set raised(val) {
		if (val) 	this.setAttribute('raised', '');
 		else 	this.removeAttribute('raised');
	}
	get raised() {
		return this.hasAttribute('raised');
	}
	get disabled() {
		return this.hasAttribute('disabled');
	}
	set disabled(val) {
		 if (val)	this.setAttribute('disabled', '');
		 else this.removeAttribute('disabled');
 	}
	 set color(val){
		 this.style.color = val;
		 this.setAttribute('color',val);
	 }
	 get color(){
		 return this.getAttribute('color');
	 }

}

customElements.define('paper-button',PaperButton,{extends:'button'});
