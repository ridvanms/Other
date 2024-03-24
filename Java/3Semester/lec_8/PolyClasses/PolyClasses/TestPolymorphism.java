package lect8;

import java.util.Scanner;

public class TestPolymorphism {

	public static void main(String[] args) {
	   Can canRef;
	   
	   System.out.print("1.Can\n2.FullCan\nИзберете 1 или 2:");
	   int choise= new Scanner(System.in).nextInt();

	   switch(choise) {
	    case 1: canRef= new Can();break;
	    case 2: canRef= new FullCan(); break;
	    default: canRef= new Can();
	   } 
	   
	   //Полиморфизъм
	   System.out.println(canRef.getClass().getName());
	   System.out.println(canRef.toString()); //toString() може да се проп
	
	
	   //2 вариант на използване на полиморфизъм
	   //Контейнер от типа на супер класа, запълен с обекти
	   //от йерархията на наследяването му
	   Can[] list = {new Can(), new Can(0.04, 0.15),
			         new FullCan(), new FullCan(0.025, 0.13, "oлио", 800)};
	   System.out.println("\nСписък");
	   for(Can c:list) {
		   System.out.println(c.getClass().getName());
		   System.out.println(c); //c.toString()
		   System.out.printf("Обем %7.4f%n", c.volume());
		   if( c instanceof FullCan) //c сочи обект FullCan
		   {
			   FullCan fullCanRef=(FullCan)c;
			   System.out.printf("Тегло %6.2f%n",fullCanRef.weight());
		   }
		   
	   }
	}

}
