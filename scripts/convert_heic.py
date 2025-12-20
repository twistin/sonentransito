#!/usr/bin/env python3
"""
Conversor de HEIC a JPEG para Son en Transito para macOS.
Convierte todas las imágenes HEIC de una carpeta a JPEG.

Uso:
  python convert_heic.py                    # Convierte en carpeta actual
  python convert_heic.py ruta/a/carpeta    # Convierte en carpeta específica
  python convert_heic.py imagen.heic       # Convierte un archivo específico
"""

import os
import sys
import subprocess
from pathlib import Path

# Calidad JPEG (1-100, mayor = mejor calidad, más tamaño)
JPEG_QUALITY = 85

def convert_heic_to_jpeg(heic_path: Path) -> bool:
    """Convierte un archivo HEIC a JPEG usando sips (macOS nativo)."""
    jpeg_path = heic_path.with_suffix('.jpg')
    
    try:
        # Usar sips (incluido en macOS)
        result = subprocess.run(
            ['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', str(JPEG_QUALITY), 
             str(heic_path), '--out', str(jpeg_path)],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            print(f"✅ {heic_path.name} → {jpeg_path.name}")
            return True
        else:
            print(f"❌ Error con {heic_path.name}: {result.stderr}")
            return False
            
    except FileNotFoundError:
        print("❌ Error: 'sips' no encontrado. Este script solo funciona en macOS.")
        return False

def convert_folder(folder_path: Path):
    """Convierte todas las imágenes HEIC de una carpeta."""
    heic_files = list(folder_path.glob('*.heic')) + list(folder_path.glob('*.HEIC'))
    
    if not heic_files:
        print(f"📁 No se encontraron archivos HEIC en: {folder_path}")
        return
    
    print(f"📁 Encontrados {len(heic_files)} archivos HEIC en: {folder_path}\n")
    
    converted = 0
    for heic_file in heic_files:
        if convert_heic_to_jpeg(heic_file):
            converted += 1
    
    print(f"\n✨ Conversión completada: {converted}/{len(heic_files)} archivos")

def main():
    # Determinar la ruta a procesar
    if len(sys.argv) > 1:
        target = Path(sys.argv[1])
    else:
        target = Path.cwd()
    
    # Si es un archivo, convertir solo ese
    if target.is_file():
        if target.suffix.lower() == '.heic':
            convert_heic_to_jpeg(target)
        else:
            print(f"❌ El archivo no es HEIC: {target}")
    # Si es una carpeta, convertir todos los HEIC
    elif target.is_dir():
        convert_folder(target)
    else:
        print(f"❌ Ruta no encontrada: {target}")

if __name__ == '__main__':
    main()
