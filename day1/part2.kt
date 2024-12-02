import java.io.File;
import java.util.*;




fun main() {
  var file=File("./input.txt");
  var sc=Scanner(file);
  var left=Vector<Int>();
  var right=Vector<Int>();

  while(sc.hasNextLine()) {
    var pair=sc.nextLine().split("   ");
    left.add(Integer.parseInt(pair[0]));
    right.add(Integer.parseInt(pair[1]));
  }

  var similarity_score=0;

  for(i in left) {
    var count=0;
    for(j in right) {
      if(i==j) count++;
    }

    similarity_score+=i*count;
  }

  println(similarity_score);
}





