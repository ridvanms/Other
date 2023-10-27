package lect6;

public class Person1 {
    private String name;
    private int age;
	public Person1(String name, int age) {

		this.name = name;
		this.age = age;
	}
	public Person1() {
		this("Иван", 20); //this(parametri)- 
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	@Override
	public String toString() {
		return "Person1 [name=" + name + ", age=" + age + "]";
	}
	
	
}
