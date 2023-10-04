package lect3;

public class StringDemo {
	
	public static void main(String[] args) {
		
		
		// 1.Създаване на обект String
		// 1a.Празен низ
	     String s1 = new String();
		   // съкратен еквивалетен оператор
         String s2 = "";
          
		// 1b.Инициализиран низ
	      String s3= new String("Ана");
	      // съкратен еквивалентен оператор
          String s4= "Петър";
         
		// 2.Дължина на низа - метод length()
         System.out.printf("%s съдържа %d букви%n", s4, s4.length());
		
		// 3.Достъп до определен символ
		// 3a. Вариант 1: метод charAt(index)
         System.out.println("Първа буква "+s4.charAt(0));
		
		// 3b.Вариант 2:преобразуване в масив от символи с toCharArray()
		// и операция []
		System.out.println("Последна буква:"+s4.toCharArray()[s4.length()-1]);

		// 4.Сливане на низове (конкатенация)
		// +, +=, concat()
	     s4 += " Иванов";
	     s4 = s4.concat(" Димов");
	     System.out.println(s4);

		// 5.Сравняване на низове
		// == - сравнява референциите
		// метод equals() - сравнява стойностите (values)
	     String city1 = new String("Бургас");
	     String city2= new String("Бургас");
	     System.out.println(city1+ " "+city2);
	     System.out.println("city1==city2?"+(city1==city2)); //false
	     System.out.println("city1.equals(city2)?"+ (city1.equals(city2))); //true
	     
		// 6.Търсене indexOf(search_str[,start_pos] )
		// връща индекса на първото срещане на търсения символ(стринг)
		// или -1, ако не се съдържа
		// без втори параметър - търси от началото, с втори- от start_pos
        System.out.println(s4);
        int firstSpaceIdx= s4.indexOf(" ");
        int secondSpaceIdx= s4.indexOf(" ",firstSpaceIdx+1 );
        		

		// 7.Oтделянe на подниз
		// Метод substring(start, end+1) - от start до end
		// substring(start) - от start до края
        String firstN= s4.substring(0, firstSpaceIdx);
        String lastN= s4.substring(secondSpaceIdx+1);
        
        System.out.println("Име:"+firstN);
        System.out.println("Фамилия:"+lastN);
		
	}

}
