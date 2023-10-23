package lect5;

import java.util.Arrays;

public class Array1D_param {
	//метод, преброяващ елементите на масив
	// по-големи от зададена като параметър стойност
	public static int countBigs(int[] array, int value) {
		int result=0;
		for(int el:array) {
			if(el>value) result++;
		}
		return result;
	}

	public static void main(String[] args) {
		int[] salaries = {980, 1200, 700, 2100};
		System.out.println("Списък заплати:"+Arrays.toString(salaries));
		System.out.println("Брой заплати над 1000 лв:"+
		         countBigs(salaries, 1000));
	}

}
