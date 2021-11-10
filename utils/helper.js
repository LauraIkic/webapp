export const helpers = {

  /**
   * Capitalizes the first characters of a string
   * @param {string} str
   * @returns {string}
   */
  capitalize:
    (str) => {
      if (typeof str !== 'string') {
        return ''
      }
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
  validateEmail:
    (email) => {
      if (!email) {
        return false
      }
      const regex = /^(([^<>()[\],;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
      return regex.test(String(email).toLowerCase())
    }
}
