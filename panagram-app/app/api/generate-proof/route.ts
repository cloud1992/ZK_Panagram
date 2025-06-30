// app/api/generate-proof/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { ethers } from 'ethers';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
    try {
        const { guessHash, address, answerDoubleHash } = await request.json();

        const scriptPath = path.join(process.cwd(), '../contracts/js-scripts/generateProof.mjs');
        const command = `node ${scriptPath} ${guessHash} ${address} ${answerDoubleHash}`;

        console.log('Executing command:', command);

        const { stdout, stderr } = await execAsync(command, {
            cwd: path.join(process.cwd(), '../'),
            timeout: 45000
        });

        if (stderr) {
            console.warn('Script stderr:', stderr);
        }

        const result = stdout.trim();

        if (!result || result.startsWith('Error:')) {
            throw new Error(`Script failed: ${result || stderr}`);
        }

        // El resultado es un hex string ABI-encoded: (bytes, bytes32[])
        // Parsear usando ethers.js como en Solidity
        const decodedData = ethers.AbiCoder.defaultAbiCoder().decode(
            ['bytes', 'bytes32[]'],
            result
        );

        const proof = decodedData[0]; // bytes
        const publicInputs = decodedData[1]; // bytes32[]

        console.log('Proof length:', proof.length);
        console.log('Public inputs count:', publicInputs.length);
        console.log('Public inputs:', publicInputs);

        return NextResponse.json({
            proof: proof, // ethers devuelve esto como hex string
            publicInputs: publicInputs, // array de strings hex
            success: true
        });

    } catch (error) {
        console.error('Error generating proof:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return NextResponse.json(
            { error: 'Failed to generate proof', details: errorMessage },
            { status: 500 }
        );
    }
}