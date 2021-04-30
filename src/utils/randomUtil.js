export const randomString = (length) => {
  let ran = ''
  for (let i = 0; i < length; i++) {
    ran += String.fromCharCode(96 + Math.ceil(Math.random() * 26))
  }
  return ran
}
