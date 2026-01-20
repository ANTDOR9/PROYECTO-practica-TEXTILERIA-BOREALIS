#!/bin/bash

# ========================================
# Script para Subir Shop-Senati a GitHub
# Usuario: JGSaMueLrm
# Repositorio: Shop-Repositorio
# ========================================

echo "🚀 Iniciando configuración de Git y subida a GitHub..."
echo ""

# Paso 1: Configurar Git (solo se hace una vez)
echo "📝 Configurando Git..."
git config --global user.name "JGSaMueLrm"
git config --global user.email "1559447@.pe"
echo "✅ Git configurado correctamente"
echo ""

# Paso 2: Inicializar repositorio
echo "📦 Inicializando repositorio Git..."
git init
echo "✅ Repositorio inicializado"
echo ""

# Paso 3: Agregar todos los archivos
echo "📂 Agregando archivos al staging..."
git add .
echo "✅ Archivos agregados"
echo ""

# Paso 4: Hacer el primer commit
echo "💾 Creando commit inicial..."
git commit -m "Initial commit: Artesanías Senati E-commerce Premium"
echo "✅ Commit creado"
echo ""

# Paso 5: Conectar con GitHub
echo "🔗 Conectando con GitHub..."
git remote add origin https://github.com/JGSaMueLrm/Shop-Repositorio.git
echo "✅ Repositorio remoto agregado"
echo ""

# Paso 6: Cambiar a rama main
echo "🌿 Cambiando a rama main..."
git branch -M main
echo "✅ Rama main configurada"
echo ""

# Paso 7: Subir el código
echo "⬆️  Subiendo código a GitHub..."
echo ""
echo "⚠️  IMPORTANTE: Cuando te pida credenciales:"
echo "   - Usuario: JGSaMueLrm"
echo "   - Contraseña: Usa tu Personal Access Token (NO tu contraseña de GitHub)"
echo ""
echo "Si no tienes un token, créalo aquí: https://github.com/settings/tokens"
echo "Marca el checkbox 'repo' y copia el token generado"
echo ""

git push -u origin main

echo ""
echo "🎉 ¡Proceso completado!"
echo "Tu proyecto está en: https://github.com/JGSaMueLrm/Shop-Repositorio"
