
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Random;
import java.util.Scanner;

public class WriteReadFileDemo {

	public static void main(String[] args)  {
		
		//1. Декларираме обекти за запис PrintWriter
		PrintWriter pw1= null;
		PrintWriter pw2= null;
		try {
			pw1 = new PrintWriter(new FileWriter("marks1.dat")); //запис със заместване
			pw2 = new PrintWriter(new FileWriter("marks2.dat", true));//запис с добавяне
			
			Random rg= new Random();
			
			//Случаен брой оценки 2-5
			int count = rg.nextInt(4)+2;
			
			//Цикъл по запис във файла
			for(int i=1; i<=count; i++) {
				int randMark= rg.nextInt(5)+2;
				
				//запис във файловете
				pw1.print(randMark+" ");
				pw2.print(randMark+" ");
			}
			System.out.println("Записани "+count +" oценки в marks1.dat");
			System.out.println("Добавени "+count + " oценки в marks2.dat");	
			
		}
		catch (IOException e) {
			e.printStackTrace();
		}
		finally {
			if(pw1 != null) pw1.close();
			if(pw2 != null) pw2.close();
		}
		
		//четене на данните от файловете
		System.out.println("Файл за четене?");
	    String filename = new Scanner(System.in).next();
	    
	    try {
	    	Scanner sf = new Scanner(new File(filename));
	    	
	    	int total = 0; //сума на оценките
	    	int count1= 0; //брой на оценките
	    	
	    	//четене от файл с неизвестен брой елементи (записи)
	    	while(sf.hasNext())//докато има следващи данни във файла
	    	{
	    		int mark= sf.nextInt();
	    		System.out.print(mark+" ");//eхо печат на екрана
	    		total += mark;
	    		count1++;
	    	}
	    	double aveGrade= (double)total/count1;
	    	System.out.printf("%nСреден успех %5.2f oт %d изпита%n", 
	    			        aveGrade, count1);
	    }
	    catch (FileNotFoundException e){
	    	System.out.println("Файлът "+filename+ " не е намерен");
	    }
		

	}

}
