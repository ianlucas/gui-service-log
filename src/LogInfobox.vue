<template>
  <table class="log-infobox">
    <tr
      v-for="pair of info"
      :key="pair.key"
    >
      <th>{{ pair.key }}</th>
      <td v-if="Array.isArray(pair.value)">
        <ol>
          <li
            v-for="value of pair.value"
            :key="value"
          >
            {{ value }}
          </li>
        </ol>
      </td>
      <td v-else>
        {{ pair.value }}
      </td>
    </tr>
  </table>
</template>

<style>
.log-infobox {
  border: none;
  margin-top: 1em;
  width: 100%;
}

.log-infobox th {
  color: rgb(107, 107, 107);
  text-align: right;
  vertical-align: top;
}

.log-infobox td {
  padding-left: 0.5em;
  text-align: left;
  vertical-align: top;
}

.log-infobox ol {
  counter-reset: steps;
  list-style: none;
  margin: 0;
  padding: 0;
}

.log-infobox ol li {
  counter-increment: steps;
}

.log-infobox ol li::before {
  background: rgb(107, 107, 107);
  border-radius: 50%;
  content: counter(steps);
  color: white;
  display: inline-grid;
  height: 1.2em;
  line-height: 1.2em;
  margin-right: 0.5rem;
  place-items: center;
  width: 1.2em;
}
</style>

<script>
export default {
  props: {
    info: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>
