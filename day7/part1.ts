
interface Equation {
  readonly result: number,
  readonly operands: number[]
}

type Operator=typeof Operator[keyof typeof Operator];
const Operator={
  /// `0` means add
  Add: 0,
  /// `1` means mul (base 2)
  Mul: 1
} as const;

class Permutations {
  private readonly n: number;
  constructor(n: number) {
    // as 2^n has (n+1) significant bits, therefore the first bit isnt needed
    // which means we can use it to stop our inner loop.
    // [since for all 2^n theres only a single one in the base2 representation.]
    this.n=2**n;
  }

  /// this is why I hate javascript
  *[Symbol.iterator](): Iterator<Iterable<Operator>> {
    for(let i=0;i<this.n;i++) {
      let n=i|this.n;
      yield {
        *[Symbol.iterator](): Iterator<Operator> {
          // at the end `n` becomes `1` which again isn't needed
          while(n>1) {
            yield (n&1) as Operator;
            n>>=1;
          }
        }
      };
    }
  }
}

function parseEq(eq: string): Equation {
  const eq_idx=eq.indexOf(':');
  return {
    result: Number(eq.substring(0,eq_idx)),
    operands: eq.substring(eq_idx+2)
    .split(' ')
    .map(Number)
  };
}

function is_true(eq: Equation): boolean {
  if(eq.operands.length<=1) {
    return true;
  }

  const n=eq.operands.length-1;
  const iter=new Permutations(n);
  for(const opts of iter) {
    const ops=[...opts];
    let res=eq.operands[0];

    for(const [i,op] of ops.entries()) {
      switch(op) {
        case Operator.Add:
          res+=eq.operands[i+1];
        break;
        case Operator.Mul:
          res*=eq.operands[i+1];
        break;
      }
    }

    if(res==eq.result) {
      return true;
    }
  }

  return false;
}


const PATH: URL=new URL("./input.txt",import.meta.url);
const str=await Deno.readTextFile(PATH);

let sum=0;
for(const line of str.split('\n')) {
  if(!line) continue;

  const eq=parseEq(line);
  if(is_true(eq)) {
    sum+=eq.result;
  }
}


console.log(sum);


