import java.util.Arrays;
import java.util.Scanner;
import java.util.Random;

public class HW11_RidvanSaraliev_si647 {
  public static void main(String[] args) {
    Student student1 = new Student("Ivan");
    Student student2 = new Student("Maria");
    Student student3 = new Student("Petur");

    student1.addExam("Art", 5);
    student1.addExam("Electro", 3);
    student1.addExam("Math", 5);
    
    student2.addExam("Nature", 4);
    student2.addExam("History", 2);
    student2.addExam("History", 4);
    
    student3.addExam("History", 6);
    student3.addExam("Physic", 6);
    student3.addExam("Math", 6);

    System.out.println("Exams of the first student: " + student1.examsList());
    System.out.println("Exams of the second student: " + student2.examsList());
    System.out.println("Exams of the third student: " + student3.examsList());

    System.out.println("Average grade of student 2: " + student2.aveGrade());
    System.out.println("Counts of exams with 6 on student 3: " + student3.countExamsWithGivenMark(6));
    System.out.println("Student 1 is better than student 2: " + student1.isBetter(student2));
    System.out.println("Student 1 and student 3 are with same taken exams: " + student1.sameTakenExams(student3));
    System.out.println("Total exams between student 2 and student 3: " + student2.commonExams(student3));
  }
}