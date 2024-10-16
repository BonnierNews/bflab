import { Writable, Duplex } from "node:stream";

// eslint-disable-next-line @bonniernews/typescript-rules/disallow-class-extends
class StringWritable extends Writable {
  constructor(options) {
    super(options);
    this.data = "";
  }

  _write(chunk, encoding, callback) {
    this.data += chunk.toString();
    callback();
  }

  getData() {
    return this.data;
  }
}

// eslint-disable-next-line @bonniernews/typescript-rules/disallow-class-extends
class ByteDuplex extends Duplex {
  constructor(options) {
    super({ ...options });
    this.data = [];
  }

  // ignore the size param and always return 1 byte
  _read() {
    if (this.data.length > 0) {
      const chunkis = this.data.pop();
      this.push(chunkis);
    } else {
      this.push(null);
    }
  }

  _write(chunk, encoding, callback) {
    this.data.push(chunk);
    callback();
  }
}

export function fakeStdout() {
  return new StringWritable();
}

export function fakeStdin(s) {
  return new ByteDuplex(s);
}
