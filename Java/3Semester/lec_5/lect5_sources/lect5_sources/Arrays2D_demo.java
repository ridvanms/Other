package lect5;


import java.util.Arrays;
import java.util.Random;

public class Arrays2D_demo {

	public static void main(String[] args) {
		//Брой редове и колони на правоъгълна матрица
		final int ROWS=2;
		final int COLS=3;
		
		//1.Дефиниция на правоъгълен двумерен масив,инициализиран 
		//по подразбиране - с нули за числовите масиви 
		int[][] mat= new int[ROWS][COLS];
		System.out.println(Arrays.toString(mat));
	    
		//Двумерният масив е масив от масиви
		for(int i=0; i<ROWS; i++) {
			System.out.printf("%s ->%s%n",
					mat[i], Arrays.toString(mat[i]));
		}
		
			
		//Извеждане на съдържанието на двумерен масив
		//Arrays.deepToString(масив)
		System.out.println("Масив mat");
		System.out.println(Arrays.deepToString(mat));

		
		//2.Двумерен масив с различен брой колони в отделните редове
		//инициализиран по подразбиране
		//2 студентски  групи с различен брой студенти
		int[][] marks= new int[2][];
		//1-ва група - 7 студента
		//2-ра група - 5 студента
		marks[0]= new int[7];
		marks[1] = new int[5];
		
		System.out.println("Масив marks");
		System.out.println(Arrays.deepToString(marks));
		
		//3. Дефиниция на инициализиран двумерем масив
		//new int[][] може да се пропусне
		double[][] prices = {{1.2, 6.7},
				             {5.8, 2.4, 9.5}
		                     };
		System.out.println("Масив prices");
		System.out.println(Arrays.deepToString(prices));
	
		
		//4. Обхождане със вложени цикли по индекс
		//запълване на масива marks със случайни оценки 
		
		for(int row=0; row<marks.length; row++) {
			for(int col=0; col<marks[row].length; col++) {
				marks[row][col] = new Random().nextInt(5)+2;
			}
		}
		
		System.out.println("Запълнен масив marks");
		System.out.println(Arrays.deepToString(marks));
		
		
		
		//5.Вложени цикли за диапазон enhanced for, range based for
		//само за четене
		//Изчисляване на общия среден успех
		int sum_marks=0;
		int count_students=0;
		for(int[] row:marks) {
			count_students+=  row.length;
			for(int mark:row) {
				sum_marks+=mark;
			}
		}
		double ave_grade= (double)sum_marks/count_students;
		System.out.printf("Брой студенти:%d Среден успех %5.2f%n",
				count_students, ave_grade);
		
		
	}

}