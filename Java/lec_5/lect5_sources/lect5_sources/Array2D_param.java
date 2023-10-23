package lect5;

import java.util.Arrays;

public class Array2D_param {
	
	//метод, изчисляващ средния успех по групи
	// на поток студентски групи
	public static double[] averages(int[][] matrix) {
		 double[] result= new double[matrix.length];
		 
		 for(int group=0; group < matrix.length; group++) {
			 int sumMarksForGroup=0;
			 int countStInGroup =matrix[group].length;
			 for(int st=0; st<countStInGroup; st++) {
				sumMarksForGroup+= matrix[group][st] ;
			 }
			 result[group]=(double)sumMarksForGroup/countStInGroup;
		 }
		 return result;
	}

	public static void main(String[] args) {
		int[][] marks = {
				{4,5,6,6},
				{5,3,4,3,6},
				{6,3,4},
				{3,4,6,6,5,4}
		};
		
		//Съхраняване на резултата в масив
		double[] myAve= averages(marks);
		
		for(int gr=0; gr<marks.length; gr++) {
			System.out.printf("Група %d Брой студенти:%d Оценки:%s Среден успех:%4.2f%n",
					   gr+1, marks[gr].length, Arrays.toString(marks[gr]), myAve[gr]);
		}

	}

}
