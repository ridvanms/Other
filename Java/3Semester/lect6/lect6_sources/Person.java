package lect6;

public class Person {
    private String name;
    private int age;
    
    //1.Конструктори
    public Person()  //конструктор по подразбиране
    {
    	this.name="Иван"; //name="Иван"
    	this.age = 20; //аge=20
    	//в конструктора this е референция към създавания обект
    } //Използване: Person p1= new Person();
    public Person(String _name, int _age) //overload ctor с параметри
    { 
    	this.name=_name;
    	this.age=_age;
    } //Използване: Person p2= new Person("Ивайло", 19);
    
    //2. Meтоди за достъп до скрити полета get() и set()
    public String getName() {
    	return name;  //return this.name
    }
    public void setName(String new_name) {
    	if(new_name.length()>0) {
    		name=new_name;
    	}
    	else {
    		System.out.println("Името не може да е празно");
    	}
    }
    public int getAge() {
    	return age;
    }
    public void setAge(int new_age) {
    	if(new_age>=1 && new_age<=100) {
    		age=new_age;
    	}
    	else {
    		System.out.println("Възрастта трябва да е 1-100");
    	}
    }
    //3. toString()
	@Override
	public String toString() {
		return name+", "+age+" години";
	}
	
	//Специфичен метод
	public void addYears(int years) {
		age+=years;
	}
    
    
}
