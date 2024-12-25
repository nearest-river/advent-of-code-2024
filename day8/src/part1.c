#include <stdio.h>
#include <stdlib.h>
#include "../include/cvec/lib/lib.h"


typedef struct {
  isize row;
  isize col;
} Position;


bool is_antenna(char c);


int main(int argc,const char** argv) {
  FILE* file=fopen("./sample_inp.txt","r");
  if(!file) {
    perror("couldn't open the file\n");
    return EXIT_FAILURE;
  }

  Vec points=vec_new(sizeof(Position),(VecVTable){0});

  char c;
  isize i,j;
  isize row_len,col_len;
  for(i=0,j=0;EOF!=(c=fgetc(file));i++) {
    if(c=='\n') {
      col_len=i-2;
      i=0;
      j++;
      continue;
    }

    if(!is_antenna(c)) {
      continue;
    }

    Position point={
      .row=i,
      .col=j
    };
    vec_push(&points,&point);
  }
  row_len=j-1;

  const Position* antennas=points.ptr;
  bool antinodes[row_len][col_len];

  usize count=0;
  for(usize i=0;i<points.len;i++) {
    const Position p1=antennas[i];
    for(usize j=0;j<points.len;j++) {
      if(j==i) continue;
      const Position p2=antennas[j];
      const isize row=p2.row+(p2.row-p1.row);
      const isize col=p2.col+(p2.col-p1.col);
      if(row<0 || row>=row_len || col<0 || col>=col_len) {
        continue;
      }

      if(!antinodes[row][col]) {
        antinodes[row][col]=true;
        count++;
      }
    }
  }

  printf("%lu\n",count);
  return EXIT_SUCCESS;
}

inline
bool is_antenna(char c) {
  return (c>='A' && c<='Z') || (c>='a' && c<='z') || (c>='0' && c<='9');
}





