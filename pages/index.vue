<template>
  <v-layout column justify-center align-center>
    <v-flex> Proyecto Contabilidad 1 </v-flex>
    <v-autocomplete
      v-model="selected"
      :items="texto"
      item-text="name"
      item.value="id"
    >
    </v-autocomplete>
  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      writeSuccessful: false,
      readSuccessful: false,
      texto: [],
      selected: ''
    }
  },
  created() {
    axios.get('https://conta-1-9e105.firebaseio.com/cuentas.json').then(res => {
      for (const key in res.data) {
        this.texto.push(res.data[key])
      }
    })
  }
}
</script>
