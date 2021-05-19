<template>
  <div class="col">
    <div class="row">
      <q-input v-model="numA" type="number" />
      <q-input v-model="numB" type="number" />
    </div>
    <div class="row">
      <q-btn @click="sum" round icon="add" />
      <q-btn round icon="close" />
      <q-btn round icon="remove" />
      <q-btn round icon="nearby_off" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['num1', 'num2'],
  data: () => ({
    numA: 0,
    numB: 0
  }),
  mounted () {
    this.numA = this.num1
    this.numB = this.num2
  },
  methods: {
    sum () {
      const ans = +this.numA + +this.numB
      console.log('Child', ans)
      this.$emit('compute', ans)
      this.$emit('input', ans + 1)
    }
  }
}
</script>
