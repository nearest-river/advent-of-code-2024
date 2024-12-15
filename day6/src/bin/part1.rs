use std::collections::HashSet;


static BUF: &str=include_str!("../../input.txt");


type Pos=(usize,usize);

fn main() {
  let mut map=BUF.lines()
  .map(|line| line.as_bytes().into())
  .collect::<Box<[Box<[_]>]>>();

  let (mut i,mut j)=find_guard(&map);
  let mut positions=HashSet::<Pos>::new();

  while let Some(next)=next_step(&map,(i,j)) {
    positions.insert((i,j));
    if map[next.0][next.1]==b'#' {
      map[i][j]=rotate(map[i][j]);
      continue;
    }

    map[i][j]^=map[next.0][next.1];
    map[next.0][next.1]^=map[i][j];
    map[i][j]^=map[next.0][next.1];

    (i,j)=next;
  }

  // initial_count + len
  println!("{}",positions.len()+1);
}


#[inline]
const fn rotate(guard: u8)-> u8 {
  match guard {
    b'^'=> b'>',
    b'>'=> b'v',
    b'v'=> b'<',
    b'<'=> b'^',
    _=> unreachable!()
  }
}

#[inline]
fn next_step<B: AsRef<[u8]>>(map: &[B],(i,j): Pos)-> Option<Pos> {
  let row=map[i].as_ref();
  match row[j] {
    b'^'=> Some((i.checked_sub(1)?,j)),
    b'v'=> if i+1==map.len() {
      None
    } else {
      Some((i+1,j))
    },
    b'<'=> Some((i,j.checked_sub(1)?)),
    b'>'=> if j+1==row.len() {
      None
    } else {
      Some((i,j+1))
    },
    _=> unreachable!()
  }
}

fn find_guard<B: AsRef<[u8]>>(map: &[B])-> Pos {
  for i in 0..map.len() {
    let row=map[i].as_ref();
    for j in 0..row.len() {
      match row[j] {
        b'^'|b'v'|b'>'|b'<'=> return (i,j),
        _=> ()
      }
    }
  }

  unreachable!("the input must have a guard")
}


