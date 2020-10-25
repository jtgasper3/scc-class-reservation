<template>
  <b-container>
    <b-form-row>
      <b-col>
        Initials
      </b-col>
      <b-col>
        <b-form-input
          v-model="newValue"
          @input="$emit('input', newValue)"
          @change="$emit('change', newValue)"
          @update="$emit('update', newValue)"
        />
      </b-col>
    </b-form-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Model, Vue } from 'vue-property-decorator';
import db from '@/firebase';

@Component
export default class ScheduleChange extends Vue {
  newValue = ""
  @Prop() value!: string
  @Prop() data!: any;

  mounted(): void {
    this.newValue = this.value
    this.loadData();
  }

  private async loadData(): Promise<void> {
    const docRef = db.collection('dates').doc(this.data.date)
        .collection('rooms').doc(this.data.room)
        .collection('timeSlot').doc(this.data.timeSlot);

    const doc = await docRef.get();

    if (doc.exists) {
      this.value = doc.data()?.initials;
    }
  }

}
</script>