<template>
  <b-container>
    <b-row>
      <b-col><strong>Day</strong></b-col>
      <b-col>{{ data.date }}</b-col>
    </b-row>
    <b-row>
      <b-col><strong>Time Slot</strong></b-col>
      <b-col>{{ data.timeSlot }}</b-col>
    </b-row>
    <b-row>
      <b-col><strong>Room</strong></b-col>
      <b-col>{{ data.room }}</b-col>
    </b-row>
    <b-form-row>
      <b-col><strong>Your Initials</strong></b-col>
      <b-col>
        <b-form-input
          v-model="newValue"
          autofocus
          aria-describedby="help-block"
          ref="input"
          @input="$emit('input', newValue)"
          @change="$emit('change', newValue)"
          @update="$emit('update', newValue)"
        />
      </b-col>
      <b-button
        size="sm"
        pill
        variant="transparent"
        @click="clearInput"
      >
        <b-icon-x-circle />
      </b-button>
      <b-form-text id="help-block">
      Enter your initials or other identifiers. Remember that this information is some what public.
    </b-form-text>
    </b-form-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
import db from '@/firebase';
import { BFormInput } from 'bootstrap-vue';

@Component
export default class ScheduleChange extends Vue {
  newValue = "";
  @Prop() value!: string;
  @Prop() data!: any;

  @Ref() readonly input!: BFormInput;

  mounted(): void {
    this.newValue = this.value;
    this.loadData();
  }

  private async loadData(): Promise<void> {
    const docRef = db.collection('dates').doc(this.data.date)
        .collection('rooms').doc(this.data.room)
        .collection('timeSlot').doc(this.data.timeSlot);

    try {
      const doc = await docRef.get({ source: 'server' });

      if (doc.exists) {
        this.newValue = doc.data()?.initials;
      }
    } catch(err) {

    }
  }

  private clearInput() {
    this.newValue = "";
    this.input.focus();
    this.$emit('input', this.newValue);
  }
}
</script>