EESchema Schematic File Version 4
EELAYER 30 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 1 1
Title "SKiDL-Generated Schematic"
Date "2024-9-21"
Rev "v0.1"
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr

$Comp
L Device:R R1
U 1 1 66ef42b9
P 5400 4000
F 0 "R1" V 5480 4000 50 000 C CNN
F 1 "1k" V 5400 4000 50 000 C CNN
F 2 "Resistor_SMD:R_0805" V 5400 4000 50 001 C CNN
   1   5400 4000
   1  0  0  -1
$EndComp

$Comp
L Device:C C1
U 1 1 66ef42b9
P 5400 4500
F 0 "C1" H 5425 4600 50 000 L CNN
F 1 "10uF" H 5425 4400 50 000 L CNN
F 2 "Capacitor_SMD:C_0805" H 5425 4400 50 001 L CNN
   1   5400 4500
   1  0  0  -1
$EndComp

$Comp
L Device:LED D1
U 1 1 66ef42b9
P 5650 4900
F 0 "D1" H 5650 5000 50 000 C CNN
F 1 "Red" H 5650 4800 50 000 C CNN
F 2 "LED_SMD:LED_0805" H 5650 4800 50 001 C CNN
   1   5650 4900
   1  0  0  -1
$EndComp

Text HLabel 6100 4900 2    50   UnSpc ~ 0
GND

Text HLabel 5400 3550 1    50   UnSpc ~ 0
VCC

Wire Wire Line
  5400 3850 5400 3550

Wire Wire Line
  5400 4900 5500 4900
Wire Wire Line
  5400 4900 5400 4650

Wire Wire Line
  5800 4900 6100 4900

Wire Wire Line
  5400 4350 5400 4150











Text HLabel 6100 4900 2    50   UnSpc ~ 0
GND

Text HLabel 5400 3550 1    50   UnSpc ~ 0
VCC

$EndSCHEMATC