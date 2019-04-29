<template>
  <v-layout column justify-center align-center>
    <v-flex> Proyecto Contabilidad 1 </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
  created() {
    axios
      .get('https://conta-1-9e105.firebaseio.com/cuentas.json')
      .then(res => {
        alert(res.data)
      })
      .catch()
  }
}
</script>
