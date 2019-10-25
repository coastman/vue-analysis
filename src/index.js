import Vue from './core/index'

new Vue({
  el: '#app',
  data: {
    a: 1,
    b: 2,
  },
  render() {
    return (
      <div
        id="app" 
        class="app root" 
        data-root="root">
        <button onClick={(e) => {this.buttonClick(e)}}>
          {this.a}
        </button> 
      </div>
    )
  },
  methods: {
    buttonClick(e) {
      console.log(e)
      this.a++
    }
  }
})
