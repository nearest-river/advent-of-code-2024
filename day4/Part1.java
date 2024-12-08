import java.io.*;
import java.util.*;


public class Part1 {
  final static byte[] FORWORDS="XMAS".getBytes();
  final static byte[] BACKWORDS="SAMX".getBytes();
  public static void main(String[] args) throws IOException {
    byte[][] table=Part1.parse("./input.txt").toArray(new byte[0][]);
    var count=0;

    for(int i=0;i<table.length;i++) {
      var row=table[i];

      for(int j=0;j<row.length;j++) {
        byte[] format=row[j]==FORWORDS[0]?FORWORDS:row[j]==BACKWORDS[0]?BACKWORDS:null;
        if(format==null) {
          continue;
        }

        if(matches_horizontally(row,j,format)) {
          count++;
        }

        if(matches_vertically(table,i,j,format)) {
          count++;
        }

        if(matches_diagonally_right(table,i,j,format)) {
          count++;
        }

        if(matches_diagonally_left(table,i,j,format)) {
          count++;
        }
      }
    }

    System.out.println(count);
  }

  static boolean matches_horizontally(byte[] row,int cursor,byte[] format) {
    int i;
    for(i=0;i<format.length && i+cursor<row.length;i++) {
      if(row[i+cursor]!=format[i]) {
        return false;
      }
    }

    return i==format.length;
  }

  static boolean matches_vertically(byte[][] table,int row_cursor,int col_cursor,byte[] format) {
    int i;
    for(i=0;i+row_cursor<table.length && i<format.length;i++) {
      if(table[row_cursor+i][col_cursor]!=format[i]) {
        return false;
      }
    }

    return i==format.length;
  }

  static boolean matches_diagonally_right(byte[][] table,int row_cursor,int col_cursor,byte[] format) {
    int i;
    for(i=0;i+row_cursor<table.length && i+col_cursor<table[i].length && i<format.length;i++) {
      if(table[i+row_cursor][i+col_cursor]!=format[i]) {
        return false;
      }
    }

    return i==format.length;
  }

  static boolean matches_diagonally_left(byte[][] table,int row_cursor,int col_cursor,byte[] format) {
    int i,j;
    for(i=0,j=0;i+row_cursor<table.length && i<format.length && j+col_cursor>=0;i++,j--) {
      if(table[i+row_cursor][j+col_cursor]!=format[i]) {
        return false;
      }
    }

    return i==format.length && Math.abs(j)==format.length;
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

