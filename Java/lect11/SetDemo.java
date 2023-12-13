package lect11;

import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.ArrayList;
import java.util.Arrays;

public class SetDemo {
	public static void main(String[] args) {
		// 1a.Създаване на празно множество
	Set<String> names= new HashSet();
    //	Set<String> names= new LinkedHashSet();
	//	Set<String> names= new TreeSet();
		
		// 4. Добавяне на елементи в множеството
				// методи add(), addAll()
				// Връща булева стойност - true, aко елементът е добавен, false - aко вече
				// присъства в множеството
		names.add("Иван");
		names.add("Петър");
		names.add("Диана");
		System.out.println(names.add("Лили")); //true
		System.out.println(names.add("Иван")); //false
		 //2. Извеждане на множество
		// 3. Брой елементи в множеството - метод size()
		
		System.out.printf("%s , брой елементи:%d%n", names, names.size());
		
		// 1b.Създаване на неизменяемо множество Set.of()
	    Set<String> countries= Set.of("България","Сърбия", "Гърция");
	    //countries.add("Турция");  //Exception ImmutableCollections...
	    //countries.remove("Сърбия");//Exception ImmutableCollections
		  
		// 1c.Създаване на инициализирано множество
		Set<Integer> counts= new HashSet<>(Set.of(5,1,4,9));
		counts.add(17);
		System.out.println("counts:"+counts);
	
		// 5. Премахване на елементи от множеството - метод remove()
		counts.remove(4);
		System.out.println("След remove(4) counts:"+counts);
        
		// 6. Aктуализиране на елемент - премахваме и добавяме новия елемент
        //Ана вместо Диана
		names.remove("Диана");
		names.add("Ана");
		System.out.println(names);
		
		// 6. Oбединение (Union)на две множества - set1.addAll(set2)
		Set<String> union=new HashSet(names);
		union.addAll(Set.of("Стефан", "Иван","Димо", "Ана"));
		System.out.println("\nUnion:"+union);

		// 7. Сечение (Intersection) на два множества - set1.retainAll(set2)
		Set<String> names2= new HashSet<>(Set.of("Васил", "Лили", "Алекс", "Петър"));
		Set<String> intersection= new HashSet<>(names);
		intersection.retainAll(names2);
		String fmt ="%s - %s%n";
		System.out.printf(fmt, "names:  ", names);
		System.out.printf(fmt, "names2: ", names2);
		System.out.printf(fmt, "сечение:", intersection);
		
		// 8. Разлика (Difference)на две множества -несиметрична set1.removeAll(set2)
		// премахва от set1 всички елементи, които се съдържат в set2 (несиметрична
		// операция)
	

		// 7. Проверка дали даден елемент присъства - метод contаins()
		System.out.println(names);
		System.out.println("Съдържа ли \"Ана\"?"+names.contains("Ана"));//true

		// 9. Проверка дали  множество-параметър е подмножество на даденото
		// set1.containsAll(set2)
		System.out.println("Съдържа ли \"Ана\" и \"Иван\"?"+
		          names.containsAll(Set.of("Ана", "Иван")));//true

		// 10. Обхождане
		// for за диапазон
		System.out.println("Цикъл за диапазон");
		for(String el:names) {
			System.out.println(el+" "+el.toUpperCase());
		}
		
		// цикъл по итератор
		System.out.println("Цикъл по итератор");
		Iterator<String> it = names.iterator();
		while(it.hasNext()) {
			System.out.print(it.next()+" ");
		}
		
	}
}
	
