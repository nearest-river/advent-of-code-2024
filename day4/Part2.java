import java.io.*;
import java.util.*;


public class Part2 {
  final static byte[] FORWORDS="MAS".getBytes();
  final static byte[] BACKWORDS="SAM".getBytes();
  final static byte MID=FORWORDS[FORWORDS.length/2];
  public static void main(String[] args) throws IOException {
    byte[][] table=parse("./input.txt").toArray(new byte[0][]);
    var count=0;

    // 'A's in first row or column cant match the X-MAS pattern
    for(int i=1;i<table.length-1;i++) {
      var row=table[i];

      for(int j=1;j<row.length-1;j++) {
        if(row[j]!=MID) {
          continue;
        }

        byte[] diagonal1={ table[i-1][j-1], row[j], table[i+1][j+1] };
        byte[] diagonal2={ table[i-1][j+1], row[j], table[i+1][j-1] };

        if(matcheed_by_both_diagonal(diagonal1,diagonal2)) {
          count++;
        }
      }
    }

    System.out.println(count);
  }

  static boolean matcheed_by_both_diagonal(byte[] diagonal1,byte[] diagonal2) {
    byte[] fmt1=corresponding_fmt(diagonal1[0]);
    byte[] fmt2=corresponding_fmt(diagonal2[0]);

    for(int i=0;i<diagonal1.length;i++) {
      if(diagonal1[i]!=fmt1[i] || diagonal2[i]!=fmt2[i]) {
        return false;
      }
    }

    return true;
  }

  static byte[] corresponding_fmt(byte first) {
    return first==FORWORDS[0]?FORWORDS:BACKWORDS;
  }

  static List<byte[]> parse(String path) throws IOException {
    var vec=new ArrayList<byte[]>();
    File file=new File(path);
    Scanner sc=new Scanner(file);

    int i=0;
    while(sc.hasNextLine()) {
      var line=sc.nextLine();
      System.out.printf("%d: %s\n",i++,line);
      vec.add(line.getBytes());
    }

    System.err.println();
    return vec;
  }
}

