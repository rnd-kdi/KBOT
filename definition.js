var roboticsRobotBlockColor = "#ff4ccd";
var roboticsMotorBlockColor = "#0090f5";
var roboticsSensorBlockColor = "#9b6af6";
var roboticsLineBlockColor = "#34ccf1";

const ImgUrl2 = "https://ohstem-public.s3.ap-southeast-1.amazonaws.com/extensions/AITT-VN/yolobit_extension_rover/images/";

var robotics_stop_then = [
  [
    Blockly.Msg.ROBOTICS_STOP,
    "STOP"
  ],
  [
    Blockly.Msg.ROBOTICS_BRAKE,
    "BRAKE"
  ],
  [
    Blockly.Msg.ROBOTICS_NONE,
    "None"
  ]
];

var motor_stop_then = [
  [
    Blockly.Msg.ROBOTICS_STOP,
    "stop()"
  ],
  [
    Blockly.Msg.ROBOTICS_MOTOR_BRAKE,
    "brake()"
  ]
];

var robotics_motors = [
  [
    "motor1",
    "motor1"
  ],
  [
    "motor2",
    "motor2"
  ],
  [
    "motor3",
    "motor3"
  ],
  [
    "motor4",
    "motor4"
  ],
  [
    "motor5",
    "motor5"
  ],
  [
    "motor6",
    "motor6"
  ],
  [
    "motor7",
    "motor7"
  ],
  [
    "motor8",
    "motor8"
  ],
  [
    "motor9",
    "motor9"
  ],
  [
    "motor10",
    "motor10"
  ],
]

var robotics_motors_with_none = [
  [
    "______",
    "None"
  ],
  [
    "motor1",
    "motor1"
  ],
  [
    "motor2",
    "motor2"
  ],
  [
    "motor3",
    "motor3"
  ],
  [
    "motor4",
    "motor4"
  ],
  [
    "motor5",
    "motor5"
  ],
  [
    "motor6",
    "motor6"
  ],
  [
    "motor7",
    "motor7"
  ],
  [
    "motor8",
    "motor8"
  ],
  [
    "motor9",
    "motor9"
  ],
  [
    "motor10",
    "motor10"
  ],
  [
    "",
    "None"
  ],

]

var robotics_servos = [
  [
    "servo1",
    "servo1"
  ],
  [
    "servo2",
    "servo2"
  ],
  [
    "servo3",
    "servo3"
  ],
  [
    "servo4",
    "servo4"
  ],
  [
    "servo5",
    "servo5"
  ],
  [
    "servo6",
    "servo6"
  ],
  [
    "servo7",
    "servo7"
  ],
  [
    "servo8",
    "servo8"
  ]
]

Blockly.Blocks['robotics_motor2p_init'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_motor_init",
        "message0": Blockly.Msg.ROBOTICS_MOTOR_INIT,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "motor",
            "options": robotics_motors,
          },
          {
            "type": "field_dropdown",
            "name": "in1",
            "options": digitalPins,
          },
          {
            "type": "field_dropdown",
            "name": "in2",
            "options": digitalPins,
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_motor2p_init"] = function (block) {
  var motor = block.getFieldValue("motor");
  var in1 = block.getFieldValue("in1");
  var in2 = block.getFieldValue("in2");
  // TODO: Assemble Python into code variable.
  Blockly.Python.definitions_['import_motor'] = 'from motor import *';
  Blockly.Python.definitions_['init_motor_' + motor] = motor + ' = DCMotor2PIN(' + in1 + '_PIN, ' + in2 + '_IN)';
  var code = "";
  return code;
};

Blockly.Blocks['robotics_motor3p_init'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_motor_init",
        "message0": Blockly.Msg.ROBOTICS_MOTOR_INIT1,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "motor",
            "options": robotics_motors,
          },
          {
            "type": "field_dropdown",
            "name": "in1",
            "options": digitalPins,
          },
          {
            "type": "field_dropdown",
            "name": "in2",
            "options": digitalPins,
          },
          {
            "type": "field_dropdown",
            "name": "pwm",
            "options": digitalPins,
          },
          {
            "type": "field_dropdown",
            "name": "stdby",
            "options": digitalPins,
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_motor3p_init"] = function (block) {
  var motor = block.getFieldValue("motor");
  var in1 = block.getFieldValue("in1");
  var in2 = block.getFieldValue("in2");
  var pwm = block.getFieldValue("pwm");
  var stdby = block.getFieldValue("stdby");
  // TODO: Assemble Python into code variable.
  Blockly.Python.definitions_['import_robotics_motor'] = 'from motor import *';
  if (stdby == 'None') {
    Blockly.Python.definitions_['init_motor_' + motor] = motor + 
      ' = DCMotor3PIN(' + in1 + '_PIN, ' + in2 + '_IN, ' +
      pwm + '_PIN, None)';
  } else {
    Blockly.Python.definitions_['init_motor_' + motor] = motor + 
      ' = DCMotor3PIN(' + in1 + '_PIN, ' + in2 + '_IN, ' +
      pwm + '_PIN, ' + stdby + '_PIN)';
  }
  
  var code = "";
  return code;
};

Blockly.Blocks['robotics_motori2c_init'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_motori2c_init",
        "message0": Blockly.Msg.ROBOTICS_I2C_MOTOR_INIT1,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "motor",
            "options": robotics_motors,
          },
          {
            "type": "field_dropdown",
            "name": "index",
            "options": [
              [
                "M1",
                "M1"
              ],
              [
                "M2",
                "M2"
              ],
              [
                "M3",
                "M3"
              ],
              [
                "M4",
                "M4"
              ],
              [
                "E1",
                "E1"
              ],
              [
                "E2",
                "E2"
              ]
            ],
          },          
          {
            "type": "field_dropdown",
            "name": "md",
            "options": [
              [
                "Control Hub",
                "3"
              ],
              [
                "Motor Driver V2",
                "2"
              ],
              [
                "Motor Driver V1",
                "1"
              ],
            ],
          },
          {
            "type": "field_checkbox",
            "name": "REVERSED",
            "checked": false
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_motori2c_init"] = function (block) {
  var motor = block.getFieldValue("motor");
  var index = block.getFieldValue("index");
  var md = block.getFieldValue("md");
  var reversed = block.getFieldValue('REVERSED') === 'TRUE';
  if (reversed) {
    reversed = 'True';
  } else {
    reversed = 'False';
  }
  // TODO: Assemble Python into code variable.
  Blockly.Python.definitions_['import_robotics_motor'] = 'from motor import *';
  if (md == 1) {
    Blockly.Python.definitions_['import_robotics_mdv1'] = 'from mdv1 import *';
    Blockly.Python.definitions_['init_motor_driver_v1'] = 'md_v1 = MotorDriverV1()';
    Blockly.Python.definitions_['init_motor_' + motor] = motor + ' = DCMotor(md_v1, ' + index + ', reversed=' + reversed + ')';
  } else {
    Blockly.Python.definitions_['import_robotics_mdv2'] = 'from mdv2 import *';
    Blockly.Python.definitions_['init_motor_driver_v2'] = 'md_v2 = MotorDriverV2()';
    Blockly.Python.definitions_['init_motor_' + motor] = motor + ' = DCMotor(md_v2, ' + index + ', reversed=' + reversed + ')';
  }
  
  var code = "";
  return code;
};

Blockly.Blocks['robotics_motor_run'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_motor_run",
        "message0": Blockly.Msg.ROBOTICS_I2C_MOTOR_RUN,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "motor",
            "options": robotics_motors,
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            value: 70,
            name: "speed",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};


Blockly.Python["robotics_motor_run"] = function (block) {
  var motor = block.getFieldValue("motor");
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = motor + ".run(" + speed + ")\n";

  return code;
};

//add motor brake

Blockly.Blocks['robotics_motor_brake'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_motor_brake",
        "message0": Blockly.Msg.ROBOTICS_I2C_MOTOR_ACTION,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "motor",
            "options": robotics_motors,
          },
          {
            "type": "field_dropdown",
            "name": "action",
            "options": motor_stop_then,
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};


Blockly.Python["robotics_motor_brake"] = function (block) {
  var motor = block.getFieldValue("motor");
  var action = block.getFieldValue("action");
  // TODO: Assemble Python into code variable.
  var code = motor + "." + action + "\n";

  return code;
};

