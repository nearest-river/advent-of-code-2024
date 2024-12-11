
if(!import.meta.main) Deno.exit(0);

const inp=await Deno.readTextFile("./input.txt");


const rules=new Map();
const updates=[];
updates.pop();


for(const line of inp.split("\n")) {
  if(!line.length) {
    continue;
  }

  if(line.length>5) {
    updates.push(line.split(",").map(Number));
    continue;
  }

  const [page1,page2]=line.split("|").map(Number);
  const following_pages=rules.get(page1);

  if(!following_pages) {
    rules.set(page1,new Set([page2]));
    continue;
  }

  following_pages.add(page2);
}

/**
 * @param {number[]} update 
 */
function ordered(update) {
  for(const [idx,page] of update.entries()) {
    const rule=rules.get(page);
    if(!rule) {
      continue;
    }

    const prev_pages=new Set(update.slice(0,idx));
    for(const page of rule) {
      if(prev_pages.has(page)) return false;
    }
  }

  return true;
}

let sum=0;

for(const update of updates) {
  if(ordered(update)) {
    sum+=update[update.length>>1];
  }
}

console.log(sum);


