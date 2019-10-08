import Vue from './core/index'

new Vue({
  el: '#app',
  data: {
    a: 1,
    b: 2,
  },
  render() {
    return <div id="app" class="app root" data-root="root">
      <h1 data-h="h">
        <p data-p="p">{ this.a + this.b }</p>
      </h1>  
    </div>
  }
})