import { string } from "cast.ts";

export function imageParse() {
  let parser = string({ minLength: 5 });

  function parse(input: unknown): string {
    return parser.parse(input, {
      overrideType: "image",
    });
  }
  return { parse };
}

export function username() {
  let parser = string({ minLength: 3 });

  function parse(input: unknown): string {
    return parser.parse(input, {
      overrideType: "nickname",
    });
  }
  return { parse };
}

export function messageContent() {
  let parser = string({ minLength: 1, trim: true });

  function parse(input: unknown): string {
    return parser.parse(input, {
      overrideType: "MessageContent",
    });
  }
  return { parse };
}
