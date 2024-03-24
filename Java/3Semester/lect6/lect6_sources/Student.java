package lect6;

import java.util.Arrays;

public class Student {
   private String name;
   private int course;
   private int exams_count; //брой взети изпити
   private int[] marks; 
   
   //1.Kонструктори
   public Student() {
	   name="Стефан";
	   course =1;
	   exams_count=3;
	   marks= new int[exams_count];
	  // marks= new int[] {3,3,3};
   }
   public Student(String n, int c, int count) {
	   name=n;
	   course=c;
	   exams_count=count;
	   marks= new int[exams_count];
   }
   
   public Student(String n, int c, int[] _marks) {
	   name=n;
	   course= c;
	   exams_count=_marks.length;
	   marks= Arrays.copyOf(_marks, exams_count);
   }
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public int getCourse() {
	return course;
}
public void setCourse(int course) {
	this.course = course;
}
public int[] getMarks() {
	return marks;
}
public void setMarks(int[] _marks) {
    exams_count= _marks.length;
    marks= Arrays.copyOf(_marks, exams_count);
}
   
//Сетер, който променя отделна оценка
public void setMark(int index, int new_mark) {
	try {
		if(index<0 || index>=marks.length ) {
			throw new IllegalArgumentException("Индексът трябва да е между 0 "+
		               (marks.length-1));
		}
		if(new_mark<2 ||new_mark >6) {
			throw new IllegalArgumentException("Оценката е 2-6");
		}
		marks[index]=new_mark;
	}
	catch(Exception e) {
		System.out.println(e.getMessage());
	}	
}
@Override
public String toString() {
	return name+" курс:"+course+", брой изпити:"+exams_count+
			"\nОценки:"+ Arrays.toString(marks);
}


   
}
