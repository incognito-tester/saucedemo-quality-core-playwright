export const env = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  credentials: {
    standardUser: process.env.STANDARD_USER || '',
    lockedOutUser: process.env.LOCKED_OUT_USER || '',
    problemUser: process.env.PROBLEM_USER || '',
    performanceUser: process.env.PERFORMANCE_USER || '',
    errorUser: process.env.ERROR_USER || '',
    validPassword: process.env.VALID_PASSWORD || '',
    invalidPassword: process.env.INVALID_PASSWORD || '',
  },
};

console.log('--- ENV CHECK: Standard User is:', env.credentials.standardUser);