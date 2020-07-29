<template>
  <div class="log-group">
    <header class="log-group-header">
      <aside class="log-group-infobox">
        <div
          v-for="row of group.infobox"
          :key="row.key"
        >
          <span class="log-group-infobox-key">{{ row.key }}:</span>
          {{ row.value }}
        </div>
      </aside>
      <nav class="log-group-records">
        <button
          v-for="(record, key) of group.records"
          :key="record.id"
          :class="{
            'log-group-record': true,
            'highlight': record.highlight,
            'active': (activeRecord === record)
          }"
          @click="selectRecord(record)"
        >
          <div>
            {{ group.records.length - key }}.
            <span class="log-group-name">
              <span
                v-if="record.icon"
                class="log-group-icon"
              >
                {{ record.icon }}
              </span>
              {{ record.alias || record.name }}
            </span>
          </div>
          <div>{{ record.requestTime.timeText }}</div>
        </button>
      </nav>
    </header>
    <log-record
      v-if="activeRecord"
      :record="activeRecord"
      :settings="settings"
    />
  </div>
</template>

<style>
.log-group {
  border: 1px solid #ccc;
  border-top: 0;
  background-color: #f8f8f8;
}

.log-group:first-of-type {
  border-top: 1px solid #ccc;
}

.log-group-header {
  overflow: hidden;
}

.log-group-infobox,
.log-group-records {
  float: left;
  padding: 1em;
}

.log-group-infobox {
  width: 15%;
}

.log-group-infobox-key {
  color: rgb(107, 107, 107);
}

.log-group-records {
  border-left: 1px solid #ccc;
  background-color: #fff;
  height: 200px;
  overflow-y: scroll;
  width: calc(85% - 1px);
}

.log-group-record {
  border: 1px solid transparent;
  border-radius: 5px;
  background-color: transparent;
  cursor: default;
  display: inline-block;
  font-family: inherit;
  line-height: 1.5;
  outline: none;
  margin-right: 1em;
  margin-bottom: 0.5em;
  padding: 0.75em 1em;
}

.log-group-name {
  color: #007fff;
}

.log-group-record:focus {
  border: 1px solid rgba(0, 0, 0, 0.158);
}

.log-group-record.highlight {
  border-color: #0080ff2c;
}

.log-group-record.active {
  border-color: #007fff;
}

.log-group-record * {
  text-align: center;
}

.log-group-icon {
  font-size: 85%;
  vertical-align: baseline;
}
</style>

<script>
import LogRecord from './LogRecord.vue'

export default {
  components: {
    LogRecord
  },

  props: {
    group: {
      type: Object,
      default: () => ({})
    },

    settings: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    activeRecord: null
  }),

  methods: {
    selectRecord (record) {
      this.activeRecord = (
        this.activeRecord === record
          ? null
          : record
      )
    }
  }
}
</script>
