package lect3;

public class StringBufferDemo {

	public static void main(String[] args) {
		StringBuilder sb= new StringBuilder("Programing in java!");
       
		int j_idx= sb.indexOf("j");
		System.out.println(sb);
		//Промяна на символ
		sb.setCharAt(j_idx, 'J');
		System.out.println(sb);
		
		//Вмъкване на символи
		int space2 = sb.indexOf(" ", sb.indexOf(" ")+1);
		sb.insert(space2+1,  "C++, ");
		System.out.println(sb);
		
		//Добавяне
		sb.append(" and Python");
		System.out.println(sb);
		
		
	}

}
