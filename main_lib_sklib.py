from collections import defaultdict
from skidl import Pin, Part, Alias, SchLib, SKIDL, TEMPLATE

SKIDL_lib_version = '0.0.1'

main_lib = SchLib(tool=SKIDL).add_parts(*[
        Part(**{ 'name':'R', 'dest':TEMPLATE, 'tool':SKIDL, 'aliases':Alias({'R'}), 'ref_prefix':'R', 'fplist':['R_*'], 'footprint':'Resistor_SMD:R_0805', 'keywords':'R res resistor', 'description':'Resistor', 'datasheet':'~', 'pins':[
            Pin(num='1',name='~',func=Pin.types.PASSIVE,unit=1),
            Pin(num='2',name='~',func=Pin.types.PASSIVE,unit=1)] }),
        Part(**{ 'name':'C', 'dest':TEMPLATE, 'tool':SKIDL, 'aliases':Alias({'C'}), 'ref_prefix':'C', 'fplist':['C_*'], 'footprint':'Capacitor_SMD:C_0805', 'keywords':'cap capacitor', 'description':'Unpolarized capacitor', 'datasheet':'~', 'pins':[
            Pin(num='1',name='~',func=Pin.types.PASSIVE,unit=1),
            Pin(num='2',name='~',func=Pin.types.PASSIVE,unit=1)] }),
        Part(**{ 'name':'LED', 'dest':TEMPLATE, 'tool':SKIDL, 'aliases':Alias({'LED'}), 'ref_prefix':'D', 'fplist':['LED*', 'LED_SMD:*', 'LED_THT:*'], 'footprint':'LED_SMD:LED_0805', 'keywords':'LED diode', 'description':'Light emitting diode', 'datasheet':'~', 'pins':[
            Pin(num='1',name='K',func=Pin.types.PASSIVE,unit=1),
            Pin(num='2',name='A',func=Pin.types.PASSIVE,unit=1)] })])