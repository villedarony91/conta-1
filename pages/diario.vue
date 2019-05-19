<template>
  <v-layout>
    <v-flex text-xs-center>
      <h1>Libro Diario</h1>
      <div>
        <v-card v-for="(item, index) in diario" :key="index">
          <v-container dense>
            <v-layout row wrap>
              <v-flex>
                <v-card>
                  <v-flex sm12>
                    <v-toolbar color="primary" dark>
                      <v-layout row wrap>
                        <v-flex sm2>
                          <v-text-field
                            v-model="item.header.asiento"
                          ></v-text-field>
                        </v-flex>
                        <v-flex sm2>
                          <v-text-field
                            v-model="item.header.fecha"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-toolbar>
                  </v-flex>
                  <v-form>
                    <v-container>
                      <v-layout row wrap>
                        <v-flex sm7>
                          <v-text-field
                            label="Referencia"
                            v-model="item.header.referencia"
                          ></v-text-field>
                        </v-flex>
                        <v-flex sm1>
                          <v-text-field
                            label="documento"
                            v-model="item.header.documento"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex sm6>
                          <v-text-field
                            label="observacion"
                            v-model="item.header.observacion"
                          ></v-text-field>
                        </v-flex>
                        <v-flex sm6>
                          <v-text-field
                            label="detalle"
                            v-model="item.header.detalle"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                  <v-layout>
                    <v-flex sm12>
                      <v-data-table
                        :headers="headers"
                        :items="item.operations"
                        class="elevation-1"
                      >
                        <template v-slot:items="props">
                          <td>{{ props.item.cuenta }}</td>
                          <td class="text-xs-center">
                            {{ props.item.descripcion }}
                          </td>
                          <td class="text-xs-center">
                            {{ props.item.documento }}
                          </td>
                          <td class="text-xs-center">{{ props.item.debe }}</td>
                          <td class="text-xs-center">{{ props.item.haber }}</td>
                        </template>
                      </v-data-table>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    diario: () => {
      return []
    },
    editedItem: {
      cuenta: '',
      descripcion: '',
      documento: '',
      debe: 0.0,
      haber: 0.0
    },
    headers: [
      {
        text: 'Cuenta',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Descripcion', value: 'calories' },
      { text: 'Documento', value: 'fat' },
      { text: 'Debe', value: 'carbs' },
      { text: 'Haber', value: 'protein' }
    ]
  }),
  created() {
    const data = this.$store.getters['diario/loadedDiario']
    this.diario = data
  }
}
</script>