//
Blockly.Blocks['robotics_motor_set_encoder'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_motor_set_encoder",
        "message0": Blockly.Msg.ROBOTICS_I2C_MOTOR_SET_ENCODER,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "motor",
            "options": robotics_motors,
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            value: 70,
            name: "rpm",
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            value: 70,
            name: "ppr",
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            value: 70,
            name: "gears",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_motor_set_encoder"] = function (block) {
  var motor = block.getFieldValue("motor");
  var rpm = Blockly.Python.valueToCode(block, 'rpm', Blockly.Python.ORDER_ATOMIC);
  var ppr = Blockly.Python.valueToCode(block, 'ppr', Blockly.Python.ORDER_ATOMIC);
  var gears = Blockly.Python.valueToCode(block, 'gears', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = motor + ".set_encoder(rpm=" + rpm + ", ppr=" + ppr + ", gears=" + gears + ")\n";

  return code;
};

Blockly.Blocks['robotics_motor_run_wait'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_motor_run_wait",
        "message0": Blockly.Msg.ROBOTICS_I2C_MOTOR_RUN_WAIT,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "motor",
            "options": robotics_motors,
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            value: 70,
            name: "amount",
          },
          {
            "type": "field_dropdown",
            "name": "unit",
            "options": [
              [
                Blockly.Msg.ROBOTICS_SECONDS,
                "second"
              ],
              [
                Blockly.Msg.ROBOTICS_ROUND,
                "rotation"
              ],
              [
                Blockly.Msg.ROBOTICS_DEGREE,
                "angle"
              ],
            ],
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            value: 70,
            name: "speed",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};


Blockly.Python["robotics_motor_run_wait"] = function (block) {
  var motor = block.getFieldValue("motor");
  var amount = Blockly.Python.valueToCode(block, 'amount', Blockly.Python.ORDER_ATOMIC);
  var unit = block.getFieldValue("unit");
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "";
  if (unit == "second") {
    code = "await " + motor + ".run_time(speed=" + speed + ", time=" + amount + "*1000, then=STOP)\n";
  } else if (unit == "angle") {
    code = "await " + motor + ".run_angle(speed=" + speed + ", angle=" + amount + ", then=BRAKE)\n";
  } else if (unit == "rotation") {
    code = "await " + motor + ".run_rotation(speed=" + speed + ", rotation=" + amount + ", then=BRAKE)\n";
  }

  return code;
};

Blockly.Blocks['robotics_motor_run_stalled'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_motor_run_stalled",
        "message0": Blockly.Msg.ROBOTICS_I2C_MOTOR_STALLED,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "motor",
            "options": robotics_motors,
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            value: 70,
            name: "speed",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};


Blockly.Python["robotics_motor_run_stalled"] = function (block) {
  var motor = block.getFieldValue("motor");
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "await " + motor + ".run_until_stalled(" + speed + ", then=STOP)\n";

  return code;
};

Blockly.Blocks["robotics_motor_get"] = {
  init: function () {
    this.jsonInit({
      message0: "%1 %2",
      args0: [
        {
          type: "field_dropdown",
          name: "motor",
          options: robotics_motors,
        },
        {
          "type": "field_dropdown",
          "name": "property",
          "options": [
            [
              Blockly.Msg.ROBOTICS_GET_ANGLE,
              "angle()"
            ],
            [
              Blockly.Msg.ROBOTICS_GET_TICKS,
              "encoder_ticks()"
            ],
            [
              Blockly.Msg.ROBOTICS_GET_SPEED,
              "speed()"
            ]
          ],
        },
      ],
      output: null,
      colour: roboticsMotorBlockColor,
      tooltip: "",
      helpUrl: ""
    });
  }
};

Blockly.Python["robotics_motor_get"] = function (block) {
  var motor = block.getFieldValue('motor');
  var property = block.getFieldValue('property');
  // TODO: Assemble Python into code variable.
  var code = motor + '.' + property;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['robotics_motor_reset_angle'] = {
  /**
   * Block for waiting.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit(
      {
        "message0": Blockly.Msg.ROBOTICS_I2C_MOTOR_RESET_TICKS,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "motor",
            "options": robotics_motors
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python['robotics_motor_reset_angle'] = function (block) {
  var motor = block.getFieldValue('motor');
  // TODO: Assemble Python into code variable.
  var code = motor + ".reset_angle()\n";
  return code;
};

Blockly.Blocks['robotics_servo_init'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_servo_init",
        "message0": Blockly.Msg.ROBOTICS_SERVO_INIT,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "servo",
            "options": robotics_servos,
          },
          {
            "type": "field_dropdown",
            "name": "port",
            "options": [
              [
                "S1",
                "S1"
              ],
              [
                "S2",
                "S2"
              ],
              [
                "S3",
                "S3"
              ],
              [
                "S4",
                "S4"
              ],
              [
                "D2",
                "D2"
              ],
              [
                "D3",
                "D3"
              ],
              [
                "D4",
                "D4"
              ],
              [
                "D5",
                "D5"
              ],
              [
                "D6",
                "D6"
              ],
              [
                "D7",
                "D7"
              ],
              [
                "D8",
                "D8"
              ],
              [
                "D9",
                "D9"
              ],
              [
                "D10",
                "D10"
              ],
              [
                "D11",
                "D11"
              ],
              [
                "D12",
                "D12"
              ],
              [
                "D13",
                "D13"
              ],
              [
                "D0",
                "D0"
              ],
              [
                "D1",
                "D1"
              ],
            ],
          },          
          {
            "type": "field_dropdown",
            "name": "type",
            "options": [
              [
                "180",
                "180"
              ],
              [
                "270",
                "270"
              ],
              [
                "360",
                "360"
              ],
            ],
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_servo_init"] = function (block) {
  var servo = block.getFieldValue("servo");
  var port = block.getFieldValue("port");
  var type = block.getFieldValue("type");
  // TODO: Assemble Python into code variable.
  Blockly.Python.definitions_['import_robotics_servo'] = 'from servo import *';
  if (port.startsWith("S")) {
    Blockly.Python.definitions_['import_robotics_mdv2'] = 'from mdv2 import *';
    Blockly.Python.definitions_['init_motor_driver_v2'] = 'md_v2 = MotorDriverV2()';
    Blockly.Python.definitions_['init_robotics_servo_' + servo] = servo + ' = Servo(md_v2, ' + port + ', ' + type + ')';
  } else {
    Blockly.Python.definitions_['init_robotics_servo_' + servo] = servo + ' = Servo(' + port + '_PIN, ' + type + ')';
  }
  
  var code = "";
  return code;
};

Blockly.Blocks['robotics_servo_limit'] = {
  /**
   * Block for waiting.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit(
      {
        "message0": Blockly.Msg.ROBOTICS_SERVO_LIMIT,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "servo",
            "options": robotics_servos,
          },
          {
            "type": "input_value",
            "name": "min",
            "check": "Number",
            "min": 0,
            "max": 270,
          },
          {
            "type": "input_value",
            "name": "max",
            "check": "Number",
            "min": 0,
            "max": 270,
          },
          {
            type: "input_dummy"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python['robotics_servo_limit'] = function (block) {
  var servo = block.getFieldValue("servo");
  var min = Blockly.Python.valueToCode(block, 'min', Blockly.Python.ORDER_ATOMIC);
  var max = Blockly.Python.valueToCode(block, 'max', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = servo + '.limit(min=' + min + ', max=' + max + ')\n';
  return code;
};


Blockly.Blocks['robotics_servo_angle'] = {
  /**
   * Block for waiting.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit(
      {
        "message0": Blockly.Msg.ROBOTICS_SERVO_ANGLE,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "servo",
            "options": robotics_servos,
          },
          {
            "type": "input_value",
            "name": "angle",
            "check": "Number",
            "min": 0,
            "max": 270,
          },
          {
            "type": "input_value",
            "name": "speed",
            "check": "Number",
            "min": 0,
            "max": 100,
          },
          {
            type: "input_dummy"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python['robotics_servo_angle'] = function (block) {
  var servo = block.getFieldValue("servo");
  var angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'await ' + servo + '.run_angle(angle=' + angle + ', speed=' + speed + ')\n';
  return code;
};

Blockly.Blocks['robotics_servo_steps'] = {
  /**
   * Block for waiting.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit(
      {
        "message0": Blockly.Msg.ROBOTICS_SERVO_STEP,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "servo",
            "options": robotics_servos,
          },
          {
            "type": "input_value",
            "name": "steps",
            "check": "Number",
            "min": 0,
            "max": 270,
          },
          {
            type: "input_dummy"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python['robotics_servo_steps'] = function (block) {
  var servo = block.getFieldValue("servo");
  var steps = Blockly.Python.valueToCode(block, 'steps', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'await ' + servo + '.run_steps(' + steps + ')\n';
  return code;
};

Blockly.Blocks['robotics_servo_spin'] = {
  /**
   * Block for waiting.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit(
      {
        "message0": Blockly.Msg.ROBOTICS_SERVO_SPIN,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "servo",
            "options": robotics_servos,
          },
          {
            "type": "input_value",
            "name": "speed",
            "check": "Number",
            "min": -100,
            "max": 100,
          },
          {
            type: "input_dummy"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python['robotics_servo_spin'] = function (block) {
  var servo = block.getFieldValue("servo");
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = servo + '.spin(' + speed + ')\n';
  return code;
};


Blockly.Blocks['robotics_robot_init'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_robot_init",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_INIT,
        "args0": [
          {
            "type": "field_image",
            "src": "https://ohstem-public.s3.ap-southeast-1.amazonaws.com/extensions/AITT-VN/yolouno_extension_robotics/images/left_front_wheel.svg",
            "width": 20,
            "height": 20,
            "alt": Blockly.Msg.ROBOTICS_FRONT_LEFT,
            "flipRtl": false
          },
          {
            "type": "field_dropdown",
            "name": "m1",
            "options": robotics_motors_with_none
          },
          {
            "type": "field_image",
            "src": "https://ohstem-public.s3.ap-southeast-1.amazonaws.com/extensions/AITT-VN/yolouno_extension_robotics/images/right_front_wheel.svg",
            "width": 20,
            "height": 20,
            "alt": Blockly.Msg.ROBOTICS_FRONT_RIGHT,
            "flipRtl": false
          },
          {
            "type": "field_dropdown",
            "name": "m2",
            "options": robotics_motors_with_none
          },
          {
            "type": "field_image",
            "src": "https://ohstem-public.s3.ap-southeast-1.amazonaws.com/extensions/AITT-VN/yolouno_extension_robotics/images/left_rear_wheel.svg",
            "width": 20,
            "height": 20,
            "alt": Blockly.Msg.ROBOTICS_BACK_LEFT,
            "flipRtl": false
          },
          {
            "type": "field_dropdown",
            "name": "m3",
            "options": robotics_motors_with_none
          },
          {
            "type": "field_image",
            "src": "https://ohstem-public.s3.ap-southeast-1.amazonaws.com/extensions/AITT-VN/yolouno_extension_robotics/images/right_rear_wheel.svg",
            "width": 20,
            "height": 20,
            "alt": Blockly.Msg.ROBOTICS_BACK_RIGHT,
            "flipRtl": false
          },
          {
            "type": "field_dropdown",
            "name": "m4",
            "options": robotics_motors_with_none
          },
          {
            "type": "field_checkbox",
            "name": "mecanum",
            "checked": false
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsRobotBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_robot_init"] = function (block) {
  var motor1 = block.getFieldValue("m1");
  var motor2 = block.getFieldValue("m2");
  var motor3 = block.getFieldValue("m3");
  var motor4 = block.getFieldValue("m4");
  var mecanum = block.getFieldValue('mecanum') === 'TRUE';
  
  // TODO: Assemble Python into code variable.
  Blockly.Python.definitions_['import_robotics_drivebase'] = 'from drivebase import *';
  var mode = 'MODE_2WD';
  if (mecanum) {
    mode = 'MODE_MECANUM';
  } else {
    if (motor1 != "None" && motor2 != "None" && motor3 != "None" && motor4 != "None") {
      mode = 'MODE_4WD';
    } else {
      mode = 'MODE_2WD';
    }
  }

  Blockly.Python.definitions_['init_robotics_drivebase'] = 'robot = DriveBase(' + mode + ', m1=' + motor1 + ', m2=' + motor2 + ', m3=' + motor3 + ', m4=' + motor4 + ')';
  Blockly.Python.definitions_['deinit_robot'] = 'robot.stop()';
  
  var code = "";
  return code;
};

Blockly.Blocks['robotics_robot_config'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_robot_config",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_CONFIG,
        "args0": [
          {
            "type": "field_image",
            "src": "https://ohstem-public.s3.ap-southeast-1.amazonaws.com/extensions/AITT-VN/yolouno_extension_robotics/images/wheel_diameter.svg",
            "width": 30,
            "height": 30,
            "alt": Blockly.Msg.ROBOTICS_WHEELS,
            "flipRtl": false
          },
          {
            "type": "input_value",
            "name": "wheel",
            "check": "Number",
            "min": 0,
          },
          {
            "type": "field_image",
            "src": "https://ohstem-public.s3.ap-southeast-1.amazonaws.com/extensions/AITT-VN/yolouno_extension_robotics/images/robot_width.svg",
            "width": 30,
            "height": 30,
            "alt": Blockly.Msg.ROBOTICS_WIDTH,
            "flipRtl": false
          },
          {
            "type": "input_value",
            "name": "width",
            "check": "Number",
            "min": 0,
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsRobotBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_robot_config"] = function (block) {
  var wheel = Blockly.Python.valueToCode(block, 'wheel', Blockly.Python.ORDER_ATOMIC);
  var width = Blockly.Python.valueToCode(block, 'width', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.  
  var code = "robot.size(wheel=" + wheel + ", width=" + width + ")\n";
  return code;
};

Blockly.Blocks['robotics_robot_move'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_robot_move",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_MOVE,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "direction",
            "options": [
              [
                {
                  "src": "static/blocks/block_images/59043.svg",
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "forward"
              ],
              [
                {
                  "src": "static/blocks/block_images/959159.svg",
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "backward"
              ],
              [
                {
                  "src": "static/blocks/block_images/860774.svg",
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "turn_left"
              ],
              [
                {
                  "src": "static/blocks/block_images/74474.svg",
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "turn_right"
              ],
              [
                {
                  "src": "static/blocks/block_images/arrow-left.svg",
                  "width": 15,
                  "height": 15,
                  "alt": "side left"
                },
                "move_left"
              ],
              [
                {
                  "src": "static/blocks/block_images/arrow-right.svg",
                  "width": 15,
                  "height": 15,
                  "alt": "side right"
                },
                "move_right"
              ]
            ]
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsRobotBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_robot_move"] = function (block) {
  var dir = block.getFieldValue("direction");
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "robot." + dir + "()\n";
  return code;
};

Blockly.Blocks['robotics_robot_move_delay'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_robot_move_delay",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_MOVE_DELAY,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "direction",
            "options": [
              [
                {
                  "src": "static/blocks/block_images/59043.svg",
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "forward_for"
              ],
              [
                {
                  "src": "static/blocks/block_images/959159.svg",
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "backward_for"
              ],
              [
                {
                  "src": "static/blocks/block_images/arrow-left.svg",
                  "width": 15,
                  "height": 15,
                  "alt": "side left"
                },
                "move_left_for"
              ],
              [
                {
                  "src": "static/blocks/block_images/arrow-right.svg",
                  "width": 15,
                  "height": 15,
                  "alt": "side right"
                },
                "move_right_for"
              ]
            ]
          },
          {
            type: "input_value",
            check: "Number",
            value: 1,
            name: "amount",
          },
          {
            "type": "field_dropdown",
            "name": "unit",
            "options": [
              [
                Blockly.Msg.ROBOTICS_SECONDS,
                "SECOND"
              ],
              [
                "cm",
                "CM"
              ],
            ],
          },
          {
            "type": "field_dropdown",
            "name": "then",
            "options": [
              [
                Blockly.Msg.ROBOTICS_STOP,
                "STOP"
              ],
              [
                Blockly.Msg.ROBOTICS_BRAKE,
                "BRAKE"
              ],
            ],
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsRobotBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_robot_move_delay"] = function (block) {
  var dir = block.getFieldValue("direction");
  var unit = block.getFieldValue("unit");
  var then = block.getFieldValue("then");
  var amount = Blockly.Python.valueToCode(block, 'amount', Blockly.Python.ORDER_ATOMIC);

  var code = "await robot." + dir + "(" + amount + ", unit=" + unit + ", then=" + then + ")\n";

  return code;
};

Blockly.Blocks['robotics_robot_turn_delay'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_robot_turn",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_TURN_DELAYED,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "direction",
            "options": [
              [
                {
                  "src": "static/blocks/block_images/860774.svg",
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "turn_left_for"
              ],
              [
                {
                  "src": "static/blocks/block_images/74474.svg",
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "turn_right_for"
              ]
            ]
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            value: 1,
            name: "amount",
          },
          {
            "type": "field_dropdown",
            "name": "unit",
            "options": [
              [
                Blockly.Msg.ROBOTICS_SECONDS,
                "SECOND"
              ],
              [
                Blockly.Msg.ROBOTICS_DEGREE,
                "DEGREE"
              ],
            ],
          },
          {
            "type": "field_dropdown",
            "name": "then",
            "options": [
              [
                Blockly.Msg.ROBOTICS_STOP,
                "STOP"
              ],
              [
                Blockly.Msg.ROBOTICS_BRAKE,
                "BRAKE"
              ],
            ],
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsRobotBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_robot_turn_delay"] = function (block) {
  var dir = block.getFieldValue("direction");
  var unit = block.getFieldValue("unit");
  var amount = Blockly.Python.valueToCode(block, 'amount', Blockly.Python.ORDER_ATOMIC);
  var then = block.getFieldValue("then");
  var code = "await robot." + dir + "(" + amount + ", unit=" + unit + ", then=" + then + ")\n";
  return code;
};

Blockly.Blocks['robotics_robot_stop'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_robot_stop",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_STOP,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "then",
            "options": [
              [
                Blockly.Msg.ROBOTICS_STOP,
                "stop"
              ],
              [
                Blockly.Msg.ROBOTICS_BRAKE,
                "brake"
              ],
            ],
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsRobotBlockColor,
        "tooltip": "",
        "helpUrl": ""

      }
    );
  }
};

Blockly.Python["robotics_robot_stop"] = function (block) {
  // TODO: Assemble Python into code variable.
  var then = block.getFieldValue("then");
  var code = "robot." + then + "()\n";
  return code;
};

Blockly.Blocks['robotics_robot_set_speed'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_robot_set_speed",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_SET_SPEED,
        "args0": [
          {
            type: "input_value",
            check: "Number",
            value: 1,
            name: "speed",
          },
          {
            type: "input_value",
            check: "Number",
            value: 1,
            name: "min_speed",
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsRobotBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_robot_set_speed"] = function (block) {
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var min_speed = Blockly.Python.valueToCode(block, 'min_speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "robot.speed(" + speed + ", min_speed=" + min_speed + ")\n";
  return code;
};

Blockly.Blocks['robotics_robot_use_gyro'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_robot_use_gyro",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_USE_GYRO,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "use_gyro",
            "options": [
              [
                "encoder",
                "False"
              ],
              [
                Blockly.Msg.ROBOTICS_ANGLE_SENSOR,
                "True"
              ],
            ],
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsRobotBlockColor,
        "tooltip": "",
        "helpUrl": ""

      }
    );
  }
};

Blockly.Python["robotics_robot_use_gyro"] = function (block) {
  // TODO: Assemble Python into code variable.
  var use_gyro = block.getFieldValue("use_gyro");
  var code = "robot.use_gyro(" + use_gyro + ")\n";
  return code;
};

Blockly.Blocks['robotics_robot_set_pid'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_robot_set_pid",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_SET_PID,
        "args0": [
          {
            type: "input_value",
            check: "Number",
            value: 1,
            name: "KP",
          },
          {
            type: "input_value",
            check: "Number",
            value: 1,
            name: "KI",
          },
          {
            type: "input_value",
            check: "Number",
            value: 1,
            name: "KD",
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsRobotBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_robot_set_pid"] = function (block) {
  var kp = Blockly.Python.valueToCode(block, 'KP', Blockly.Python.ORDER_ATOMIC);
  var ki = Blockly.Python.valueToCode(block, 'KI', Blockly.Python.ORDER_ATOMIC);
  var kd = Blockly.Python.valueToCode(block, 'KD', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "robot.pid(Kp=" + kp + ", Ki=" + ki + ", Kd=" + kd + ")\n";
  return code;
};

Blockly.Blocks['robotics_robot_set_speed_ratio'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_robot_set_speed_ratio",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_SET_SPEED_RATIO,
        "args0": [
          {
            type: "input_value",
            check: "Number",
            value: 1,
            name: "left",
          },
          {
            type: "input_value",
            check: "Number",
            value: 1,
            name: "right",
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsRobotBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_robot_set_speed_ratio"] = function (block) {
  var left = Blockly.Python.valueToCode(block, 'left', Blockly.Python.ORDER_ATOMIC);
  var right = Blockly.Python.valueToCode(block, 'right', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "robot.speed_ratio(left=" + left + ", right=" + right + ")\n";
  return code;
};

// REMOTE CONTROL BLOCK

const ImgUrl = 'https://ohstem-public.s3.ap-southeast-1.amazonaws.com/extensions/AITT-VN/xbot_extension_robocon/images/';

Blockly.Blocks['robotics_remote_control_init'] = {
  init: function () {
    this.jsonInit(
      {
        type: "robotics_remote_control_init",
        message0: Blockly.Msg.ROBOTICS_ROBOT_REMOTE_CONTROL_INIT,
        previousStatement: null,
        nextStatement: null,
        args0: [ 
          {
            type: "input_value",
            check: "Number",
            value: 1,
            name: "accel_steps",
          },
        ],
        colour: roboticsRobotBlockColor,
        "inputsInline": true,
        tooltip: "",
        helpUrl: ""
      }
    )
  },
};


Blockly.Python['robotics_remote_control_init'] = function (block) {
  var steps = Blockly.Python.valueToCode(block, 'accel_steps', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  Blockly.Python.definitions_['import_ble'] = 'from ble import *';
  Blockly.Python.definitions_['import_robotics_gamepad'] = 'from gamepad import *';
  Blockly.Python.definitions_['init_robotics_gamepad'] = 'gamepad = Gamepad()';
  
  var code = 'create_task(ble.wait_for_msg())\n';
  code += 'create_task(gamepad.run())\n';
  code += 'create_task(robot.run_teleop(gamepad, accel_steps=' + steps + '))\n';
  return code;
};


Blockly.Blocks['robotics_remote_control_side_move_mode'] = {
  init: function () {
    this.jsonInit(
      {
        type: "robotics_remote_control_side_move_mode",
        message0: Blockly.Msg.ROBOTICS_ROBOT_REMOTE_CONTROL_SIDE_MOVE_MODE,
        previousStatement: null,
        nextStatement: null,
        args0: [
          {
            "type": "field_dropdown",
            "name": "action",
            "options": [
              [
                Blockly.Msg.ROBOTICS_DPAD,
                "DPAD"
              ],
              [
                Blockly.Msg.ROBOTICS_LEFT_JOYSTICK,
                "JOYSTICK"
              ],
            ],
          },
         ],
        colour: roboticsRobotBlockColor,
        "inputsInline": true,
        tooltip: "",
        helpUrl: ""
      }
    )
  },
};


Blockly.Python['robotics_remote_control_side_move_mode'] = function (block) {
  // TODO: Assemble Python into code variable.
  var action = block.getFieldValue("action");
  var code = "robot.side_move_mode = " + action + "\n";
  return code;
};

Blockly.Blocks['robotics_remote_control_off'] = {
  init: function () {
    this.jsonInit(
      {
        type: "robotics_remote_control_off",
        message0: Blockly.Msg.ROBOTICS_ROBOT_REMOTE_CONTROL_OFF,
        previousStatement: null,
        nextStatement: null,
        args0: [
          {
            "type": "field_dropdown",
            "name": "action",
            "options": [
              [
                Blockly.Msg.ROBOTICS_ROBOT_REMOTE_CONTROL_PAUSE,
                "True"
              ],
              [
                Blockly.Msg.ROBOTICS_ROBOT_REMOTE_CONTROL_RESTART,
                "False"
              ],
            ],
          },
         ],
        colour: roboticsRobotBlockColor,
        "inputsInline": true,
        tooltip: "",
        helpUrl: ""
      }
    )
  },
};


Blockly.Python['robotics_remote_control_off'] = function (block) {
  // TODO: Assemble Python into code variable.
  var action = block.getFieldValue("action");
  var code = "robot.mode_auto = " + action + "\n";
  return code;
};

Blockly.Blocks["robotics_remote_control_on_button"] = {
  init: function () {
    this.jsonInit({
      colour: roboticsRobotBlockColor,
      message0: Blockly.Msg.ROBOTICS_ROBOT_REMOTE_CONTROL_ON_BUTTON,
      tooltip: Blockly.Msg.ROBOTICS_ROBOT_REMOTE_CONTROL_ON_BUTTON_TOOLTIP,
      args0: [
        {
          type: "field_dropdown",
          name: "BUTTON",
          options: [
            [
              {
                "src": "static/blocks/block_images/59043.svg",
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_UP"
            ],
            [
              {
                "src": "static/blocks/block_images/959159.svg",
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_DOWN"
            ],
            [
              {
                "src": "static/blocks/block_images/arrow-left.svg",
                "width": 15,
                "height": 15,
                "alt": "side left"
              },
              "BTN_LEFT"
            ],
            [
              {
                "src": "static/blocks/block_images/arrow-right.svg",
                "width": 15,
                "height": 15,
                "alt": "side right"
              },
              "BTN_RIGHT"
            ],
            [
              {
                "src": 'static/blocks/block_images/gamepad-square.png',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_SQUARE"
            ],
            [
              {
                "src": 'static/blocks/block_images/gamepad-circle.png',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_CIRCLE"
            ],
            [
              {
                "src": 'static/blocks/block_images/gamepad-cross.png',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_CROSS"
            ],
            [
              {
                "src": 'static/blocks/block_images/gamepad-triangle.png',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_TRIANGLE"
            ],
            ["L1", "BTN_L1"],
            ["R1", "BTN_R1"],
            ["L2", "BTN_L2"],
            ["R2", "BTN_R2"],
            ["SHARE", "BTN_M1"],
            ["OPTIONS", "BTN_M2"],
            ["Left Joystick", "BTN_THUMBL"],
            ["Right Joystick", "BTN_THUMBR"],
          ],
        },
        {
          type: "input_dummy",
        },
        {
          type: "input_statement",
          name: "ACTION",
        },
      ],
      helpUrl: "",
    });
  }
};

Blockly.Python['robotics_remote_control_on_button'] = function (block) {
  var button = block.getFieldValue('BUTTON');
  var statements_action = Blockly.Python.statementToCode(block, 'ACTION');

  var globals = buildGlobalString(block);

  var cbFunctionName = Blockly.Python.provideFunction_(
    'on_cmd_' + button,
    (globals != '') ?
      ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
        globals,
        statements_action || Blockly.Python.PASS
      ] :
      ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
        statements_action || Blockly.Python.PASS
      ]);

  var code = 'robot.on_teleop_command(' + button + ', ' + cbFunctionName + ')';
  Blockly.Python.definitions_['setup_robotics_on_teleop_command' + button] = code;

  return '';
};

Blockly.Blocks["robotics_remote_control_read_button"] = {
  init: function () {
    this.jsonInit({
      colour: roboticsRobotBlockColor,
      tooltip: "",
      message0: Blockly.Msg.ROBOTICS_ROBOT_REMOTE_CONTROL_READ_BUTTON,
      args0: [
        {
          type: "field_dropdown",
          name: "BUTTON",
          options: [
            [
              {
                "src": "static/blocks/block_images/59043.svg",
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_UP"
            ],
            [
              {
                "src": "static/blocks/block_images/959159.svg",
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_DOWN"
            ],
            [
              {
                "src": "static/blocks/block_images/arrow-left.svg",
                "width": 15,
                "height": 15,
                "alt": "side left"
              },
              "BTN_LEFT"
            ],
            [
              {
                "src": "static/blocks/block_images/arrow-right.svg",
                "width": 15,
                "height": 15,
                "alt": "side right"
              },
              "BTN_RIGHT"
            ],
            [
              {
                "src": 'static/blocks/block_images/gamepad-square.png',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_SQUARE"
            ],
            [
              {
                "src": 'static/blocks/block_images/gamepad-circle.png',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_CIRCLE"
            ],
            [
              {
                "src": 'static/blocks/block_images/gamepad-cross.png',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_CROSS"
            ],
            [
              {
                "src": 'static/blocks/block_images/gamepad-triangle.png',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_TRIANGLE"
            ],
            ["L1", "BTN_L1"],
            ["R1", "BTN_R1"],
            ["L2", "BTN_L2"],
            ["R2", "BTN_R2"],
          ],
        }
      ],
      output: "Boolean",
      helpUrl: "",
    });
  },
};

Blockly.Python["robotics_remote_control_read_button"] = function (block) {
  var button = block.getFieldValue("BUTTON");
  // TODO: Assemble Python into code variable.
  var code = 'gamepad.data[' + button + '] == 1';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["robotics_remote_control_read_joystick"] = {
  init: function () {
    this.jsonInit({
      colour: roboticsRobotBlockColor,
      tooltip: "",
      message0: Blockly.Msg.ROBOTICS_ROBOT_REMOTE_CONTROL_READ_JOYSTICK,
      args0: [
        {
          "type": "field_dropdown",
          "name": "joystick",
          "options": [
            [
              Blockly.Msg.ROBOTICS_LEFT,
              "AL"
            ],
            [
              Blockly.Msg.ROBOTICS_RIGHT,
              "AR"
            ]
          ]
        },
        {
          "type": "field_dropdown",
          "name": "data",
          "options": [
            [
              "X",
              "X"
            ],
            [
              "Y",
              "Y"
            ],
            [
              Blockly.Msg.ROBOTICS_DIR,
              "_DIR"
            ],
            [
              Blockly.Msg.ROBOTICS_DISTANCE,
              "_DISTANCE"
            ]
          ]
        }
      ],
      output: "Number",
      helpUrl: "",
    });
  },
};

Blockly.Python["robotics_remote_control_read_joystick"] = function (block) {
  var joystick = block.getFieldValue("joystick");
  var data = block.getFieldValue("data");
  // TODO: Assemble Python into code variable.
  var code = 'gamepad.data[' + joystick + data + ']';
  return [code, Blockly.Python.ORDER_NONE];
};


// Angle sensor


Blockly.Blocks['robotics_angle_sensor_init'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_angle_sensor_init",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_ANGLE_SENSOR_INIT,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "type",
            "options": [
              ["MPU6050", "MPU6050"],
              ["MPU9250", "MPU9250"]
            ]
          },
          {
            type: "input_value",
            check: "Number",
            value: 100,
            name: "samples",
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsSensorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_angle_sensor_init"] = function (block) {
  var type = block.getFieldValue("type");
  var samples = Blockly.Python.valueToCode(block, 'samples', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  if (type == "MPU6050") {
    Blockly.Python.definitions_['import_robotics_mpu6050'] = 'from mpu6050 import MPU6050';
    Blockly.Python.definitions_['init_robotics_mpu6050'] = 'imu = MPU6050()';
  }

  if (type == "MPU9250") {
    Blockly.Python.definitions_['import_robotics_mpu9250'] = 'from robotics_mpu9250 import MPU9250';  
    Blockly.Python.definitions_['init_robotics_mpu9250'] = 'imu = MPU9250()';
  }
  
  Blockly.Python.definitions_['import_robotics_angle_sensor'] = 'from angle_sensor import AngleSensor';
  Blockly.Python.definitions_['init_robotics_angle_sensor'] = 'angle_sensor = AngleSensor(imu)';

  var code = 'angle_sensor.calibrate(' + samples + ')\n' + 
    'create_task(angle_sensor.run())\n' +
    'robot.angle_sensor(angle_sensor)\n';
    
  return code;
};

Blockly.Blocks['robotics_angle_sensor_calib'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_angle_sensor_calib",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_ANGLE_SENSOR_CALIB,
        "args0": [
          {
            type: "input_value",
            check: "Number",
            value: 100,
            name: "samples",
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsSensorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_angle_sensor_calib"] = function (block) {
  var samples = Blockly.Python.valueToCode(block, 'samples', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'angle_sensor.calibrate(' + samples + ')\n' + 'await angle_sensor.reset()\n';
    
  return code;
};

Blockly.Blocks["robotics_angle_sensor_get"] = {
  init: function () {
    this.jsonInit({
      colour: roboticsSensorBlockColor,
      tooltip: "",
      message0: Blockly.Msg.ROBOTICS_ROBOT_READ_ANGLE_SENSOR,
      args0: [
        {
          type: "field_dropdown",
          name: "AXIS",
          options: [
            ["heading (yaw)", "heading"],
            ["pitch", "pitch"],
            ["roll", "roll"],
            [Blockly.Msg.ROBOTICS_ROBOT_READ_ALL_DATA, "print_data()"],
          ],
        }
      ],
      output: "Number",
      helpUrl: ""
    });
  },
};

Blockly.Python["robotics_angle_sensor_get"] = function (block) {
  var axis = block.getFieldValue("AXIS");
  // TODO: Assemble Python into code variable.
  var code = "angle_sensor." + axis;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["robotics_angle_sensor_get_imu"] = {
  init: function () {
    this.jsonInit({
      colour: roboticsSensorBlockColor,
      tooltip: "",
      message0: Blockly.Msg.ROBOTICS_ROBOT_GET_IMU,
      args0: [
        {
          type: "field_dropdown",
          name: "SENSOR",
          options: [
            ["accelerometer", "accel"],
            ["gyroscope", "gyro"],
            ["magnetometer", "mag"],
          ],
        },
        {
          type: "field_dropdown",
          name: "AXIS",
          options: [
            ["x", "x"],
            ["y", "y"],
            ["z", "z"],
          ],
        }
      ],
      output: "Number",
      helpUrl: ""
    });
  },
};

Blockly.Python["robotics_angle_sensor_get_imu"] = function (block) {
  var sensor = block.getFieldValue("SENSOR");
  var axis = block.getFieldValue("AXIS");
  // TODO: Assemble Python into code variable.
  var code = "imu." + sensor + "." + axis + "";
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['robotics_angle_sensor_reset'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_angle_sensor_reset",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_ANGLE_RESET,
        "args0": [],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsSensorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_angle_sensor_reset"] = function (block) {
  // TODO: Assemble Python into code variable.
  var code = 'await angle_sensor.reset()\n';

  return code;
};

Blockly.Blocks['robotics_angle_sensor_config'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_angle_sensor_config",
        "message0": Blockly.Msg.ROBOTICS_ANGLE_SENSOR_CONFIG,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "POSITION",
            "options": [
              [
                {
                  "src": "https://ohstem-public.s3.ap-southeast-1.amazonaws.com/extensions/AITT-VN/yolouno_extension_robotics/images/coordinate_1.png",
                  "width": 20,
                  "height": 20,
                  "alt": "Position 1"
                },
                "1"
              ],
              [
                {
                  "src": "https://ohstem-public.s3.ap-southeast-1.amazonaws.com/extensions/AITT-VN/yolouno_extension_robotics/images/coordinate_2.png",
                  "width": 20,
                  "height": 20,
                  "alt": "Position 2"
                },
                "2"
              ],
              [
                {
                  "src": "https://ohstem-public.s3.ap-southeast-1.amazonaws.com/extensions/AITT-VN/yolouno_extension_robotics/images/coordinate_3.png",
                  "width": 20,
                  "height": 20,
                  "alt": "Position 3"
                },
                "3"
              ]
            ]
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsSensorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_angle_sensor_config"] = function (block) {
  var position = block.getFieldValue("POSITION");
  var t = "(0, 1, 2)";
  var s = "(1, 1, 1)";
  
  if (position == "2") {
    t = "(2, 1, 0)";
    s = "(-1, -1, -1)";
  } else if (position == "3") {
    t = "(2, 0, 1)";
    s = "(-1, -1, 1)";
  }

  if (Blockly.Python.definitions_['init_robotics_mpu6050']) {
    Blockly.Python.definitions_['init_robotics_mpu6050'] = 'imu = MPU6050(transposition=' + t + ', scaling=' + s + ')';
  }
  if (Blockly.Python.definitions_['init_robotics_mpu9250']) {
    Blockly.Python.definitions_['init_robotics_mpu9250'] = 'imu = MPU9250(transposition=' + t + ', scaling=' + s + ')';
  }
  return '';
};

Blockly.Blocks["robotics_get_battery"] = {
  init: function () {
    this.jsonInit({
      colour: roboticsSensorBlockColor,
      tooltip: "",
      message0: Blockly.Msg.ROBOTICS_ROBOT_GET_BATTERY,
      args0: [],
      output: "Number",
      helpUrl: ""
    });
  },
};

Blockly.Python["robotics_get_battery"] = function (block) {
  // TODO: Assemble Python into code variable.
  Blockly.Python.definitions_['import_robotics_mdv2'] = 'from mdv2 import *';
  Blockly.Python.definitions_['init_motor_driver_v2'] = 'md_v2 = MotorDriverV2()';
  var code = "md_v2.battery()";
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['robotics_angle_sensor_init'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_angle_sensor_init",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_ANGLE_SENSOR_INIT,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "type",
            "options": [
              ["MPU6050", "MPU6050"],
              ["MPU9250", "MPU9250"]
            ]
          },
          {
            type: "input_value",
            check: "Number",
            value: 100,
            name: "samples",
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsSensorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

// Line sensor and line following

Blockly.Blocks['robotics_line_sensor_i2c_init'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_line_sensor_i2c_init",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_I2C_LINE_SENSOR_INIT,
        "args0": [],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsLineBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_line_sensor_i2c_init"] = function (block) {
  // TODO: Assemble Python into code variable.
  Blockly.Python.definitions_['import_robotics_line_sensor'] = 'from line_sensor import *';
  Blockly.Python.definitions_['init_robotics_line_sensor'] = 'line_sensor = LineSensorI2C()';
  var code = "robot.line_sensor(line_sensor)\n";
  return code;
};

Blockly.Blocks['robotics_line_sensor_digital_init'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_line_sensor_digital_init",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_DIGITAL_LINE_SENSOR_INIT,
        "args0": [
          {
            "type": "input_dummy"
          },
          {
            "type": "field_dropdown",
            "name": "S1",
            "options": digitalPins
          },
          {
            "type": "field_dropdown",
            "name": "S2",
            "options": digitalPins
          },
          {
            "type": "field_dropdown",
            "name": "S3",
            "options": digitalPins
          },
        ],
        "inputsInline": false,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsLineBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_line_sensor_digital_init"] = function (block) {
  var s1 = block.getFieldValue("S1");
  var s2 = block.getFieldValue("S2");
  var s3 = block.getFieldValue("S3");
  // TODO: Assemble Python into code variable.
  Blockly.Python.definitions_['import_robotics_line_sensor'] = 'from line_sensor import *';
  if (s3 == 'None') {
    Blockly.Python.definitions_['init_robotics_line_sensor'] = 
      'line_sensor = LineSensor2P(' + s1 + '_PIN, ' + s2 + '_PIN)';  
  } else {
    Blockly.Python.definitions_['init_robotics_line_sensor'] = 
      'line_sensor = LineSensor3P(' + s1 + '_PIN, ' + s2 + '_PIN, ' + s3 + '_PIN)';  
  }
  var code = "robot.line_sensor(line_sensor)\n";
  return code;
  
};
// Line array

Blockly.Blocks['robotics_line_sensor_read_all'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_line_sensor_read_all",
        "message0": Blockly.Msg.ROBOTICS_LINE_READ_ALL_MESSAGE0,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "S1",
            "options": [
              [
                {
                  "src": ImgUrl2 + 'line_finder_none_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "none"
                },
                "0"
              ],
              [
                {
                  "src": ImgUrl2 + 'line_finder_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "detect"
                },
                "1"
              ]
            ]
          },
          {
            "type": "field_dropdown",
            "name": "S2",
            "options": [
              [
                {
                  "src": ImgUrl2 + 'line_finder_none_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "none"
                },
                "0"
              ],
              [
                {
                  "src": ImgUrl2 + 'line_finder_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "detect"
                },
                "1"
              ]
            ]
          },
          {
            "type": "field_dropdown",
            "name": "S3",
            "options": [
              [
                {
                  "src": ImgUrl2 + 'line_finder_none_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "none"
                },
                "0"
              ],
              [
                {
                  "src": ImgUrl2 + 'line_finder_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "detect"
                },
                "1"
              ]
            ]
          },
          {
            "type": "field_dropdown",
            "name": "S4",
            "options": [
              [
                {
                  "src": ImgUrl2 + 'line_finder_none_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "none"
                },
                "0"
              ],
              [
                {
                  "src": ImgUrl2 + 'line_finder_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "detect"
                },
                "1"
              ]
            ]
          }
        ],
        "colour": roboticsLineBlockColor,
        "output": "Boolean",
        "tooltip": Blockly.Msg.ROBOTICS_LINE_READ_ALL_TOOLTIP,
        "helpUrl": Blockly.Msg.ROBOTICS_LINE_READ_ALL_HELPURL
      }
    );
  }
};

Blockly.Python["robotics_line_sensor_read_all"] = function (block) {
  Blockly.Python.definitions_['import_line_sensor'] = 'from line_sensor import *';
  Blockly.Python.definitions_['init_robotics_line_sensor'] = 'line_sensor = LineSensorI2C()';
  var S1 = block.getFieldValue("S1");
  var S2 = block.getFieldValue("S2");
  var S3 = block.getFieldValue("S3");
  var S4 = block.getFieldValue("S4");
  // TODO: Assemble Python into code variable.
  var code = "line_sensor.read() == (" + S1 + ", " + S2 + ", " + S3 + ", " + S4 + ")";
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['robotics_line_sensor_read'] = {
  init: function() {
    this.jsonInit(
      {
        "type": "robotics_line_sensor__read",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_LINE_SENSOR_READ,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "port",
            "options": [
              ["S1", "0"],
              ["S2", "1"],
              ["S3", "2"],
              ["S4", "3"],
            ],
          },
        ],
        "colour": roboticsLineBlockColor,
        "output": "Boolean",
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_line_sensor_read"] = function (block) {
  var port = block.getFieldValue("port");
  // TODO: Assemble Python into code variable.
  var code = "line_sensor.read(" + port + ")";
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['robotics_follow_line_until_cross'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_follow_line_until_cross",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_FOLLOW_LINE_UNTIL_CROSS,
        "args0": [
          {
            type: "field_dropdown",
            name: "stop",
            options: [
            [Blockly.Msg.ROBOTICS_BRAKE , "BRAKE"],
            [Blockly.Msg.ROBOTICS_STOP, "STOP"],
            [Blockly.Msg.ROBOTICS_NONE, "None"],
            ]
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsLineBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_follow_line_until_cross"] = function (block) {
  var stop = block.getFieldValue('stop');
  // TODO: Assemble Python into code variable.
  var code = "await robot.follow_line_until_cross(then=" + stop +  ")\n";
  return code;
};

Blockly.Blocks['robotics_follow_line_until_end'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_follow_line_until_end",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_FOLLOW_END_LINE,
        "args0": [
          {
            type: "field_dropdown",
            name: "stop",
            options: [
              [Blockly.Msg.ROBOTICS_BRAKE , "BRAKE"],
              [Blockly.Msg.ROBOTICS_STOP, "STOP"],
              [Blockly.Msg.ROBOTICS_NONE, "None"],
            ]
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsLineBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_follow_line_until_end"] = function (block) {
  var stop = block.getFieldValue('stop');
  // TODO: Assemble Python into code variable.
  var code = "await robot.follow_line_until_end(then=" + stop +  ")\n";
  return code;
};

Blockly.Blocks['robotics_turn_until_line_detected_then'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_turn_until_line_detected_then",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_TURN_UNTIL_LINE_DETECTED,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "direction",
            "options": [
              [
                {
                  "src": "static/blocks/block_images/860774.svg",
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "left"
              ],
              [
                {
                  "src": "static/blocks/block_images/74474.svg",
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "right"
              ]
            ]
          },
          {
            type: "field_dropdown",
            name: "stop",
            options: [
              [Blockly.Msg.ROBOTICS_BRAKE , "BRAKE"],
              [Blockly.Msg.ROBOTICS_STOP, "STOP"],
              [Blockly.Msg.ROBOTICS_NONE, "None"],
            ]
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsLineBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_turn_until_line_detected_then"] = function (block) {
  var dir = block.getFieldValue('direction');
  var stop = block.getFieldValue('stop');
  // TODO: Assemble Python into code variable.
  var code = "";
  if (dir == "left") {
    code = "await robot.turn_until_line_detected(steering=-100, then=" + stop + ")\n";
  } else {
    code = "await robot.turn_until_line_detected(steering=100, then=" + stop +  ")\n";
  }
  return code;
};

Blockly.Blocks['robotics_follow_line_by_time'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_follow_line_by_time",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_FOLLOW_LINE_BY_TIME,
        "args0": [
          {
            type: "input_value",
            check: "Number",
            value: 1,
            name: "duration",
          },
          {
            type: "field_dropdown",
            name: "stop",
            options: [
              [Blockly.Msg.ROBOTICS_BRAKE , "BRAKE"],
              [Blockly.Msg.ROBOTICS_STOP, "STOP"],
              [Blockly.Msg.ROBOTICS_NONE, "None"],
            ]
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsLineBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_follow_line_by_time"] = function (block) {
  var duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_ATOMIC);
  var stop = block.getFieldValue('stop');
  // TODO: Assemble Python into code variable.
  var code = "await robot.follow_line_by_time(" + duration + ", then=" + stop + ")\n";
  return code;
};


Blockly.Blocks['robotics_follow_line_until'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_follow_line_until",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_FOLLOW_LINE_UNTIL,
        "args0": [
          {
            "type": "input_value",
            "name": "condition",
          },
          {
            type: "field_dropdown",
            name: "stop",
            options: [
              [Blockly.Msg.ROBOTICS_BRAKE , "BRAKE"],
              [Blockly.Msg.ROBOTICS_STOP, "STOP"],
              [Blockly.Msg.ROBOTICS_NONE, "None"],
            ]
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsLineBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_follow_line_until"] = function (block) {
  var condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
  var stop = block.getFieldValue('stop');
  // TODO: Assemble Python into code variable.
  var code = "await robot.follow_line_until(" + "lambda: " + condition + ", then=" + stop + ")\n";
  return code;
};

// --------------------------------------------------------------------------------------------------------
// HuskyLens blocks ---------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

const HuskyLensColorBlock = "#8B4513";

var digitalPins = [
  ["D3", "D3"], ["D4", "D4"], ["D5", "D5"], ["D6", "D6"],
  ["D7", "D7"], ["D8", "D8"], ["D9", "D9"], ["D10", "D10"],
  ["D11", "D11"], ["D12", "D12"], ["D13", "D13"],
  ["D0", "D0"], ["D1", "D1"], ["D2", "D2"]
];

Blockly.Blocks['huskylens_i2c_init'] = {
  init: function () {
    this.jsonInit({
      type: "huskylens_i2c_init",
      message0: "Khởi tạo HuskyLens I2C",
      previousStatement: null,
      nextStatement: null,
      args0: [],
      colour: HuskyLensColorBlock,
      tooltip: "Khởi tạo kết nối HuskyLens qua I2C (địa chỉ 0x32)",
      helpUrl: ""
    });
  }
};

Blockly.Python['huskylens_i2c_init'] = function (block) {
  Blockly.Python.definitions_['import_huskylens'] = 'from HuskyLens import HuskyLens';
  Blockly.Python.definitions_['import_setting_i2c'] = 'from setting import SDA_PIN, SCL_PIN';
  Blockly.Python.definitions_['create_huskylens'] = 'husky = HuskyLens(sda_pin=SDA_PIN, scl_pin=SCL_PIN)';
  return '';
};

Blockly.Blocks["huskylens_update_block"] = {
  init: function () {
    this.jsonInit({
      type: "huskylens_update_block",
      colour: HuskyLensColorBlock,
      tooltip: "Cập nhật dữ liệu vật thể từ HuskyLens (gọi 1 lần mỗi vòng lặp)",
      message0: "Cập nhật vật thể ID %1",
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "OBJECT_ID",
          options: [
            ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"],
            ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"]
          ]
        }
      ],
      helpUrl: ""
    });
  }
};

Blockly.Python['huskylens_update_block'] = function (block) {
  var objectId = block.getFieldValue('OBJECT_ID');
  Blockly.Python.definitions_['huskylens_block_var_' + objectId] = '_husky_block_' + objectId + ' = {"x": 0, "y": 0, "w": 0, "h": 0}';
  var code = 'global _husky_block_' + objectId + '\n_husky_block_' + objectId + ' = await husky.get_block(' + objectId + ')\n';
  return code;
};

Blockly.Blocks["huskylens_bounding_box"] = {
  init: function () {
    this.jsonInit({
      colour: HuskyLensColorBlock,
      tooltip: "Đọc thông số khung bao vật thể theo ID (cần đặt khối Cập nhật trước)",
      message0: "Đọc %1 của vật thể ID %2",
      output: "Number",
      args0: [
        {
          type: "field_dropdown",
          name: "DATA_TYPE",
          options: [
            ["x trung tâm", "x"],
            ["y trung tâm", "y"],
            ["chiều rộng", "w"],
            ["chiều cao", "h"]
          ]
        },
        {
          type: "field_dropdown",
          name: "OBJECT_ID",
          options: [
            ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"],
            ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"]
          ]
        }
      ],
      helpUrl: ""
    });
  }
};

Blockly.Python['huskylens_bounding_box'] = function (block) {
  var dataType = block.getFieldValue('DATA_TYPE');
  var objectId = block.getFieldValue('OBJECT_ID');
  var code = '_husky_block_' + objectId + '["' + dataType + '"]';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Blocks["huskylens_update_arrow"] = {
  init: function () {
    this.jsonInit({
      type: "huskylens_update_arrow",
      colour: HuskyLensColorBlock,
      tooltip: "Cập nhật dữ liệu đường kẻ từ HuskyLens (gọi 1 lần mỗi vòng lặp)",
      message0: "Cập nhật đường kẻ",
      previousStatement: null,
      nextStatement: null,
      args0: [],
      helpUrl: ""
    });
  }
};

Blockly.Python['huskylens_update_arrow'] = function (block) {
  Blockly.Python.definitions_['huskylens_arrow_var'] = '_husky_arrow = {"xo": 0, "yo": 0, "xt": 0, "yt": 0}';
  var code = 'global _husky_arrow\n_husky_arrow = await husky.get_arrow()\n';
  return code;
};

Blockly.Blocks["huskylens_line_tracking"] = {
  init: function () {
    this.jsonInit({
      colour: HuskyLensColorBlock,
      tooltip: "Đọc tọa độ điểm đầu hoặc đuôi đường kẻ (cần đặt khối Cập nhật trước)",
      message0: "Đọc tọa độ %1 đường kẻ",
      output: "Number",
      args0: [
        {
          type: "field_dropdown",
          name: "POINT_TYPE",
          options: [
            ["x đuôi", "xo"],
            ["y đuôi", "yo"],
            ["x đầu", "xt"],
            ["y đầu", "yt"]
          ]
        }
      ],
      helpUrl: ""
    });
  }
};

Blockly.Python['huskylens_line_tracking'] = function (block) {
  var pointType = block.getFieldValue('POINT_TYPE');
  var code = '_husky_arrow["' + pointType + '"]';
  return [code, Blockly.Python.ORDER_MEMBER];
};

// KBOT Robot blocks ---------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

const KBotColorBlock = "#ff7513";
const KBotPIDColor = "#00a86b";
const KBotTrackColor = "#9b59b6";
const KBotGyroColor = "#2980b9";
const KBotTestColor = "#7f8c8d";

// Block 1: kbot_motor_init
Blockly.Blocks['kbot_motor_init'] = {
  init: function () {
    this.jsonInit({
      type: "kbot_motor_init",
      message0: "Khởi tạo động cơ Encoder %1 bánh %2 đảo chiều %3",
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "encoder",
          options: [
            ["E1", "E1"],
            ["E2", "E2"]
          ]
        },
        {
          type: "field_dropdown",
          name: "side",
          options: [
            ["TRÁI", "left"],
            ["PHẢI", "right"]
          ]
        },
        {
          type: "field_dropdown",
          name: "reverse",
          options: [
            ["KHÔNG", "no"],
            ["CÓ", "yes"]
          ]
        }
      ],
      inputsInline: true,
      colour: KBotColorBlock,
      tooltip: "Khởi tạo động cơ encoder cho KBOT",
      helpUrl: ""
    });
  }
};

Blockly.Python['kbot_motor_init'] = function (block) {
  var encoder = block.getFieldValue('encoder');
  var side = block.getFieldValue('side');
  var reverse = block.getFieldValue('reverse');

  Blockly.Python.definitions_['import_kbot'] = 'from kbot import *';
  Blockly.Python.definitions_['import_robotics_motor'] = 'from motor import *';
  Blockly.Python.definitions_['import_robotics_mdv2'] = 'from mdv2 import *';
  Blockly.Python.definitions_['init_motor_driver_v2'] = 'md_v2 = MotorDriverV2()';

  // Default: left=reversed=True, right=reversed=False
  // "đảo chiều = CÓ" flips the default
  var defaultReversed = (side == 'left');
  var finalReversed = (reverse == 'yes') ? !defaultReversed : defaultReversed;
  var reversedStr = finalReversed ? 'True' : 'False';

  var code = '';
  if (side == 'left') {
    Blockly.Python.definitions_['init_kbot_left'] = 'kbot_left = DCMotor(md_v2, ' + encoder + ', reversed=' + reversedStr + ')';
    if (reverse == 'yes') {
      code += 'kbot_left.reverse_encoder()\n';
    }
  } else {
    Blockly.Python.definitions_['init_kbot_right'] = 'kbot_right = DCMotor(md_v2, ' + encoder + ', reversed=' + reversedStr + ')';
    if (reverse == 'yes') {
      code += 'kbot_right.reverse_encoder()\n';
    }
  }

  delete Blockly.Python.definitions_['init_kbot_robot'];
  Blockly.Python.definitions_['init_kbot_robot'] = 'kbot = KBot(kbot_left, kbot_right)';
  delete Blockly.Python.definitions_['deinit_kbot'];
  Blockly.Python.definitions_['deinit_kbot'] = 'kbot.stop()';

  return code;
};

// Block 2: kbot_set_encoder
Blockly.Blocks['kbot_set_encoder'] = {
  init: function () {
    this.jsonInit({
      type: "kbot_set_encoder",
      message0: "KBOT cài đặt encoder bánh %1 RPM %2 PPR %3 tỉ số %4",
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "side",
          options: [
            ["TRÁI", "left"],
            ["PHẢI", "right"]
          ]
        },
        {
          type: "input_value",
          name: "rpm",
          check: "Number"
        },
        {
          type: "input_value",
          name: "ppr",
          check: "Number"
        },
        {
          type: "input_value",
          name: "gears",
          check: "Number"
        }
      ],
      inputsInline: true,
      colour: KBotColorBlock,
      tooltip: "Cài đặt thông số encoder cho động cơ KBOT (cần thiết để dùng đơn vị cm)",
      helpUrl: ""
    });
  }
};

Blockly.Python['kbot_set_encoder'] = function (block) {
  var side = block.getFieldValue('side');
  var rpm = Blockly.Python.valueToCode(block, 'rpm', Blockly.Python.ORDER_ATOMIC);
  var ppr = Blockly.Python.valueToCode(block, 'ppr', Blockly.Python.ORDER_ATOMIC);
  var gears = Blockly.Python.valueToCode(block, 'gears', Blockly.Python.ORDER_ATOMIC);
  var motor = (side == 'left') ? 'kbot_left' : 'kbot_right';
  var code = motor + ".set_encoder(rpm=" + rpm + ", ppr=" + ppr + ", gears=" + gears + ")\n";
  return code;
};

// Block 3: kbot_set_speed
Blockly.Blocks['kbot_set_speed'] = {
  init: function () {
    this.jsonInit({
      type: "kbot_set_speed",
      message0: "KBOT đặt tốc độ %1",
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "input_value",
          name: "speed",
          check: "Number"
        }
      ],
      inputsInline: true,
      colour: KBotColorBlock,
      tooltip: "Đặt tốc độ mặc định cho KBOT",
      helpUrl: ""
    });
  }
};

Blockly.Python['kbot_set_speed'] = function (block) {
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var code = "kbot.speed(" + speed + ")\n";
  return code;
};

// Block 4: kbot_move
Blockly.Blocks['kbot_move'] = {
  init: function () {
    this.jsonInit({
      type: "kbot_move",
      message0: "KBOT %1 tốc độ %2",
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "direction",
          options: [
            [{ src: "static/blocks/block_images/59043.svg", width: 15, height: 15, alt: "đi thẳng" }, "forward"],
            [{ src: "static/blocks/block_images/959159.svg", width: 15, height: 15, alt: "đi lùi" }, "backward"],
            [{ src: "static/blocks/block_images/860774.svg", width: 15, height: 15, alt: "xoay trái" }, "turn_left"],
            [{ src: "static/blocks/block_images/74474.svg", width: 15, height: 15, alt: "xoay phải" }, "turn_right"]
          ]
        },
        {
          type: "input_value",
          name: "speed",
          check: "Number"
        }
      ],
      inputsInline: true,
      colour: KBotColorBlock,
      tooltip: "KBOT di chuyển liên tục",
      helpUrl: ""
    });
  }
};

Blockly.Python['kbot_move'] = function (block) {
  var dir = block.getFieldValue('direction');
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var code = "kbot." + dir + "(" + speed + ")\n";
  return code;
};

// Block 5: kbot_move_for
Blockly.Blocks['kbot_move_for'] = {
  init: function () {
    this.jsonInit({
      type: "kbot_move_for",
      message0: "KBOT %1 tốc độ %2 trong %3 %4 rồi %5",
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "direction",
          options: [
            [{ src: "static/blocks/block_images/59043.svg", width: 15, height: 15, alt: "đi thẳng" }, "forward"],
            [{ src: "static/blocks/block_images/959159.svg", width: 15, height: 15, alt: "đi lùi" }, "backward"],
            [{ src: "static/blocks/block_images/860774.svg", width: 15, height: 15, alt: "xoay trái" }, "turn_left"],
            [{ src: "static/blocks/block_images/74474.svg", width: 15, height: 15, alt: "xoay phải" }, "turn_right"]
          ]
        },
        {
          type: "input_value",
          name: "speed",
          check: "Number"
        },
        {
          type: "input_value",
          name: "amount",
          check: "Number"
        },
        {
          type: "field_dropdown",
          name: "unit",
          options: [
            ["giây", "SECOND"],
            ["cm", "CM"]
          ]
        },
        {
          type: "field_dropdown",
          name: "then",
          options: [
            ["dừng lại", "STOP"],
            ["khóa bánh", "BRAKE"]
          ]
        }
      ],
      inputsInline: true,
      colour: KBotColorBlock,
      tooltip: "KBOT di chuyển trong khoảng thời gian hoặc quãng đường rồi dừng",
      helpUrl: ""
    });
  }
};

Blockly.Python['kbot_move_for'] = function (block) {
  var dir = block.getFieldValue('direction');
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var amount = Blockly.Python.valueToCode(block, 'amount', Blockly.Python.ORDER_ATOMIC);
  var unit = block.getFieldValue('unit');
  var then = block.getFieldValue('then');
  var code = "await kbot." + dir + "_for(" + speed + ", " + amount + ", unit=" + unit + ", then=" + then + ")\n";
  return code;
};

// Block 6: kbot_stop
Blockly.Blocks['kbot_stop'] = {
  init: function () {
    this.jsonInit({
      type: "kbot_stop",
      message0: "KBOT %1",
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "action",
          options: [
            ["dừng lại", "stop"],
            ["khóa bánh", "brake"]
          ]
        }
      ],
      inputsInline: true,
      colour: KBotColorBlock,
      tooltip: "Dừng KBOT",
      helpUrl: ""
    });
  }
};

Blockly.Python['kbot_stop'] = function (block) {
  var action = block.getFieldValue('action');
  var code = "kbot." + action + "()\n";
  return code;
};

// Block 7: kbot_gyro_init
Blockly.Blocks['kbot_gyro_init'] = {
  init: function () {
    this.jsonInit({
      type: "kbot_gyro_init",
      message0: "KBOT khởi tạo cảm biến góc, calib %1 mẫu",
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "input_value",
          name: "samples",
          check: "Number"
        }
      ],
      inputsInline: true,
      colour: KBotGyroColor,
      tooltip: "Khởi tạo cảm biến góc MPU6050 cho KBOT (robot phải đứng yên khi calib)",
      helpUrl: ""
    });
  }
};

Blockly.Python['kbot_gyro_init'] = function (block) {
  var samples = Blockly.Python.valueToCode(block, 'samples', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_robotics_mpu6050'] = 'from mpu6050 import MPU6050';
  Blockly.Python.definitions_['init_robotics_mpu6050'] = 'imu = MPU6050()';
  Blockly.Python.definitions_['import_robotics_angle_sensor'] = 'from angle_sensor import AngleSensor';
  Blockly.Python.definitions_['init_robotics_angle_sensor'] = 'angle_sensor = AngleSensor(imu)';
  var code = 'angle_sensor.calibrate(' + samples + ')\n' +
    'create_task(angle_sensor.run())\n' +
    'kbot.set_angle_sensor(angle_sensor)\n';
  return code;
};

// Block 8: kbot_turn_degree
Blockly.Blocks['kbot_turn_degree'] = {
  init: function () {
    this.jsonInit({
      type: "kbot_turn_degree",
      message0: "KBOT %1 tốc độ %2 góc %3 độ rồi %4",
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "direction",
          options: [
            [{ src: "static/blocks/block_images/860774.svg", width: 15, height: 15, alt: "xoay trái" }, "turn_left"],
            [{ src: "static/blocks/block_images/74474.svg", width: 15, height: 15, alt: "xoay phải" }, "turn_right"]
          ]
        },
        {
          type: "input_value",
          name: "speed",
          check: "Number"
        },
        {
          type: "input_value",
          name: "degree",
          check: "Number"
        },
        {
          type: "field_dropdown",
          name: "then",
          options: [
            ["dừng lại", "STOP"],
            ["khóa bánh", "BRAKE"]
          ]
        }
      ],
      inputsInline: true,
      colour: KBotGyroColor,
      tooltip: "KBOT xoay theo góc (cần khởi tạo cảm biến góc trước)",
      helpUrl: ""
    });
  }
};

Blockly.Python['kbot_turn_degree'] = function (block) {
  var dir = block.getFieldValue('direction');
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var degree = Blockly.Python.valueToCode(block, 'degree', Blockly.Python.ORDER_ATOMIC);
  var then = block.getFieldValue('then');
  var code = "await kbot." + dir + "_degree(" + speed + ", " + degree + ", then=" + then + ")\n";
  return code;
};

// Block 9: kbot_run_speed
Blockly.Blocks['kbot_run_speed'] = {
  init: function () {
    this.jsonInit({
      type: "kbot_run_speed",
      message0: "KBOT bánh TRÁI tốc độ %1 bánh PHẢI tốc độ %2",
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "input_value",
          name: "left_speed",
          check: "Number"
        },
        {
          type: "input_value",
          name: "right_speed",
          check: "Number"
        }
      ],
      inputsInline: true,
      colour: KBotColorBlock,
      tooltip: "Điều khiển tốc độ từng bánh riêng biệt",
      helpUrl: ""
    });
  }
};

Blockly.Python['kbot_run_speed'] = function (block) {
  var left_speed = Blockly.Python.valueToCode(block, 'left_speed', Blockly.Python.ORDER_ATOMIC);
  var right_speed = Blockly.Python.valueToCode(block, 'right_speed', Blockly.Python.ORDER_ATOMIC);
  var code = "kbot.run_speed(" + left_speed + ", " + right_speed + ")\n";
  return code;
};

// Block: kbot_set_target_rpm
Blockly.Blocks['kbot_set_target_rpm'] = {
  init: function () {
    this.jsonInit({
      type: "kbot_set_target_rpm",
      message0: "KBOT set RPM bánh TRÁI %1 bánh PHẢI %2",
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "input_value",
          name: "left_rpm",
          check: "Number"
        },
        {
          type: "input_value",
          name: "right_rpm",
          check: "Number"
        }
      ],
      inputsInline: true,
      colour: KBotPIDColor,
      tooltip: "Đặt tốc độ mong muốn (RPM) cho từng bánh",
      helpUrl: ""
    });
  }
};

Blockly.Python['kbot_set_target_rpm'] = function (block) {
  var left_rpm = Blockly.Python.valueToCode(block, 'left_rpm', Blockly.Python.ORDER_ATOMIC);
  var right_rpm = Blockly.Python.valueToCode(block, 'right_rpm', Blockly.Python.ORDER_ATOMIC);
  var code = "kbot.set_target_rpm(" + left_rpm + ", " + right_rpm + ")\n";
  return code;
};

// Block: kbot_pid_update
Blockly.Blocks['kbot_pid_update'] = {
  init: function () {
    this.jsonInit({
      type: "kbot_pid_update",
      message0: "KBOT PID motor cài đặt Kp %1 Ki %2 Kd %3",
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "input_value",
          name: "kp",
          check: "Number"
        },
        {
          type: "input_value",
          name: "ki",
          check: "Number"
        },
        {
          type: "input_value",
          name: "kd",
          check: "Number"
        }
      ],
      inputsInline: true,
      colour: KBotPIDColor,
      tooltip: "Cài đặt thông số PID cho motor (tự động chạy khi set_target_rpm)",
      helpUrl: ""
    });
  }
};

Blockly.Python['kbot_pid_update'] = function (block) {
  var kp = Blockly.Python.valueToCode(block, 'kp', Blockly.Python.ORDER_ATOMIC);
  var ki = Blockly.Python.valueToCode(block, 'ki', Blockly.Python.ORDER_ATOMIC);
  var kd = Blockly.Python.valueToCode(block, 'kd', Blockly.Python.ORDER_ATOMIC);
  var code = "kbot.pid_set(" + kp + ", " + ki + ", " + kd + ")\n";
  return code;
};

// Block: kbot_pid_stop
Blockly.Blocks['kbot_pid_stop'] = {
  init: function () {
    this.jsonInit({
      type: "kbot_pid_stop",
      message0: "KBOT PID dừng motor",
      previousStatement: null,
      nextStatement: null,
      args0: [],
      inputsInline: true,
      colour: KBotPIDColor,
      tooltip: "Dừng motor và reset PID state",
      helpUrl: ""
    });
  }
};

Blockly.Python['kbot_pid_stop'] = function (block) {
  var code = "kbot.pid_stop()\n";
  return code;
};

// Block: kbot_pid_reset
Blockly.Blocks['kbot_pid_reset'] = {
  init: function () {
    this.jsonInit({
      type: "kbot_pid_reset",
      message0: "KBOT PID reset",
      previousStatement: null,
      nextStatement: null,
      args0: [],
      inputsInline: true,
      colour: KBotPIDColor,
      tooltip: "Reset PID state (không dừng motor)",
      helpUrl: ""
    });
  }
};

Blockly.Python['kbot_pid_reset'] = function (block) {
  var code = "kbot.pid_reset()\n";
  return code;
};

// ============ Vision Tracking Blocks ============

// Block: kbot_track_set_pid
Blockly.Blocks['kbot_track_set_pid'] = {
  init: function () {
    this.jsonInit({
      type: "kbot_track_set_pid",
      message0: "KBOT tracking set PID %1 Kp %2 Ki %3 Kd %4",
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "AXIS",
          options: [["X", "x"], ["Y", "y"]]
        },
        { type: "input_value", name: "kp", check: "Number" },
        { type: "input_value", name: "ki", check: "Number" },
        { type: "input_value", name: "kd", check: "Number" }
      ],
      inputsInline: true,
      colour: KBotTrackColor,
      tooltip: "Cài đặt thông số PID cho trục X (lái) hoặc Y (tiến/lùi)",
      helpUrl: ""
    });
  }
};

Blockly.Python['kbot_track_set_pid'] = function (block) {
  var axis = block.getFieldValue('AXIS');
  var kp = Blockly.Python.valueToCode(block, 'kp', Blockly.Python.ORDER_ATOMIC);
  var ki = Blockly.Python.valueToCode(block, 'ki', Blockly.Python.ORDER_ATOMIC);
  var kd = Blockly.Python.valueToCode(block, 'kd', Blockly.Python.ORDER_ATOMIC);
  return "kbot.track_set_pid_" + axis + "(" + kp + ", " + ki + ", " + kd + ")\n";
};

// Block: kbot_track_set_speed
Blockly.Blocks['kbot_track_set_speed'] = {
  init: function () {
    this.jsonInit({
      type: "kbot_track_set_speed",
      message0: "KBOT tracking speed min %1 max %2",
      previousStatement: null,
      nextStatement: null,
      args0: [
        { type: "input_value", name: "min_speed", check: "Number" },
        { type: "input_value", name: "max_speed", check: "Number" }
      ],
      inputsInline: true,
      colour: KBotTrackColor,
      tooltip: "Cài đặt tốc độ tối thiểu và tối đa cho tracking",
      helpUrl: ""
    });
  }
};

Blockly.Python['kbot_track_set_speed'] = function (block) {
  var min_speed = Blockly.Python.valueToCode(block, 'min_speed', Blockly.Python.ORDER_ATOMIC);
  var max_speed = Blockly.Python.valueToCode(block, 'max_speed', Blockly.Python.ORDER_ATOMIC);
  return "kbot.track_set_speed(" + min_speed + ", " + max_speed + ")\n";
};

// Block: kbot_track_update
Blockly.Blocks['kbot_track_update'] = {
  init: function () {
    this.jsonInit({
      type: "kbot_track_update",
      message0: "KBOT track %1 object ID %2 target %3",
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "AXIS",
          options: [["X", "x"], ["Y", "y"]]
        },
        {
          type: "field_dropdown",
          name: "OBJECT_ID",
          options: [["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"],["10","10"]]
        },
        { type: "input_value", name: "target", check: "Number" }
      ],
      inputsInline: true,
      colour: KBotTrackColor,
      tooltip: "Tính PID tracking theo trục X (lái) hoặc Y (tiến/lùi) từ dữ liệu HuskyLens",
      helpUrl: ""
    });
  }
};

Blockly.Python['kbot_track_update'] = function (block) {
  var axis = block.getFieldValue('AXIS');
  var objectId = block.getFieldValue('OBJECT_ID');
  var target = Blockly.Python.valueToCode(block, 'target', Blockly.Python.ORDER_ATOMIC);
  var dataKey = axis === 'x' ? 'x' : 'y';
  return "kbot.track_" + axis + "(_husky_block_" + objectId + "[\"" + dataKey + "\"], " + target + ")\n";
};

// Block: kbot_track_speed (value block)
Blockly.Blocks['kbot_track_speed'] = {
  init: function () {
    this.jsonInit({
      type: "kbot_track_speed",
      message0: "KBOT tracking %1",
      output: "Number",
      args0: [
        {
          type: "field_dropdown",
          name: "OUTPUT",
          options: [["tốc độ trái", "track_vt"], ["tốc độ phải", "track_vp"]]
        }
      ],
      colour: KBotTrackColor,
      tooltip: "Đọc tốc độ tracking: vT (bánh trái) hoặc vP (bánh phải)",
      helpUrl: ""
    });
  }
};

Blockly.Python['kbot_track_speed'] = function (block) {
  var output = block.getFieldValue('OUTPUT');
  return ["kbot." + output, Blockly.Python.ORDER_MEMBER];
};

// Block 10: kbot_motor_run
Blockly.Blocks['kbot_motor_run'] = {
  init: function () {
    this.jsonInit({
      type: "kbot_motor_run",
      message0: "Động cơ %1 quay tốc độ %2 đảo chiều %3",
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "motor",
          options: [
            ["E1", "E1"],
            ["E2", "E2"],
            ["M1", "M1"],
            ["M2", "M2"],
            ["M3", "M3"],
            ["M4", "M4"]
          ]
        },
        {
          type: "input_value",
          name: "speed",
          check: "Number"
        },
        {
          type: "field_dropdown",
          name: "reverse",
          options: [
            ["KHÔNG", "no"],
            ["CÓ", "yes"]
          ]
        }
      ],
      inputsInline: true,
      colour: KBotTestColor,
      tooltip: "Quay động cơ với tốc độ chỉ định (0 để dừng)",
      helpUrl: ""
    });
  }
};

Blockly.Python['kbot_motor_run'] = function (block) {
  var motor = block.getFieldValue('motor');
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var reverse = block.getFieldValue('reverse');
  Blockly.Python.definitions_['import_robotics_mdv2'] = 'from mdv2 import *';
  Blockly.Python.definitions_['init_motor_driver_v2'] = 'md_v2 = MotorDriverV2()';
  var speedExpr = (reverse == 'yes') ? '-(' + speed + ')' : speed;
  var code = "md_v2.set_motors(" + motor + ", " + speedExpr + ")\n";
  return code;
};