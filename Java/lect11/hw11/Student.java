import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class Student {
  private String name;
  private Map<String, Integer> exams;

  public Student(String name) {
    this.name = name;
    this.exams = new HashMap<>();
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void addExam(String name, Integer mark) {
    exams.put(name, mark);
  }

  public boolean checkExam(String examName) {
    return exams.containsKey(examName);
  }

  public void updateMark(String name, Integer mark) {
    if (exams.containsKey(name)) {
      exams.put(name, mark);
    }
  }

  public int countExamsWithGivenMark(int mark) {
    int count = 0;
    for (Integer examMark : exams.values()) {
      if (examMark == mark) {
        count++;
      }
    }
    return count;
  }

  public Set<String> examsList() {
    return exams.keySet();
  }

  public double aveGrade() {
    if (exams.isEmpty()) {
      return 0.0;
    }
    int sum = 0;
    for (Integer mark : exams.values()) {
      sum += mark;
    }
    return (double) sum / exams.size();
  }

  public boolean isBetter(Student other) {
    return this.aveGrade() > other.aveGrade();
  }

  public boolean sameTakenExams(Student other) {
    return this.exams.keySet().equals(other.exams.keySet());
  }

  public Set<String> commonExams(Student other) {
    Set<String> commonExams = new HashSet<>(this.exams.keySet());
    commonExams.retainAll(other.exams.keySet());
    return commonExams;
  }
  @Override
  public String toString() {
    return "Student{" +
        "name='" + name + '\'' +
        ", exams=" + exams +
        '}';
  }
}
