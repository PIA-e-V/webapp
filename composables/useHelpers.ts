export default function () {
  return {
    randomString: (
      length: number,
      alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    ) => {
      let result = ''
      const charactersLength = alphabet.length
      for (let i = 0; i < length; i++) {
        result += alphabet.charAt(Math.floor(Math.random() *
          charactersLength))
      }
      return result
    }
  }
}
