

import { ANSWER_DOUBLE_HASH } from "../constants";


export async function generateProof(
    guess: string,
    address: string,
    showLog: (content: string) => void
): Promise<{ proof: Uint8Array, publicInputs: string[] }> {
    try {
        showLog("Generating witness... ⏳");

        // Llamar a la API route
        const response = await fetch('/api/generate-proof', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                guessHash: guess,
                address: address,
                answerDoubleHash: ANSWER_DOUBLE_HASH
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to generate proof: ${errorData.error}`);
        }

        const data = await response.json();
        showLog("Generated witness... ✅");
        showLog("Generated proof... ✅");
        showLog("Verifying proof... ⏳");
        showLog(`Proof is valid: ${data.isValid} ✅`);

        // Convertir el array de vuelta a Uint8Array
        //const proof = new Uint8Array(data.proof);

        // Convertir proof de hex string a Uint8Array
        const proofHex = data.proof.startsWith('0x') ? data.proof.slice(2) : data.proof;
        const proof = new Uint8Array(proofHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

        // Los publicInputs ya vienen como array de strings hex
        const publicInputs = data.publicInputs;

        showLog(`Proof size: ${proof.length} bytes`);
        showLog(`Public inputs: ${publicInputs.length} items`);
        showLog("Proof generation complete! ✅");

        return {
            proof: proof,
            publicInputs: data.publicInputs
        };

    } catch (error) {
        console.error('Error in generateProof:', error);
        throw error;
    }
}