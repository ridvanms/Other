package lect9;

public class GenMethods {
	
	@SuppressWarnings("deprecation")
	public static void main(String[] args) {
		Object objRef;
		objRef= 7;
		objRef= new Integer(19);
		objRef= new Double(1.4);
		objRef= new String("abw");
		Object[] arr = {1,2,3};
		int sum=0;
		for(var el:arr) {
			sum+= (int)el;
		}
		System.out.println("sum="+sum);
		
		arr[0]="sss"; //променяме типа на 1-ви елемент
		sum=0;
//		for(var el:arr) {  
//			sum+= (int)el;  //ClassCastException
//		}
//		
		System.out.println("Тест на обобщените методи");
		Integer[] arr1= {10,20,30};
		Float[] arr2= {1.1f, 2.2f, 3.3f};
        Double[] arr3= {1.7, 2.1, 3.5};
        
        
        System.out.println(arr1.getClass().getName());
        printArr(arr1);
        System.out.println("sum1="+sumArr(arr1));
        
        System.out.println(arr2.getClass().getName());
        printArr(arr2);
        System.out.println("sum2="+sumArr(arr2));
  
        System.out.println(arr3.getClass().getName());
        printArr(arr3);
        System.out.println("sum3="+sumArr(arr3));
        
        
        
	}
	
	public static <T> void printArr(T[] list) {
		for (T el: list) {
			 System.out.printf("%s ", el);
		}
		System.out.println();
	}
	
	public static <T extends Number> double sumArr(T[] list) {
		double sum=0;
		for (T el: list) {
			sum+= el.doubleValue();
		}
		return sum;
	}

}