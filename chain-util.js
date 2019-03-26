const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256')
const ec = new EC('secp256k1')
const uuidV1 = require('uuid/v1')

class ChainUtil {
    static genKeyPair(){
        return ec.genKeyPair()
    }

    static id(){
        return uuidV1()
    }

    static hash(data){
        return SHA256(JSON.stringify(data)).toString()
    }

    static verifySignature(publicKey, signature, dataHash){
        return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature)
    }

    static isDict(data){
        return (typeof data==='object' && data!==null && !(data instanceof Array))
    }

    static queryParser(queryString) {
        // Need to remove quotes that come in 
        var queryString = queryString.replace(/^"(.*)"$/, '$1')
        var queryList = queryString.split("/").filter(endpoint => {
            if(endpoint) {
              return endpoint
            } 
        })
        return queryList
      }    
}

module.exports = ChainUtil