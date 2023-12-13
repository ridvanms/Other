package lect10;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Scanner;

public class ArrayListDemo {

	public static void main(String[] args) {
	//1a. Създаване на празен АrrayList
	 ArrayList<Integer> nums= new ArrayList<>();
	 List<Integer> nums1= new ArrayList<>(); //Препоръчително
	 
	//1b. Инициализирани обекти АrrayList
	 List<Integer> nums2= new ArrayList<>(Arrays.asList(1,3,5));
	 List<Integer> nums3= new ArrayList<>(List.of(1,2,3,4));
				
	//2. Извеждане
	 System.out.println("nums1="+nums1);	
	 System.out.println("nums3="+nums3);
		   
		
	//3. Текущ размер на списъка - size()
	 System.out.println("nums1.size()="+nums1.size());
	 System.out.println("nums3.size()="+nums3.size());
		
	//4. Достъп до елемент в колекцията - <collection>.get(<index>);
	 System.out.println("Първи елемент:"+nums3.get(0));
	 System.out.println("Последен елемент:"+nums3.get(nums3.size()-1));
				
	 //5. Промяна на стойност на елемент в колекцията 
	 //<collection>.set(<index>, <value>);
	 //първи елемент- 7
	   nums3.set(0, 7);
	 //Увеличаване на 2-я елемент с 10
	 nums3.set(1, nums3.get(1)+10);   
	 System.out.println("След промяната nums3="+nums3);		
			
				
	  //6. Добавяне на елементи в края 
		//<collection>.add(<value>);
		 //<collection>.addAll(<collection>);
	   nums1.add(1);
	   nums1.add(9);
	   nums1.add(4);
	   nums3.addAll(nums1);
	   System.out.println("След добавянето");
	   System.out.println("nums1="+nums1);
	   System.out.println("nums3="+nums3);
			
	    //Обхождане с цикли
		//7а.Цикъл for по индекс
	   for(int i=0; i<nums3.size();i++) {
		   nums3.set(i, nums3.get(i)+1); //Увеличаваме елемените с 1
	   }
						
				
		//7b Цикъл за диапазон (foreach, range based for, enhanced for
		//Само за четене
	   for(Integer num:nums3) { //for (var num:nums3)
		   System.out.print(num+ " ");
	   }
	   System.out.println();
				
		//7c Цикъл по итератор
	  Iterator<Integer> it = nums3.iterator();  //var it= nums3.iterator();
	  while(it.hasNext()) {
		  System.out.print(it.next()+" ");
	  }
	  System.out.println();
						
		//8c  Премахване на елементи
		//<container>.remove(index) //за Integer само този вариант
		//<container>.remove(<value>)
	    nums3.remove(3);
	    System.out.println("След премахването:"+nums3);
								
				
		 //9.Tърсене  <collection>.indexOf(<value>) -
	    //връща индекса на елемента или -1, ако го няма
		 //  <collection>.contains(<value>); - връща true или false
		 System.out.print("Число за търсене?");
	    Integer snum= new Scanner(System.in).nextInt();
	    
	     System.out.println(nums3.contains(snum));
	     
	     int snum_idx= nums3.indexOf(snum);
	     if(snum_idx!=-1) {
	    	 System.out.printf("%d се съдържа в позиция %d%n",
	    			 snum,snum_idx);
	     }
	     else {
	    	 System.out.println(snum+" не се съдържа в списъка nums3");
	     }
	    
		
	    //Помощния (utility) клас Collections съдържа 
	     //статични методи за работа с колекции - 
	     //Collections.min(<колекция>)
	     //Collections.sort(<списък>))
			
	      // 10. Минимална и максимална стойност
	     System.out.println("Минимум:"+Collections.min(nums3));
	     System.out.println("Минимум:"+Collections.max(nums3));
	     //Класовете  трябва да реализират интерфейса Comparable<T>
	     
		 //11. Сортиране по подразбиране
	     Collections.sort(nums3);
	     System.out.println("Сортиран по подразбиране:"+ nums3);
		 //12. Сортиран в обратен ред
	     Collections.sort(nums3, Collections.reverseOrder());
	     System.out.println("Сортиран в обратен ред:"+nums3);
			
				  
				

	}

}
