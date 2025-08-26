<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-10 offset-md-1">
        <!-- Header -->
        <h1 class="text-center">🗄️ W5. Library Registration Form</h1>
        <p class="text-center text-muted mb-4">
          Let's build some more advanced features into our form.
        </p>

        <form @submit.prevent="submitForm" novalidate>
          <!-- Row 1: Username | Gender -->
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="username" class="form-label">Username</label>
              <input
                id="username"
                type="text"
                class="form-control"
                v-model.trim="formData.username"
                @blur="validateUsername"
                :class="{'is-invalid': !!errors.username}"
              />
              <div v-if="errors.username" class="invalid-feedback">{{ errors.username }}</div>
            </div>

            <div class="col-md-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                id="gender"
                class="form-select"
                v-model="formData.gender"
                @blur="validateGender"
                :class="{'is-invalid': !!errors.gender}"
              >
                <option disabled value="">--Select --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="invalid-feedback">{{ errors.gender }}</div>
            </div>
          </div>

          <!-- Row 2: Password | Confirm password -->
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="password" class="form-label">Password</label>
              <input
                id="password"
                type="password"
                class="form-control"
                v-model="formData.password"
                @input="validatePassword"
                @blur="validatePassword"
                :class="{'is-invalid': !!errors.password}"
                autocomplete="new-password"
              />
              <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
            </div>

            <div class="col-md-6">
              <label for="confirmPassword" class="form-label">Confirm password</label>
              <input
                id="confirmPassword"
                type="password"
                class="form-control"
                v-model="formData.confirmPassword"
                @input="validateConfirmPassword"
                @blur="validateConfirmPassword"
                :class="{'is-invalid': !!errors.confirmPassword}"
                autocomplete="new-password"
              />
              <div v-if="errors.confirmPassword" class="invalid-feedback">
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>

          <!-- Row 3: Australian Resident -->
          <div class="row mb-3">
            <div class="col-md-6">
              <div class="form-check">
                <input
                  id="isAustralian"
                  type="checkbox"
                  class="form-check-input"
                  v-model="formData.isAustralian"
                  @change="validateResident"
                />
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
              </div>
              <div v-if="errors.resident" class="text-danger small mt-1">{{ errors.resident }}</div>
            </div>
          </div>

          <!-- Reason -->
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              id="reason"
              class="form-control"
              rows="3"
              v-model.trim="formData.reason"
              @input="validateReason"
              :class="{'is-invalid': !!errors.reason}"
              placeholder="Tell us briefly why you’re joining"
            ></textarea>
            <div v-if="errors.reason" class="invalid-feedback">{{ errors.reason }}</div>

            <div class="mb-3">
            <label for="suburb" class="form-label">Suburb</label>
            <input
              type="text"
              class="form-control"
              id="suburb"
              v-model.trim="formData.suburb"
              autocomplete="off"
            />
          </div>


            <!-- ✅ required include 'friend' display a green message -->
            <div v-if="friendMessage" class="text-success small mt-1">
              {{ friendMessage }}
            </div>
          </div>

          <!-- Buttons -->
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>

        <div class="row mt-5" v-if="submittedCards.length">
          <div class="d-flex flex-wrap justify-content-start">
            <div v-for="card in submittedCards" :key="card.id" class="card m-2" style="width: 20rem;">
              <div class="card-header d-flex justify-content-between align-items-center">
                <span>User Information</span>
                <button class="btn btn-sm btn-outline-danger" @click="removeCard(card.id)">Delete</button>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Username: {{ card.username }}</li>
                <li class="list-group-item">Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}</li>
                <li class="list-group-item">Gender: {{ card.gender }}</li>
                <li class="list-group-item">Reason: {{ card.reason || '-' }}</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

/* form model */
const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: '',
  suburb: 'Clayton'
})

/* errors */
const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  resident: null,
  gender: null,
  reason: null
})

/* 'friend' success message */
const friendMessage = ref('')

/* submitted list (demo) */
const submittedCards = ref([])

/* ---- validators ---- */
const validateUsername = () => {
  const v = formData.value.username
  errors.value.username =
    !v ? 'Username is required'
    : v.length < 2 ? 'At least 2 characters'
    : null
}

const validatePassword = () => {
  const v = formData.value.password
  errors.value.password =
    !v ? 'Password is required'
    : v.length < 6 ? 'At least 6 characters'
    : null
  validateConfirmPassword()
}

const validateConfirmPassword = () => {
  const p = formData.value.password
  const c = formData.value.confirmPassword
  errors.value.confirmPassword =
    !c ? 'Please confirm your password'
    : c !== p ? 'Passwords do not match'
    : null
}

const validateGender = () => {
  errors.value.gender = formData.value.gender ? null : 'Please select a gender'
}

const validateResident = () => {
  errors.value.resident = null
}

/* ✅ Activity 5.3.2: include 'friend' display green message */
const validateReason = () => {
  const v = formData.value.reason || ''
  errors.value.reason = v.length > 300 ? 'Max 300 characters' : null
  friendMessage.value = v.toLowerCase().includes('friend') ? 'Great to have a friend' : ''
}

const validateAll = () => {
  validateUsername()
  validatePassword()
  validateConfirmPassword()
  validateGender()
  validateResident()
  validateReason()
  return Object.values(errors.value).every(e => e === null)
}

/* ---- submit / clear ---- */
const submitForm = () => {
  if (!validateAll()) return
  submittedCards.value.unshift({
    id: crypto.randomUUID?.() || String(Date.now()) + Math.random().toString(16).slice(2),
    username: formData.value.username,
    isAustralian: formData.value.isAustralian,
    reason: formData.value.reason,
    gender: formData.value.gender
  })
  clearForm()
}

const clearForm = () => {
  Object.assign(formData.value, {
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: ''
  })
  Object.keys(errors.value).forEach(k => (errors.value[k] = null))
  friendMessage.value = ''
}

const removeCard = (id) => {
  submittedCards.value = submittedCards.value.filter(c => c.id !== id)
}
</script>

<style scoped>
</style>