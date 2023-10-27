package lect6;

public class VariableLengthArgs {
    //Метод за сумиране на произволен брой числа
	public static int sumAll(int...nums) {
		int sum=0;
		for(int i=0; i<nums.length; i++) {
			sum+=nums[i];
		}
		return sum;
	}
	
	//Meтод за формиране на списък от имена
	public static String makeList(String ... names) {
		StringBuilder list= new StringBuilder();
		for(String name:names) {
			list.append(name+"\n");
		}
		return list.toString();
	}
	
	public static void main(String[] args) {
	    System.out.println("Тест на sumAll()");
	    int sum1=sumAll();
	    System.out.println(sum1); //0 
	    int sum2= sumAll(1, 10, 100);
	    System.out.println(sum2+" "+sumAll(1,5,10, 20)); //111 36
	    int sum3= sumAll(new int[] {1,3,5,7});
	    System.out.println(sum3);
	    
	    System.out.println("\nТест на makeList()");
	    String[] gr1 = {"Иван", "Росица", "Петър"};
	    String list1= makeList(gr1);
	    String list2= makeList("Ана", "Стела", "Диан", "Ангел");
	    System.out.println(list1);
	    System.out.println(list2);
	    

	}

}
