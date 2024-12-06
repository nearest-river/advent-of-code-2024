using System.Linq;

class Part2 {
  public static void Main(string[] args) {
    int safe_count=0;
    var lines=System.IO.File.ReadAllLines("./input.txt");
    foreach(var line in lines) {
      var report=line.Split(" ")
      .Select(Int32.Parse)
      .ToList();

      if(Part2.IsSafe(report)) {
        safe_count++;
        continue;
      }

      for(var i=0;i<report.Count;i++) {
        var report_clone=report.ToList();
        report_clone.RemoveAt(i);

        if(Part2.IsSafe(report_clone)) {
          safe_count++;
          break;
        }
      }
    }

    System.Console.WriteLine(safe_count);
  }

  private static bool IsSafe(List<int> report) {
    bool increasing=true;
    for(int i=0;i<report.Count-1;i++) {
      var delta=report[i+1]-report[i];

      if(delta==0 || Math.Abs(delta)>3) {
        return false;
      }

      if(i==0) {
        increasing=delta>0;
        continue;
      }

      if(increasing!=delta>0) {
        return false;
      }

      increasing=delta>0;
    }
    
    return true;
  }
}



