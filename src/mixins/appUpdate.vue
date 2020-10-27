<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class UpdateApp extends Vue {
  // refresh variables
  refreshing = false
  registration: ServiceWorkerRegistration | null = null
  updateExists = false

  created(): void {
    // Listen for our custom event from the SW registration
    document.addEventListener('swUpdated', ((event: CustomEvent) => {
        this.registration = event.detail
        this.updateExists = true
    }) as EventListener, { once: true })

    // Prevent multiple refreshes
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return
      this.refreshing = true
      // Here the actual reload of the page occurs
      window.location.reload()
    })
  }

  // Called when the user accepts the update
  refreshApp(): void {
    this.updateExists = false
    // Make sure we only send a 'skip waiting' message if the SW is waiting
    if (!this.registration || !this.registration.waiting) return
    // send message to SW to skip the waiting and activate the new SW
    this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
  }
}
</script>