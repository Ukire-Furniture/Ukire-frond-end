// src/utils/api.js

// SESUAIKAN INI DENGAN URL BACKEND LARAVEL KAMU!
const API_BASE_URL = 'http://ukirebackend.test/api';
const CSRF_COOKIE_URL = 'http://ukirebackend.test/sanctum/csrf-cookie';

async function getCsrfCookie() {
  try {
    const response = await fetch(CSRF_COOKIE_URL, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      console.error('Failed to get CSRF cookie:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching CSRF cookie:', error);
  }
}

async function callApi(endpoint, method = 'GET', data = null, token = null, isFormData = false) {
  // Hanya panggil getCsrfCookie() jika metode adalah POST, PUT, PATCH, DELETE
  const methodUpper = method.toUpperCase();
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(methodUpper)) {
    await getCsrfCookie(); 
  }

  const headers = {
    'Accept': 'application/json',
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
    credentials: 'include',
  };

  // PENTING: Hanya tambahkan body jika metode adalah POST, PUT, atau PATCH
  if (data && ['POST', 'PUT', 'PATCH'].includes(methodUpper)) { // <--- BARIS INI YANG DIKOREKSI
    if (isFormData) {
      options.body = data;
      // Untuk FormData, Content-Type di header tidak boleh diset manual, browser yang akan atur
      delete headers['Content-Type']; 
    } else {
      options.body = JSON.stringify(data);
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
    const jsonResponse = await response.json();

    if (!response.ok) {
      throw new Error(jsonResponse.message || 'Terjadi kesalahan pada server. Status: ' + response.status);
    }

    return jsonResponse;
  } catch (error) {
    console.error(`Error calling API ${endpoint}:`, error);
    throw error;
  }
}

export { callApi, API_BASE_URL, CSRF_COOKIE_URL };
