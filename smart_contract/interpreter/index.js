import { OP_CODES_FUNCS } from "./opCodesFuncs";
import { OP_CODES } from "../commons/constants";
import { EXECUTION_COMPLETE } from "../commons/constants";

export class Interpreter {
  constructor() {
    this.state = {
      programCounter: 0,
      stack: [],
      code: [],
      execCounter: 0,
    };
  }

  runCode(code) {
    this.state.code = code;
    console.log("inside run code", this);

    while (this.state.programCounter < this.state.code.length) {
      this.state.execCount++;
      if (this.state.execCounter > EXECUTION_LIMIT) {
        throw new Error("Execution limit reached");
      }
      const opCode = this.state.code[this.state.programCounter];
      console.log("current opcode", opCode);
      try {
        switch (opCode) {
          case OP_CODES.STOP:
            OP_CODES_FUNCS.STOP.bind(this)();
          case OP_CODES.PUSH:
            OP_CODES_FUNCS.PUSH.bind(this)();
            break;
          case OP_CODES.ADD:
          case OP_CODES.SUB:
          case OP_CODES.MUL:
          case OP_CODES.DIV:
          case OP_CODES.LT:
          case OP_CODES.GT:
          case OP_CODES.EQ:
          case OP_CODES.AND:
          case OP_CODES.OR:
            OP_CODES_FUNCS.LOGIC.bind(this)(opCode);
            break;
          case OP_CODES.JUMP:
            OP_CODES_FUNCS.JUMP.bind(this)();
            this.state.programCounter--;
          case OP_CODES.JUMPI:
            OP_CODES_FUNCS.JUMPI.bind(this)();
            this.state.programCounter--;
        }
      } catch (e) {
        if (e.message === EXECUTION_COMPLETE) {
          return this.state.stack[this.state.stack.length - 1];
        }
        throw e;
      }

      this.state.programCounter++;
    }
  }
}
