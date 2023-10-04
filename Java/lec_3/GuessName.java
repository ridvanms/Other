package lect3;

import java.io.File;
import java.io.IOException;
import java.util.Scanner;

public class GuessName {

	public static void main(String[] args) throws IOException {
		String fname; //файл, съдържащ името за познаване
		Scanner  sc= new Scanner(System.in);
		System.out.print("File with the name ");
		fname= sc.next();
		
		File f= new File(fname);
		
		if( !f.exists()) {
			System.err.println(fname+ " не е намерен");
			System.exit(1);
		}
		
		Scanner sf= new Scanner(f);
		String name= sf.next(); //Прочитане на името от файла
		
		//gname - познаваното име, запълваме го със *
		StringBuffer gname=new StringBuffer(name);
		for(int i=0; i<gname.length(); i++) {
	      gname.setCharAt(i, '*');
		}
		
	  System.out.println("Guess the name of 5 guesses");
	  
	   for(int i=1; i<=5; i++) {
		   System.out.println(gname);
		   System.out.print("Add letter: ");
		   char c=sc.next().trim().charAt(0); //въведена буква
		   c=Character.toLowerCase(c);//буква в долен регистър
		   
	   boolean found=false;
	   for(int j=0; j<gname.length(); j++) {
		   char cj=name.charAt(j); // буква в позиция j в името
		   if(c==Character.toLowerCase(cj)) {
			   gname.setCharAt(j, cj);
			   found=true;
		   }  
	   }
	   if(found==false) 
		    System.out.println(c+" It's not include in the name");
		   
	   }
	   
	   System.out.println(gname);
	   System.out.println("Enter the whole number with capital letter ");
	   String fullname= sc.next();
	   if(fullname.equals(name)) {
		   System.out.println("Wow! You Guessed");
	   }
	   else {
		   System.out.println("Sorry! the name was "+ name);
	   }

	}

}
