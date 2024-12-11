
if(!import.meta.main) Deno.exit(0);

const inp=await Deno.readTextFile("./input.txt");


const dummy_type_checker=[0,[0]];
const rules=new Map([dummy_type_checker]);
const updates=[[0]];
rules.delete(dummy_type_checker[0]);
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
    rules.set(page1,[page2]);
    continue;
  }

  following_pages.push(page2);
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


