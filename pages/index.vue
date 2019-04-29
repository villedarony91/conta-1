<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex sm12>
          <v-toolbar color="primary">
            Ingresa tu Asiento
          </v-toolbar>
        </v-flex>
        <v-card>
          <v-layout row wrap>
            <v-flex sm12>
              <v-text-field></v-text-field>
              <v-text-field></v-text-field>
              <v-autocomplete
                v-model="selected"
                :items="texto"
                item-text="name"
                item.value="id"
              >
              </v-autocomplete>
            </v-flex>
          </v-layout>
        </v-card>
      </v-layout>
    </v-container>
  </div>
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
