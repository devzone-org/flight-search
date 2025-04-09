<script setup>
import { ref } from 'vue';
import axios from 'axios';

const from = ref('');
const to = ref('');
const responses = ref([]);
const routes = [
  { from: 'Lahore', to: 'Doha' },
  { from: 'Sialkot', to: 'Dubai' },
  { from: 'Islambad', to: 'Riyadh' },
];

const handleSubmit = () => {
  responses.value = [];
  console.log('working');
console.log(`http://localhost:3001/bulk-requests/search?from=${from.value}&to=${to.value}`);

  const eventSource = new EventSource(`http://localhost:3001/bulk-requests/search?from=${from.value}&to=${to.value}`);

  eventSource.onmessage = (event) => {
    console.log(event.data);
    
    const parsedData = JSON.parse(event.data);
    responses.value.push(parsedData);
  };

  eventSource.onerror = (err) => {
    console.error('EventSource failed:', err);
    eventSource.close();
  };
};

</script>


<template>
    <div class="container">
      <form @submit.prevent="handleSubmit" class="form">
        <h2 class="heading">Search API</h2>
        <div class="form-group">
          <label for="from" class="label">From:</label>
          <select 
            id="from"
            v-model="from"
            class="input"
          >
            <option disabled value="">Select Source</option>
            <option value="Lahore">Lahore</option>
            <option value="Islambad">Islambad</option>
            <option value="Sialkot">Sialkot</option>
          </select>
  
          <label for="to" class="label">To:</label>
          <select 
            id="to"
            v-model="to"
            class="input"
          >
            <option disabled value="">Select Destination</option>
            <option value="Dubai">Dubai</option>
            <option value="Riyadh">Riyadh</option>
            <option value="Doha">Doha</option>
          </select>
  
          <button 
            type="submit" 
            class="submit-btn"
          >
            Search
          </button>
        </div>
      </form>
  
      <div class="responses">
        <h3 class="response-heading">API Responses:</h3>
        <ul class="response-list">
          <li 
            v-for="(res, index) in responses" 
            :key="index"
            class="response-item"
          >
            <div class="response-title">
              {{ res.error ? `Error: ${res.error}` : res.source }}
            </div>
            <div v-if="!res.error" class="response-details">
              <div><strong>Sleep Time:</strong> {{ res.sleepTime }}ms</div>
              <div><strong>Response Time:</strong> {{ res.responseTime }}ms</div>
              <div><strong>API Fetch Time:</strong> {{ res.apiFetchTime }}ms</div>
              <div class="api-response">
                <strong>API Response:</strong>
                <pre class="response-pre">{{ JSON.stringify(res.apiResponse, null, 2) }}</pre>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form {
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.heading {
  font-size: 24px;
  font-weight: 600;
  color: #4a4a4a;
  margin-bottom: 15px;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 15px;
}

.label {
  font-size: 18px;
  color: #616161;
}

.input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  width: 100px;
}

.submit-btn {
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.responses {
  margin-top: 20px;
}

.response-heading {
  font-size: 20px;
  font-weight: 600;
  color: white;
}

.response-list {
  list-style-type: none;
  padding: 0;
}

.response-item {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.response-title {
  font-weight: bold;
  font-size: 18px;
  color: #333;
}

.response-details {
  font-size: 14px;
  color: #555;
  margin-top: 10px;
}

.api-response {
  margin-top: 15px;
}

.response-pre {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
