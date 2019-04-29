<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex>
          <v-card>
            <v-flex sm12>
              <v-toolbar color="primary">
                Ingresa tu Asiento
              </v-toolbar>
            </v-flex>
            <v-form>
              <v-container>
                <v-layout row wrap>
                  <v-flex sm2>
                    <v-text-field label="# de asiento"></v-text-field>
                  </v-flex>
                  <v-flex sm2>
                    <v-text-field label="fecha"></v-text-field>
                  </v-flex>
                  <v-flex sm7>
                    <v-text-field label="Referencia"></v-text-field>
                  </v-flex>
                  <v-flex sm1>
                    <v-text-field label="documento"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex sm6>
                    <v-text-field label="observacion"></v-text-field>
                  </v-flex>
                  <v-flex sm6>
                    <v-text-field label="detalle"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
            <v-layout row>
              <v-flex sm12>
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
        </v-flex>
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
