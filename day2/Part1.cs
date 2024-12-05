

class Part1 {
  public static void Main(string[] args) {
    int safe_count=0;
    var lines=System.IO.File.ReadAllLines("./input.txt");
    foreach(var line in lines) {
      var report=line.Split(" ");
      bool increasing=true;
      for(uint i=0;i<report.Length-1;i++) {
        var level1=Int32.Parse(report[i]);
        var level2=Int32.Parse(report[i+1]);
        var delta=level2-level1;

        var abs_dif=Math.Abs(delta);
        if(abs_dif<1 || abs_dif>3) {
          safe_count--;
          break;
        }

        if(i==0) {
          increasing=delta>0;
          continue;
        }

        if(increasing!=delta>0) {
          safe_count--;
          break;
        }

        increasing=delta>0;
      }
      safe_count++;
    }


    System.Console.WriteLine(safe_count);
  }
}



