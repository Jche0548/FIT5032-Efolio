<template>
    <div class="d-flex justify-content-center align-items-start min-vh-100 py-5">
     <div class="w-75">
       <h2 class="text-center mb-4">User Information Form</h2>
  
          <form @submit.prevent="submitForm">
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="username" class="form-label">Username:</label>
                <input 
                type="text" 
                class="form-control" 
                id="username"
                @blur="validateName(true)"
                @input="validateName(true)"
                v-model="formData.username" />
                <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
              </div>
              <div class="col-md-6">
                <label for="password" class="form-label">Password:</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  @blur="validatePassword(true)"
                  @input="validatePassword(false)"
                  v-model="formData.password" />
                  <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
              </div>
            </div>
  
            <div class="row mb-3">
              <div class="col-md-6">
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="isAustralian"
                    v-model="formData.isAustralian"
                  >
                  <label class="form-check-label" for="isAustralian">Australian Resident?</label>
                </div>
              </div>
              <div class="col-md-6">
                <label for="gender" class="form-label">Gender</label>
                <select 
                  class="form-select" 
                  id="gender" 
                  @blur ="validateGender(true)"
                  @change ="validateGender(true)"
                  v-model="formData.gender">
                  <option value="">--Select --</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
              </div>
            </div>
  
            <div class="mb-3">
              <label for="reason" class="form-label">Reason For Joining:</label>
              <Textarea
                id="reason"
                rows="3"
                v-model="formData.reason"
                @blur="validateReason(true)"
                @input="validateReason(false)"
                class="w-100">
            </Textarea>
              <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
            </div>
  
            <div class="text-center">
              <button type="submit" class="btn btn-primary me-2">Submit</button>
              <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
            </div>
          </form>
          
          <div class="row mt-5" v-if="submittedCards.length">
            <DataTable :value="submittedCards" stripedRows tableStyle="min-width: 60rem">
              <Column field="username" header="Username" />
              <Column field="password" header="Password" />
              <Column header="Australian Resident">
                <template #body="{ data }">{{ data.isAustralian ? 'true' : 'false' }}</template>
              </Column>
              <Column field="gender" header="Gender" />
              <Column field="reason" header="Reason" />
            </DataTable>
          </div>
        </div>
      </div>
</template>
  
  <script setup>
  import { ref } from 'vue'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import Textarea from 'primevue/textarea'
  
  const formData = ref({
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: '',
  })
  
  const submittedCards = ref([])
  
  const submitForm = () => {
    validateName(true);
    validatePassword(true);
    validateGender(true);
    validateReason(true);
    var alterMessage = ''
    if (
        !errors.value.username &&
        !errors.value.password &&
        !errors.value.gender &&
        !errors.value.reason
    ) {
        submittedCards.value.push({ ...formData.value });
        clearForm();
    }
  };
  
  const clearForm = () => {
    formData.value = { 
        username: '', 
        password: '', 
        isAustralian: false, 
        reason: '', 
        gender: '' 
    };
  };

  const errors = ref({
    username: null,
    password: null,
    resident: null,
    gender: null,
    reason: null,
  });

  const validateName = (blur) => {
    if (formData.value.username.length < 3){
        if (blur) errors.value.username = "Name must be at least 3 characters.";
    } else {
        errors.value.username = null;
    }
  };

  const validatePassword = (blur) => {
    const password = formData.value.password;
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength){
        if(blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
    } else if (!hasUppercase) {
        if(blur) errors.value.password = "Password must contain at least one uppercase letter."; 
    } else if (!hasLowercase) {
        if(blur) errors.value.password = "Password must contain at least one lowercase letter.";
    } else if (!hasNumber) {
        if(blur) errors.value.password = "Password must contain at least one number.";
    } else if (!hasSpecialChar) {
        if(blur) errors.value.password = "Password must contain at least one special character.";
    } else {
        errors.value.password = null;
    }
  };

  const validateGender = (blur) => {
    if (!formData.value.gender) {
        if (blur) errors.value.gender = 'Gender must be selected.';
    } else {
        errors.value.gender = null;
    }
  };

  const validateReason = (blur) => {
    const minLen = 5;
    const len = formData.value.reason.trim().length;
    if (len < minLen) {
        if (blur) errors.value.reason = `Reason must be at least ${minLen} characters.`;
    } else {
        errors.value.reason = null;
    }
  }; 
  </script>
  
  <style scoped>
  .card {
   border: 1px solid #ccc;
   border-radius: 10px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   }
   .card-header {
   background-color: #275FDA;
   color: white;
   padding: 10px;
   border-radius: 10px 10px 0 0;
   }
   .list-group-item {
   padding: 10px;
   }
  </style>
