export class Script {
  constructor(cmds = null) {
    if (!cmds) {
      self.cmds = [];
    } else {
      self.cmds = cmds;
    }
  }

  p2pkhScript(h160) {
    return Script([0x76, 0xa9, h160, 0x88, 0xac]);
  }
}
