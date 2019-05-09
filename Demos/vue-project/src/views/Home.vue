<template>
  <div class="home">
    <button @click="modal1 = !modal1">Modal</button>
     <LModal title="Hello LYGG" width=800 ref='modalChild' v-model="modal1">
          <h1>Sekiro</h1>
          <p>Shadows</p>
          <p>Die</p>
          <p>Twice</p>
      </LModal>
  </div>
</template>

<script>
// @ is an alias to /src
import LModal from "@/components/Modal.vue";

export default {
  name: "home",
  data() {
    return {
      modal1: false
    };
  },
  components: {
    LModal
  },
  methods: {}
};
</script>
