const template=`
<custom-style>
<style>

.material-icons {
    vertical-align:middle;
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 20px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  height: 24px;
  width: 24px;
  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}
</style>
</custom-style>
<i class="material-icons"></i>
`;
class PaperIcon extends HTMLElement{
    constructor () {
        super();
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = template;
    }
    connectedCallback() {
         this.icon = this.getAttribute('icon');
    }
    set icon(val){
        this.shadowRoot.querySelector(".material-icons").innerHTML=val;
    }
    get icon(){
        this.getAttribute('icon');
    }

}
customElements.define('paper-icon',PaperIcon,{extends:'span'});
