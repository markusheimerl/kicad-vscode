from skidl import *

# Create net stubs.
e, b, c = Net("ENET"), Net("BNET"), Net("CNET")
e.stub, b.stub, c.stub = True, True, True

# Create transistor part template.
qt = Part(lib="Device.lib", name="Q_PNP_CBE", dest=TEMPLATE)

# Instantiate transistor with various orientations.
for q, tx in zip(qt(8), ['', 'H', 'V', 'R', 'L', 'VL', 'HR', 'LV']):
    q['E B C'] += e, b, c  # Attach stubs to transistor pins.
    q.symtx = tx  # Assign orientation to transistor attributes.
    q.ref = 'Q_' + tx  # Place orientation in transistor reference.

generate_svg()