<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

const input = ref('');
const responses = ref([]);

const handleSubmit = async () => {
  responses.value = [];
  const count = parseInt(input.value);

  for (let i = 0; i < count; i++) {
    axios.get(`http://localhost:3001/bulk-requests/${i + 1}`)
      .then(res => {
        responses.value.push(res.data);
        responses.value.sort((a, b) => a.responseTime - b.responseTime);
      })
      .catch(err => {
        responses.value.push({ error: err.message });
      });

  }
  
};
</script>

<template>
  <div class="container">
    <form @submit.prevent="handleSubmit" class="form">
      <h2 class="heading">API Request Bulk</h2>
      <div class="form-group">
        <label for="api-count" class="label">Enter the number of API requests:</label>
        <input 
          id="api-count"
          type="number" 
          v-model="input" 
          placeholder="Enter number of API calls"
          class="input"
        />
        <button 
          type="submit" 
          class="submit-btn"
        >
          Submit
        </button>
      </div>
    </form>

    <div  class="responses">
      <h3 class="response-heading">API Responses:</h3>
      <ul class="response-list">
        <li 
          v-for="(res, index) in responses" 
          :key="index"
          class="response-item"
        >
          <div class="response-title">
            {{ res.error ? `Error: ${res.error}` : `Response for API ${res.id}` }}
          </div>
          <div v-if="!res.error" class="response-details">
            <div><strong>Sleep Time:</strong> {{ res.sleepTime }}ms</div>
            <div><strong>Response Time:</strong> {{ res.responseTime }}ms</div>
            <div><strong>API Fetch Time:</strong> {{ res.responseTime - res.sleepTime }}ms</div>
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
