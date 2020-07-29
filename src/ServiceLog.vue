<template>
  <div class="service-log">
    <log-group
      v-for="group of groups"
      :key="group.id"
      :group="group"
      :settings="settings"
    />
  </div>
</template>

<style>
.service-log * {
  box-sizing: border-box;
}
</style>

<script>
import { groupRecords } from './utils'
import LogGroup from './LogGroup.vue'
import defaultSettings from './defaultSettings'

export default {
  components: {
    LogGroup
  },

  props: {
    records: {
      type: Array,
      default: () => ([])
    },

    settings: {
      type: Object,
      default: () => defaultSettings
    }
  },

  computed: {
    groups () {
      return groupRecords(this.records)
    }
  }
}
</script>
