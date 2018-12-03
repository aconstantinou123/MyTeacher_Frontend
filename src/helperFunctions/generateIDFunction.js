import randomstring from 'randomstring'

export const generateId = () => {
  const randomString = randomstring.generate(16)
  const individualChars = randomString.split('')
  let counter = 0
  const resultArray = []
  individualChars.forEach((char) => {
    counter += 1
    resultArray.push(char)
    if (counter % 4 === 0) {
      resultArray.push('-')
    }
  })
  resultArray.pop()
  const id = resultArray.join('')
  return id
}
