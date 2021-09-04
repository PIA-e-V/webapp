export default function () {
  return {
    validate (validationRules: Array<() => true|string>) {
      for (const rule of validationRules) {
        const msg = rule()
        if (msg !== true) {
          return {
            isValid: false,
            message: msg
          }
        }
      }

      return {
        isValid: true
      }
    },
    min: (value: string, length: number, msg = 'Der Wert ist zu kurz') => value.length >= length || msg,
    max: (value: string, length: number, msg = 'Der Wert ist zu lang') => value.length <= length || msg,
    email (email: string, msg = 'Keine gültige E-Mail Adresse') {
      const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i

      return re.test(email) || msg
    },
    mustMatch (str1: string, str2: string, msg = 'Eingaben stimmen nicht überein') {
      return str1 === str2 || msg
    }
  }
}
