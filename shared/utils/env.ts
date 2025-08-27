// Environment variable utilities
// Can be used by both apps to access env vars consistently

export const getEnvVar = (key: string, defaultValue?: string): string => {
	const value = import.meta.env[key];
	if (value === undefined && defaultValue === undefined) {
		console.warn(`Environment variable ${key} is not defined`);
	}
	return value || defaultValue || '';
};

export const getEnvBool = (key: string, defaultValue = false): boolean => {
	const value = import.meta.env[key];
	if (value === undefined) return defaultValue;
	return value.toLowerCase() === 'true';
};

export const getEnvNumber = (key: string, defaultValue = 0): number => {
	const value = import.meta.env[key];
	if (value === undefined) return defaultValue;
	const parsed = parseInt(value, 10);
	return isNaN(parsed) ? defaultValue : parsed;
};

// Common environment variables
export const ENV = {
	// Shared
	FIREBASE_API_KEY: getEnvVar('VITE_FIREBASE_API_KEY'),
	FIREBASE_AUTH_DOMAIN: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN'),
	FIREBASE_PROJECT_ID: getEnvVar('VITE_FIREBASE_PROJECT_ID'),
	FIREBASE_STORAGE_BUCKET: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET'),
	FIREBASE_MESSAGING_SENDER_ID: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID'),
	FIREBASE_APP_ID: getEnvVar('VITE_FIREBASE_APP_ID'),
	
	API_BASE_URL: getEnvVar('VITE_API_BASE_URL', 'http://localhost:3000/api'),
	ENVIRONMENT: getEnvVar('VITE_ENVIRONMENT', 'development'),
	GAME_DATA_URL: getEnvVar('VITE_GAME_DATA_URL', '/game_data'),
	
	// App specific
	APP_NAME: getEnvVar('VITE_APP_NAME'),
	DEBUG_ENABLED: getEnvBool('VITE_DEBUG_ENABLED'),
};