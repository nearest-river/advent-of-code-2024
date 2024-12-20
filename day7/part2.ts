
interface Equation {
  readonly result: number,
  readonly operands: number[]
}

type Operator=typeof Operator[keyof typeof Operator];
const Operator={
  Add: 0,
  Mul: 1,
  Concat: 2,
} as const;

class Permutations {
  constructor(private readonly n: number) {}

  /// just using ternary instead of binary.
  *[Symbol.iterator](): Iterator<Iterable<Operator>> {
    for(let i=0;i<3**this.n;i++) {
      let n=BigInt(i);
      const permutation: Operator[]=[];
      while(n>0n) {
        permutation.push(Number(n%3n) as Operator);
        n/=3n;
      }

      if(permutation.length<this.n) {
        permutation.push(
          ...new Array<Operator>(this.n-permutation.length)
          .fill(0 as Operator)
        );
      }

      yield permutation.reverse();
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
        case Operator.Concat:
          res=Number(`${res}${eq.operands[i+1]}`);
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


