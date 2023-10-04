package lect3;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;

public class TryWithResourcesDemo {

	public static void main(String[] args) {
     
		try (Scanner sf = new Scanner(new File("names.txt"));
			 PrintWriter pw= new PrintWriter(new FileWriter("names_copy.txt"))		
			)
		{
			while(sf.hasNext()) {
				String row = sf.nextLine();
				pw.println(row);
			}
			System.out.println("Файлът е копиран");
		}
		catch (IOException e) {
			e.printStackTrace();
		}
 
	}

}
