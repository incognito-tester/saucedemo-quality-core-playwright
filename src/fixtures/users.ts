// src/fixtures/users.ts
import { env } from '../config/env';

const users = {
  standardUser: {
    username: env.credentials.standardUser,
    password: env.credentials.validPassword,
  },
  lockedOutUser: {
    username: env.credentials.lockedOutUser,
    password: env.credentials.validPassword,
  },
  problemUser: {
    username: env.credentials.problemUser,
    password: env.credentials.validPassword,
  },
  performanceUser: {
    username: env.credentials.performanceUser,
    password: env.credentials.validPassword,
  },
  errorUser: {
    username: env.credentials.errorUser,
    password: env.credentials.validPassword,
  },
  invalidCases: [
    {
      label: 'wrong password',
      username: env.credentials.standardUser,
      password: env.credentials.invalidPassword,
      expectedError: 'Epic sadface: Username and password do not match any user in this service'
    },
    {
      label: 'empty credentials',
      username: '',
      password: '',
      expectedError: 'Epic sadface: Username is required'
    }
  ]
};

export default users;