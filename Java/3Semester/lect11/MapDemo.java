package lect11;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;
import static java.util.Map.entry;

public class MapDemo {
	public static void main(String[] args) {
		// 1a.Създаване на празен асоц. контейнер
		// съответствие име-години
		Map<String, Integer> persons= new HashMap<>();
//		Map<String, Integer> persons= new LinkedHashMap<>();
//		Map<String, Integer> persons= new TreeMap<>();

		// 2. Добавяне на елементи
		persons.put("Асен", 20);
		persons.put("Лора", 19);
		persons.put("Борис", 22);
		
		// 3. Извеждане на контейнера
		System.out.println(persons+", брой двойки k,v:"+persons.size());

		// 1b Създаване на инициализиран неизменяем асоциативен масив
		// До 10 елемента
		Map<String, Double> products= Map.of("мляко",2.5, "хляб", 3.2);
     
		// С произволен брой елементи import static java.util.Map.entry;
        Map<String, String> dict = Map.ofEntries(
        		   entry("куче", "dog"),
        		   entry("котка", "cat"),
        		   entry("лъв", "lion"),
        		   entry("агне", "lamb")
        		);
		// 1c.Създаване на инициализиран изменяем асоциативен масив
		// До 10 елемента
        Map<String, Double> products1= 
        		         new HashMap<>(Map.of("мляко",2.5, "хляб", 3.2));
		// С произволен брой елементи
        Map<String, String> dict1= new TreeMap<>(Map.ofEntries(
        		   entry("куче", "dog"),
        		   entry("котка", "cat"),
        		   entry("лъв", "lion"),
        		   entry("агне", "lamb")
        		));
        System.out.println(dict1);
		// 4.Замяна на стойността за даден ключ
		// put() при съществуващ ключ, replace()
         System.out.println(persons);
         persons.put("Асен", 25);
         persons.replace("Лора", 20);
         System.out.println("След промяната :"+persons);
         
		// 5. Изгледи колекции (Collection)
         System.out.println("Mножество от ключовете:"+persons.keySet());
         System.out.println("Списък  от стойностите:"+persons.values());
         System.out.println("Множество от двойки Map.Entry<String, Integer>:"
        		    +persons.entrySet());

		// 6. Цикли за обхождане на реализациите на Маp
		// 6а. Цикъл for за диапазон - прилага се към <map>.entrySet()
        System.out.println("Цикъл за диапазон");
         // for(Map.Entry<String, Integer> pair:  persons.entrySet())) //дълъг запис
         for(var pair: persons.entrySet()) {
        	 System.out.printf("%s е на %d години%n", 
        			 pair.getKey(), pair.getValue());
         }
         
         //Промяна на стойността с помощта на Маp.Entry<String, Integer>
         //метод setValue(), ключовете не се изменят
         for(var pair:persons.entrySet()) {
        	 pair.setValue(pair.getValue()+1);
        	 System.out.printf("След година %s ще е на %d години%n",
        			 pair.getKey(), pair.getValue());
         }
         

	
		// 6b. Цикъл по итератор  
         System.out.println("Цикъл по итератор");
 		//  Iterator <Map.Entry<String, Integer>> it= //явно зададен тип на итератора
 		//		             list.entrySet().iterator(); 
 		  var it=persons.entrySet().iterator();
 		  while(it.hasNext()) {
 		      var pair= it.next();
 		      System.out.println(pair.getKey()+"->"+pair.getValue());
 		  }
 		  

	
		// 7. Проверка дали елемент с даден ключ съществува
		// метод containsKey()
         System.out.print("Име?");
         String name= new Scanner(System.in).next();
         boolean res=persons.containsKey(name);
         System.out.println(name + " се съдържа като ключ?"+res);

		// 8. Tърсене в map (получаване на елемент със зададен ключ)
		// метод get() - връща стойността или null

		 System.out.println("Стойност(години) за "+name+ ":"+ persons.get(name));
		 
		 //9 Изтриване по ключ
		 System.out.println(persons);
		  System.out.print("Име за изтриване?");
	      name= new Scanner(System.in).next();
		 persons.remove(name);
		 System.out.println(persons);
		 

	}
}
