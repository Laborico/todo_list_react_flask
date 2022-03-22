/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

let userData
let taskData
let accesstoken

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    setUserData: (data) => {
      return (userData = data)
    },
    getUserData: () => {
      return userData
    },

    settaskData: (data) => {
      return (taskData = data)
    },
    gettaskData: () => {
      return taskData
    },

    setToken: (token) => {
      return (accesstoken = token)
    },
    getToken: () => {
      return accesstoken
    }

  })
}
