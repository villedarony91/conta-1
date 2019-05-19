<template>
  <div>
    <v-container dense>
      <v-alert :value="alertVisible" color="error" icon="warning" outline>
        {{ 'No existen ' + alertMessage }}
      </v-alert>
      <v-layout row wrap>
        <v-flex>
          <v-card>
            <v-flex sm12>
              <v-toolbar color="primary" dark>
                Ingresa tu Asiento
              </v-toolbar>
            </v-flex>
            <v-form>
              <v-container>
                <v-layout row wrap>
                  <v-flex sm2>
                    <v-text-field
                      label="# de asiento"
                      v-model="asiento"
                      :error-messages="asientoErrors"
                    ></v-text-field>
                  </v-flex>
                  <v-flex sm2>
                    <v-text-field
                      label="Fecha"
                      v-model="fecha"
                      :error-messages="fechaErrors"
                    ></v-text-field>
                  </v-flex>
                  <v-flex sm7>
                    <v-text-field
                      label="Referencia"
                      v-model="referencia"
                      :error-messages="referenciaErrors"
                    ></v-text-field>
                  </v-flex>
                  <v-flex sm1>
                    <v-text-field
                      label="Documento"
                      v-model="documento"
                      :error-messages="documentoErrors"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex sm6>
                    <v-text-field
                      label="Observacion"
                      v-model="observacion"
                    ></v-text-field>
                  </v-flex>
                  <v-flex sm6>
                    <v-text-field
                      label="Detalle"
                      v-model="detalle"
                      :error-messages="detalleErrors"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
            <v-layout>
              <v-flex sm12>
                <v-toolbar flat color="white">
                  <v-dialog v-model="dialog" max-width="800px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark v-on="on"
                        >Operaci&oacute;n Nueva</v-btn
                      >
                      <v-btn color="primary" dark @click="saveOnStore"
                        >Guardar</v-btn
                      >
                      <v-btn color="primary" @click="showDiario"
                        >Ver libro Diario</v-btn
                      >
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container grid-list-sm>
                          <v-layout wrap>
                            <v-flex xs12 sm6 md6>
                              <v-autocomplete
                                v-model="editedItem.cuenta"
                                :items="texto"
                                item-text="name"
                                item.value="id"
                                label="Cuenta"
                              >
                              </v-autocomplete>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                              <v-text-field
                                v-model="editedItem.descripcion"
                                label="Descripción"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md2>
                              <v-text-field
                                v-model="editedItem.documento"
                                label="Documento"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                              <v-text-field
                                v-model="editedItem.debe"
                                label="Debe"
                                @input="cleanHaber"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                              <v-text-field
                                v-model="editedItem.haber"
                                @input="cleanDebe"
                                label="Haber"
                              ></v-text-field>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="close"
                          >Cancel</v-btn
                        >
                        <v-btn color="blue darken-1" flat @click="save"
                          >Save</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
                <v-data-table
                  :headers="headers"
                  :items="operations"
                  class="elevation-1"
                >
                  <template v-slot:items="props">
                    <td>{{ props.item.cuenta }}</td>
                    <td class="text-xs-center">{{ props.item.descripcion }}</td>
                    <td class="text-xs-center">{{ props.item.documento }}</td>
                    <td class="text-xs-center">{{ props.item.debe }}</td>
                    <td class="text-xs-center">{{ props.item.haber }}</td>
                    <td class="justify-center layout px-0">
                      <v-icon small class="mr-2" @click="editItem(props.item)">
                        edit
                      </v-icon>
                      <v-icon small @click="deleteItem(props.item)">
                        delete
                      </v-icon>
                    </td>
                  </template>
                </v-data-table>
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
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  validations: {
    asiento: { required },
    fecha: { required },
    referencia: { required },
    observacion: { required },
    detalle: { required },
    documento: { required }
  },
  data() {
    return {
      asiento: '',
      fecha: '',
      referencia: '',
      observacion: '',
      detalle: '',
      documento: '',
      writeSuccessful: false,
      readSuccessful: false,
      texto: [],
      selected: '',
      requiredMessage: 'es obligatorio',
      dialog: false,
      alertMessage: '',
      alertVisible: false,
      headers: [
        {
          text: 'Cuenta',
          align: 'center',
          sortable: false,
          value: 'name'
        },
        { text: 'Descripcion', align: 'center', value: 'calories' },
        { text: 'Documento', align: 'center', value: 'fat' },
        { text: 'Debe', align: 'center', value: 'carbs' },
        { text: 'Haber', align: 'center', value: 'protein' },
        { text: 'Actions', align: 'center', value: 'name', sortable: false }
      ],
      operations: [],
      editedIndex: -1,
      editedItem: {
        cuenta: '',
        descripcion: '',
        documento: '',
        debe: 0.0,
        haber: 0.0
      },
      defaultItem: {
        cuenta: '',
        descripcion: 0,
        documento: 0,
        debe: 0,
        haber: 0
      }
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nueva Operación' : 'Editar Operación'
    },
    detalleErrors() {
      const errors = []
      if (!this.$v.detalle.$dirty) return errors
      !this.$v.detalle.required &&
        errors.push('Detalle ' + this.requiredMessage)
      return errors
    },
    asientoErrors() {
      const errors = []
      if (!this.$v.asiento.$dirty) return errors
      !this.$v.asiento.required &&
        errors.push('Asiento ' + this.requiredMessage)
      return errors
    },
    fechaErrors() {
      const errors = []
      if (!this.$v.fecha.$dirty) return errors
      !this.$v.fecha.required && errors.push('Fecha ' + this.requiredMessage)
      return errors
    },
    referenciaErrors() {
      const errors = []
      if (!this.$v.referencia.$dirty) return errors
      !this.$v.referencia.required &&
        errors.push('Referencia ' + this.requiredMessage)
      return errors
    },
    documentoErrors() {
      const errors = []
      if (!this.$v.documento.$dirty) return errors
      !this.$v.documento.required &&
        errors.push('Documento ' + this.requiredMessage)
      return errors
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  created() {
    axios.get('https://conta-1-9e105.firebaseio.com/cuentas.json').then(res => {
      for (const key in res.data) {
        this.texto.push(res.data[key])
      }
    })
  },

  methods: {
    saveOnStore() {
      if (this.operations.length < 1) {
        this.alertMessage = 'operaciones'
        this.alertVisible = true
        return
      } else {
        this.alertMessage = ''
        this.alertVisible = false
      }
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.$store.commit('diario/setDiario', {
        header: {
          asiento: this.asiento,
          fecha: this.fecha,
          referencia: this.referencia,
          observacion: this.observacion,
          detalle: this.detalle,
          documento: this.documento
        },
        operations: this.operations
      })
      this.asiento = ''
      this.fecha = ''
      this.referencia = ''
      this.documento = ''
      this.observacion = ''
      this.detalle = ''
      this.operations = []
    },
    showDiario() {
      const data = this.$store.getters['diario/loadedDiario']
      if (data.length < 1) {
        this.alertMessage = 'asientos'
        this.alertVisible = true
      } else {
        this.alertMessage = ''
        this.alertVisible = false
        this.$router.push({
          path: 'diario'
        })
      }
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.operations.splice(index, 1)
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save() {
      this.operations.pop()
      if (this.editedIndex > -1) {
        Object.assign(this.operations[this.editedIndex], this.editedItem)
      } else {
        this.operations.push(this.editedItem)
      }
      // eslint-disable-next-line
      let debe = 0.0
      // eslint-disable-next-line
      let haber = 0.0
      for (const keyOp in this.operations) {
        for (const field in this.operations[keyOp]) {
          if (field === 'debe') {
            debe += parseFloat(+this.operations[keyOp][field])
          }
          if (field === 'haber') {
            haber += Number(this.operations[keyOp][field])
          }
        }
      }
      this.operations.push({ cuenta: 'Total', debe: debe, haber: haber })
      this.close()
    },
    cleanDebe() {
      this.editedItem.debe = 0
    },
    cleanHaber() {
      this.editedItem.haber = 0
    }
  }
}
</script>
