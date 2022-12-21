// encryption is a two way process -- data is 'encrypted' using an algorithm and key
// you must know what the key is to decrypt or unscramble the data

// use crypto-js for encryption
const mySecret = 'I eat cookies for breakfast'

const secretKey = 'myPassword'

// Advanced Encryption Standard algo
const crypto = require('crypto-js')

const myEncryption = crypto.AES.encrypt(mySecret, secretKey)
console.log(myEncryption.toString()) // lets see our encrypted data

const decrypt = crypto.AES.decrypt(myEncryption.toString(), secretKey)
console.log(decrypt.toString(crypto.enc.Utf8))

// passwords in the database will be hashed
// hashing is a one way process, once data has been hashed you cannot unhash it
// hashing functions always return a hash of equal length regardless of input
// hashing functions always return the same output given the same input
const bcrypt = require('bcrypt')

const userPassword = '12345password'
// when the user signs up, we want to hash their password and save it in the database
const hashedPassword = bcrypt.hashSync(userPassword, 12)
console.log(hashedPassword)

// COMPARE a string to our hash (user login)
console.log(bcrypt.compareSync(userPassword, hashedPassword))

const cryptoNode = require('crypto')

const hash = cryptoNode.createHash('sha256').update('a', 'utf8').digest()
console.log(hash.toString('hex'))