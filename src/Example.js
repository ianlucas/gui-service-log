
import Vue from 'vue'
import ServiceLog from './ServiceLog.vue'
import sampleRows from './sampleRows'

new Vue({
  render: (h) => (
    h(ServiceLog, {
      props: {
        records: sampleRows,
        settings: {
          l10n: {
            name: 'Nome:',
            endpoint: 'URL:',
            timestamp: 'Data/Hora:',
            copyToEmail: 'Copiar para e-mail',
            copyInfo: 'Copiar cabeçalho',
            copyRequest: 'Copiar request',
            copyResponse: 'Copiar response',
            download: 'Baixar'
          }
        }
      }
    })
  )
}).$mount('#app')
