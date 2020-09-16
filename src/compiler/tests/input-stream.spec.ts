import { InputStream } from "../input-stream";

describe('Input Stream', () => {
  const code = '=SUM(A1:A4)';
  let stream: InputStream;

  beforeAll(() => {
    stream = new InputStream(code);
  })

  describe('Success', () => {
    it('Should return next character', () => {
      const first: string = stream.next();
      expect(first).toEqual('=');
    })
    it('Should return next to next character', () => {
      const first: string = stream.next();
      expect(first).toEqual('S');
    })
    it('should peek one character', () => {
      const peeked: string = stream.peek()
      expect(peeked).toEqual('U')
    })
    it('should peek more than one character', () => {
      const peeked: string = stream.peek(2)
      expect(peeked).toEqual('(')
    })
    it('should let us know whether we have reached the end', () => {
      const ended = stream.end()
      expect(ended).toEqual(false)
    })
    it('should get the previous one character', () => {
      stream.previous()
      const previous = stream.next()
      expect(previous).toEqual('S')
    })
    it('should get the previous few character', () => {
      stream.previous(2)
      const previous = stream.next()
      expect(previous).toEqual('=')
    })
  })
  describe('Errors', () => {
    it('should throw an error when end of code has been reached', () => {
      // stream.next(); stream.next(); stream.next();
      // stream.next(); stream.next(); stream.next();
      // stream.next(); stream.next(); stream.next();
      // stream.next();
      // expect(stream.next()).toThrowError()
    })
  })
})
