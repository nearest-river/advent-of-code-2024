
static BUF: &str=include_str!("../../input.txt");

type Pos=(usize,usize);


fn main() {
  let mut map=BUF.lines()
  .map(|line| line.as_bytes().into())
  .collect::<Box<[Box<[_]>]>>();

  let mut count=0usize;
  let init=find_guard(&map);

  for i in 0..map.len() {
    let row=&*map[i];
    for j in 0..row.len() {
      // assuming initial dir to be always upwards.
      if (j==init.1 && i==init.0) || map[i][j]==b'#' {
        continue;
      }

      map[i][j]=b'#';
      if is_loop(&mut map,init) {
        count+=1;
        map[i][j]=b'O';
      }
      map[i][j]=b'.';
    }
  }

  println!("{count}");
}

fn is_loop(map: &mut [Box<[u8]>],init: Pos)-> bool {
  let (mut i,mut j)=init;
  let mut turn=0;
  while let Some(next)=next_step(&map,(i,j)) {
    if turn>=map.len()*map[0].len()*4 {
      map[i][j]=b'.';
      map[init.0][init.1]=b'^';
      return true;
    }

    if map[next.0][next.1]==b'#' {
      map[i][j]=rotate(map[i][j]);
      turn+=1;
      continue;
    }

    map[i][j]^=map[next.0][next.1];
    map[next.0][next.1]^=map[i][j];
    map[i][j]^=map[next.0][next.1];

    (i,j)=next;
  }

  map[i][j]=b'.';
  map[init.0][init.1]=b'^';
  return false;
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
    _=> {
      println!("({i},{j}) {}",row[j] as char);
      map.iter()
      .map(|line| core::str::from_utf8(line.as_ref()).unwrap())
      .for_each(|line| println!("{line}"));
      panic!();
    }
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


