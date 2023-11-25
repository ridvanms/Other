package lect8;

public class TestInterfaces {

	public static void main(String[] args) {
		//Референция от типа на интерфейса
		Greetable gRef;
		//gRef= new Bulgarian();
		gRef= new Italian();
		gRef.hello();
		gRef.bye();
		
		//Полиморфизъм чрез интерфейси
		//Koнтейнер от типа на интерфейса
		//запълва се с обекти от класове, реализиращи интерфейса
		
		Greetable[] persons= { new Bulgarian(), 
				               new Italian(),
				               new English()
		};
		
		System.out.println("Масив persons");
		for (Greetable ref:persons) {
			ref.hello();
			ref.bye();
		}

	}

}
