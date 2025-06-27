import { ethers } from "ethers";

const FIELD_MODULUS = BigInt("21888242871839275222246405745257275088548364400416034343698204186575808495617");

function testWord(word) {
    // Hash simple con módulo (esto sí podemos hacerlo)
    const hash1 = ethers.keccak256(ethers.toUtf8Bytes(word));
    const hash1Mod = BigInt(hash1) % FIELD_MODULUS;
    const hash1ModHex = "0x" + hash1Mod.toString(16).padStart(64, '0');
    
    // Hash doble SIN módulo (esto es lo que necesitamos que sea válido)
    const hash2 = ethers.keccak256(hash1ModHex);
    const hash2BigInt = BigInt(hash2);
    
    const isValid = hash2BigInt < FIELD_MODULUS;
    
    console.log(`Word: "${word}"`);
    console.log(`Hash1 (mod): ${hash1ModHex}`);
    console.log(`Hash2 (natural): ${hash2}`);
    console.log(`Valid: ${isValid}`);
    console.log('---');
    
    return isValid;
}

// Probar muchas palabras
const words = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "cat", "dog", "sun", "moon", "star", "tree", "book",
    "red", "blue", "green", "yes", "no", "one", "two",
    "hello", "world", "test", "word", "name", "code"
];

console.log("Buscando palabras válidas...\n");

const validWords = words.filter(testWord);

console.log("\nPalabras válidas encontradas:");
validWords.forEach(word => console.log(`"${word}"`));

console.log("Holaaaaa");