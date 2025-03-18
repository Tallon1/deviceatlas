<template>
  <div>
    <h1 class="text-xl font-bold mb-4 text-center pt-4">Tablet Devices Sorted by OS Version</h1>
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr class="px-6 py-4 whitespace-nowrap text-sm text-black-500 bg-gray-500">
          <th class="border px-4 py-2">User Agent</th>
          <th class="border px-4 py-2">Device Type</th>
          <th class="border px-4 py-2">OS Version</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="device in sortedDevices" :key="device.id" class="bg-white hover:bg-gray-200 transition duration-150 ease-in-out cursor-pointer">
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
