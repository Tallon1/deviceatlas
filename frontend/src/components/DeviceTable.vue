<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Tablet Devices Sorted by OS Version</h1>
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th class="border px-4 py-2">User Agent</th>
          <th class="border px-4 py-2">Device Type</th>
          <th class="border px-4 py-2">OS Version</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="device in sortedDevices" :key="device.id">
          <td class="border px-4 py-2">{{ device.userAgent }}</td>
          <td class="border px-4 py-2">{{ device.deviceType }}</td>
          <td class="border px-4 py-2">{{ device.osVersion }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return { devices: [] };
  },
  computed: {
    sortedDevices() {
      return this.devices.sort((a, b) => {
        const [aMajor, aMinor] = a.osVersion.split('.').map(Number);
        const [bMajor, bMinor] = b.osVersion.split('.').map(Number);
        if (aMajor !== bMajor) return bMajor - aMajor;
        return (bMinor || 0) - (aMinor || 0);
      });
    }
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/devices');
      this.devices = response.data;
    } catch (error) {
      console.error("Error fetching devices:", error.message);
    }
  },
};
</script>
