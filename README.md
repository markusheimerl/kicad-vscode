# KiCad for VSCode

This extension enhances the KiCad development experience within Visual Studio Code by providing visualization capabilities for KiCad files.

## Install dependencies

```
sudo add-apt-repository ppa:kicad/kicad-8.0-releases
sudo apt update
sudo apt install kicad
sudo apt install kicad kicad-demos kicad-libraries kicad-symbols kicad-templates kicad-footprints kicad-packages3d
pip install skidl
export KICAD_SYMBOL_DIR="/usr/share/kicad/library"
```

## My vision for KiCad for VSCode

- You should be able to code schematics and PCBs
- Ýou should be able to view the schematic/PCB on the right side