#include <bits/stdc++.h>
#include <regex>
#define BUF_SIZE 1024
#define let auto

using namespace std;

int main(int argc,const char** argv) {
  ifstream file("./input.txt");
  if (!file.is_open()) {
    perror("Failed to open file.");
    return 1;
  }

  stringstream stream;
  stream<<file.rdbuf();
  string buf=stream.str();

  regex pattern("mul\\(\\d{1,3},\\d{1,3}\\)");
  let begin=sregex_iterator(buf.begin(),buf.end(),pattern);
  let end=sregex_iterator();

  uint32_t sum=0;
  for(let match=begin;match!=end;match++) {
    let str=match->str();
    let len=str.length();
    size_t i=0;
    for(;i<len;i++) {
      if(str[i]==',') break;
    }

    let op=(char*)str.c_str();
    op[i]='\0';
    op[len-1]='\0';
    let operand1=atoi(op+4); // mul(...) the num always starts from idx 4
    let operand2=atoi(op+i+1);

    sum+=operand1*operand2;
  }


  printf("%d\n",sum);
  return 0;
}




