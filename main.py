from skidl import Part, Net, generate_netlist, generate_schematic

# Create parts and assign footprints
resistor = Part("Device", "R", value="1k", footprint="Resistor_SMD:R_0805")
capacitor = Part("Device", "C", value="10uF", footprint="Capacitor_SMD:C_0805")
led = Part("Device", "LED", value="Red", footprint="LED_SMD:LED_0805")

# Create power and ground nets
gnd = Net("GND")
vcc = Net("VCC")

# Connect components in series
vcc += resistor[1]  # Connect VCC to one side of the resistor
resistor[2] += capacitor[1]  # Connect the other side of the resistor to one side of the capacitor
capacitor[2] += led[1]  # Connect the other side of the capacitor to one side of the LED
led[2] += gnd  # Connect the other side of the LED to GND

# Generate the netlist
generate_netlist()
generate_schematic()