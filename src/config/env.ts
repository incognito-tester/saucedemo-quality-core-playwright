export const env = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  credentials: {
    standardUser: process.env.STANDARD_USER || 'standard_user',
    lockedOutUser: process.env.LOCKED_OUT_USER || 'locked_out_user',
    problemUser: process.env.PROBLEM_USER || 'problem_user',
    performanceUser: process.env.PERFORMANCE_USER || 'performance_glitch_user',
    errorUser: process.env.ERROR_USER || 'error_user',
    validPassword: process.env.VALID_PASSWORD || 'secret_sauce',
    invalidPassword: process.env.INVALID_PASSWORD || 'wrong_password',
  },
};