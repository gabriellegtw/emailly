// Since bard is not a standard data type,
// we have to declare a class for BARD because typescript is
// a strongly typed language

declare module 'bard-api-node' {
  export class BardAPI {
    constructor();
    ask(prompt: string): Promise<{ data: string }>;
  }
} 