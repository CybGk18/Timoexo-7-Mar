/// <reference types="vite/client" />

// API base URL configuration
// For development: uses the VITE_API_URL from .env.local
// For production: defaults to /server (relative path)

export const API_BASE_URL = import.meta.env.VITE_API_URL || '/server';