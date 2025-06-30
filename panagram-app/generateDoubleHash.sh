#!/bin/bash
# calculate_double_hash.sh

WORD="triangles"
FIELD_MODULUS="21888242871839275222246405745257275088548364400416034343698204186575808495617"

echo "=== Calculando Double Hash con Módulo ==="
echo "Palabra: $WORD"
echo ""

# Paso 1: keccak256("triangles")
echo "Paso 1: keccak256(\"$WORD\")"
hash1_hex=$(cast keccak "$WORD")
hash1_dec=$(cast --to-dec $hash1_hex)
echo "Hash1 (hex): $hash1_hex"
echo "Hash1 (dec): $hash1_dec"
echo ""

# Paso 2: Aplicar módulo al primer hash (limpiar output de bc)
echo "Paso 2: Aplicando módulo al primer hash"
correct_answer_dec=$(echo "scale=0; $hash1_dec % $FIELD_MODULUS" | bc | tr -d '\\\n')
echo "Correct answer (dec): $correct_answer_dec"

# Usar Python para convertir a hex (más confiable para números grandes)
correct_answer_hex=$(python3 -c "print('0x{:064x}'.format($correct_answer_dec))")
echo "Correct answer (hex): $correct_answer_hex"
echo ""

# Paso 3: keccak256(correctAnswer) 
echo "Paso 3: keccak256(correctAnswer)"
double_hash_hex=$(cast keccak "$correct_answer_hex")
double_hash_dec=$(cast --to-dec $double_hash_hex)

echo "Double hash (antes módulo): $double_hash_hex"
echo "Double hash decimal: $double_hash_dec"
echo ""

# Paso 4: Aplicar módulo al double hash (limpiar output de bc)
echo "Paso 4: Aplicando módulo al double hash"
final_answer_double_hash_dec=$(echo "scale=0; $double_hash_dec % $FIELD_MODULUS" | bc | tr -d '\\\n')
echo "Final answer double hash (dec): $final_answer_double_hash_dec"

# Usar Python para convertir a hex
final_answer_double_hash=$(python3 -c "print('0x{:064x}'.format($final_answer_double_hash_dec))")

echo ""
echo "=== RESULTADO FINAL ==="
echo "WORD: $WORD"
echo "correct_answer: $correct_answer_hex"
echo "answer_double_hash: $final_answer_double_hash"
echo ""

# Verificar que ambos están dentro del campo
echo "=== VERIFICACIÓN ==="
if (( correct_answer_dec < FIELD_MODULUS )); then
    echo "✅ correct_answer < FIELD_MODULUS"
else
    echo "❌ correct_answer >= FIELD_MODULUS"
fi

if (( final_answer_double_hash_dec < FIELD_MODULUS )); then
    echo "✅ answer_double_hash < FIELD_MODULUS"
else
    echo "❌ answer_double_hash >= FIELD_MODULUS"
fi