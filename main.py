import schemdraw
from schemdraw import elements as elm

# Create a drawing
d = schemdraw.Drawing()

# Add circuit elements
d += (V1 := elm.SourceV().label('Vin').up())
d += (R1 := elm.Resistor().right().label('R1'))
d += (dot1 := elm.Dot())
d += elm.Resistor().down().label('R2')
d += elm.Line().left()
d += elm.Ground()
d += elm.Line().up()

# Save as PNG
d.save('voltage_divider.png')