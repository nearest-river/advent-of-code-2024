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

  Collections.sort(left);
  Collections.sort(right);

  var sum=0;
  var i=0;
  while(i<left.size) {
    sum+=Math.abs(right[i]-left[i]);
    i++;
  }

  println(sum);
}


