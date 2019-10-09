import Vue from './core/index'

new Vue({
  el: '#app',
  data: {
    a: 1,
    b: 2,
  },
  render() {
    setTimeout(() => {
      this.a = 2
      console.log(this.a)
    }, 3000);
    return (
      <div
        id="app" 
        class="app root" 
        data-root="root">
      <button>
        {this.a}
      </button> 
      </div>
    )
  }
})