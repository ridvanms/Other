package lect6;

public class UseStudent {

	public static void main(String[] args) {
		Student s1 = new Student();
		System.out.println(s1);
		s1.setMarks(new int[] {4,5, 5,6,3});
		System.out.println(s1);
		
		Student s2= new Student("Асен", 3, new int[] {5,6,6});
		System.out.println(s2);
		
		s2.setMark(3, 4);
		s2.setMark(0, 1);
		s2.setMark(0, 6);
		System.out.println(s2);
	}

}
