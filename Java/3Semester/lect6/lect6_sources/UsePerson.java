package lect6;

public class UsePerson {

	public static void main(String[] args) {
		
       Person p1= new Person();
       System.out.println(p1);
       p1.setAge(101); //невъзможно
       System.out.println(p1);
       p1.setAge(19);
       System.out.println(p1);
       System.out.println("Име:"+p1.getName()+" Възраст:"+p1.getAge());
       
       Person p2 = new Person("Алекс", 21);
       System.out.println(p2);
       p2.addYears(3);
       p2.setName("");
       System.out.println(p2);
       
       
       Person1 p3= new Person1();
       Person1 p4= new Person1("Ана", 22);
       System.out.println(p3);
       System.out.println(p4);
       
	}

}
