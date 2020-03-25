<template>
  <div>
    <nav>
      <div class="nav-wrapper teal lighten-1">
        <a href="#" class="brand-logo center">Loja</a>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          
          <li v-for="link of links" :key="link.id">
            
            <router-link class="nav-link" :to="link.page">{{link.text}}</router-link>
            
          </li>
        
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data(){
    return{
      links: [
        {
          id: 0,
          text: "Pessoas",
          page: "/pessoas"
        },
        {
          id: 1,
          text: "Pedidos",
          page: "/pedidos"
        }
      ]
    }
  }
}
</script>