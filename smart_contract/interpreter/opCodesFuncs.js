import { EXECUTION_COMPLETE } from "../commons/constants";

export const OP_CODES_FUNCS = {
  STOP: function () {
    throw new Error(EXECUTION_COMPLETE);
  },
  PUSH: function () {
    this.state.programCounter++;
    if (this.state.programCounter === this.state.code.length) {
      throw new Error("PUSH cannot be last");
    }
    const value = this.state.code[this.state.programCounter];
    this.state.stack.push(value);
  },
  LOGIC: function (type) {
    const x = this.state.stack.pop();
    const y = this.state.stack.pop();
    let result;
    if (type === "ADD") {
      result = x + y;
    }
    if (type === "SUB") {
      result = x - y;
    }
    if (type === "MUL") {
      result = x * y;
    }
    if (type === "DIV") {
      result = x / y;
    }
    if (type === "LT") {
      result = x < y ? 1 : 0;
    }
    if (type === "GT") {
      result = x > y ? 1 : 0;
    }
    if (type === "EQ") {
      result = x === y ? 1 : 0;
    }
    if (type === "AND") {
      result = x && y;
    }
    if (type === "OR") {
      result = x || y;
    }
    this.state.stack.push(result);
  },
  JUMP: function () {
    const destination = this.state.stack.pop();
    if (destination < 0 || destination > this.state.code.length) {
      throw new Error("Invalid destination");
    }
    this.state.programCounter = destination;
  },
  JUMPI: function () {
    const condition = this.state.stack.pop();
    if (condition === 1) {
      const destination = this.state.stack.pop();
      this.state.programCounter = destination;
    }
  },
};
