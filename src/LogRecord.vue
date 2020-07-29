<template>
  <div class="log-record">
    <header class="log-record-header">
      <button
        class="log-record-button"
        @click="copyToEmail"
      >
        {{ settings.l10n.copyToEmail }}
      </button>
      <button
        class="log-record-button"
        @click="copyInfo"
      >
        {{ settings.l10n.copyInfo }}
      </button>
      <button
        class="log-record-button"
        @click="copyRequest"
      >
        {{ settings.l10n.copyRequest }}
      </button>
      <button
        class="log-record-button"
        @click="copyResponse"
      >
        {{ settings.l10n.copyResponse }}
      </button>
      <button
        class="log-record-button"
        @click="download"
      >
        {{ settings.l10n.download }}
      </button>
    </header>
    <div
      ref="info"
      class="log-record-info"
    >
      <div>{{ settings.l10n.name }} {{ record.name }}</div>
      <div>{{ settings.l10n.endpoint }} {{ record.endpoint }}</div>
      <div>
        {{ settings.l10n.timestamp }} {{ record.requestTime.dateText }}
        {{ record.requestTime.timeText }}-{{ record.responseTime.timeText }}
      </div>
      <div
        v-if="record.alerts"
        class="log-record-alerts"
      >
        <div
          v-for="alert of record.alerts"
          :key="alert"
          class="log-record-message"
        >
          {{ alert }}
        </div>
      </div>
      <div
        v-if="record.errors"
        class="log-record-errors"
      >
        <div
          v-for="error of record.errors"
          :key="error"
          class="log-record-message"
        >
          {{ error }}
        </div>
      </div>
      <log-infobox
        v-if="record.info"
        :info="record.info"
      />
    </div>
    <div class="log-record-content">
      <div
        ref="request"
        class="log-record-data"
      />
      <div
        ref="response"
        class="log-record-data"
      />
    </div>
  </div>
</template>

<style>
.log-record {
  border-top: 1px solid #ccc;
}

.log-record-content {
  border-top: 1px solid #ccc;
  overflow: hidden;
}

.log-record-data {
  float: left;
  overflow-x: scroll;
  padding: 1em;
  width: 50%;
}

.log-record-data:nth-child(2) {
  border-left: 1px solid #ccc;
}

.log-record-info {
  line-height: 1.5;
  padding: 1em;
}

.log-record-alerts {
  border-left: 3px solid #007fff;
  background-color: #f1f1f1;
  margin-top: 1em;
  padding: 1em;
}

.log-record-errors {
  border-left: 3px solid red;
  background-color: #f1f1f1;
  margin-top: 1em;
  padding: 1em;
}

.log-record-messages:not(:first-of-type) {
  margin-top: 0.5em;
}

.log-record pre {
  margin: 0;
}

.log-record .hl-name,
.log-record .hl-tag {
  color: blue;
}

.log-record .hl-key,
.log-record .hl-attr {
  color: #f00;
}

.log-record .hl-string {
  color: #a31515;
}

.log-record .hl-boolean {
  color: purple;
}

.log-record-header {
  border-bottom: 1px solid #f1f1f1;
}

.log-record-button {
  background-color: transparent;
  border: none;
  font-family: inherit;
  padding: 0.5em 1em;
}

.log-record-button:hover {
  background-color: #ccc;
}
</style>

<script>
import { copyHtmlElement, copyText, writeFile, empty, encodeHtmlEntities } from './utils.js'
import highlight from 'highlight'
import LogInfobox from './LogInfobox.vue'

export default {
  components: {
    LogInfobox
  },

  props: {
    record: {
      type: Object,
      default: () => ({})
    },

    settings: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    requestData: null,
    responseData: null
  }),

  watch: {
    record: {
      immediate: true,
      handler () {
        this.requestData = highlight(this.record.request, this.record.mimeType)
        this.responseData = highlight(this.record.response, this.record.mimeType)
      }
    }
  },

  mounted () {
    this.updateData()
  },

  updated () {
    this.updateData()
  },

  methods: {
    updateData () {
      const { request, response } = this.$refs
      empty(request, response)
      const requestElement = this.requestData.element
      const responseElement = this.responseData.element
      request.appendChild(requestElement)
      response.appendChild(responseElement)
      const maxHeight = Math.max(
        requestElement.clientHeight,
        responseElement.clientHeight
      )
      requestElement.style.height = `${maxHeight}px`
      responseElement.style.height = `${maxHeight}px`
    },

    getInfo (separator = '<br>') {
      const lines = [...this.$refs.info.children]
      return lines.map((line) => line.textContent.trim()).join(separator)
    },

    copyToEmail () {
      const info = this.getInfo()
      const request = encodeHtmlEntities(this.requestData.element.textContent).replace(/\n/g, '<br>')
      const response = encodeHtmlEntities(this.responseData.element.textContent).replace(/\n/g, '<br>')
      let body = ''

      body += `<p>${info}</p>`
      body += '<p>'
      body += '<table style="border-collapse: collapse; white-space: pre; border: 1px solid #000;">'
      body += '<tr>'
      body += `<td style="vertical-align: top; border: 1px solid #000; padding: 4px;">${request}</td>`
      body += `<td style="vertical-align: top; border: 1px solid #000; padding: 4px;">${response}</td>`
      body += '</tr>'
      body += '</table>'
      body += '</p>'

      copyHtmlElement(body)
    },

    copyInfo () {
      copyText(this.getInfo('\n'))
    },

    copyRequest () {
      copyText(this.requestData.element.textContent)
    },

    copyResponse () {
      copyText(this.responseData.element.textContent)
    },

    download () {
      const request = this.requestData.element.textContent
      const response = this.responseData.element.textContent
      if (this.record.mimeType === 'application/json') {
        writeFile(`${this.record.name}-Request.json`, request)
        writeFile(`${this.record.name}-Response.json`, response)
      } else {
        writeFile(`${this.record.name}.xml`, `${request}\n${response}`, 'text/xml')
      }
    }
  }
}
</script>
