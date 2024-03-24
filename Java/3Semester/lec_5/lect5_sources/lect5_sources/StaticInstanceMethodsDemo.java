package lect5;

class someClass {
	//статичен метод
	public static void method1() {
		System.out.println("Статичен метод на someClass");
	}
	public void method2() {
		System.out.println("Метод на обектите на someClass");
	}
}


public class StaticInstanceMethodsDemo {
	public static void method3() {
		System.out.println("Статичен метод в класа на main()");
	}

	public static void main(String[] args) {
		//1.Извикване на статичен метод
		//<име на клас>.<име на метод>([параметри]
		someClass.method1();
	
		//за класа на main() името на класа може да се пропусне
		//StaticInstanceMethodsDemo.method3();
		method3();
	
		
		
		//2.Извикване на методи на инстанциите (обектите)
		//<обект>.<име на метод>([параметри])
		//обектът може да е именуван или анонимен
		
	     //2а.Създаване на обект и извикване на метод
		someClass obj= new someClass();
		obj.method2();
		
		//2b.Извикване на метод чрез анонимен обект
		new someClass().method2();
		
		
	}
	
}
