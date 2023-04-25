#include <iostream>
#include <string>
using namespace std;

//Структура в стил С- само с член-данни
struct person {
	string name;
	int age;
};
//За работа със С-структурата се използват външни функции
void show(person p)  //извежда структурна променлива person
{
  cout << p.name << " на " << p.age << " години\n";
}

void changeAge(person& p, int byAge) {
	p.age += byAge;
}


//Клас Person - функциите за работа с обектите Person
//са ЧАСТ от типа
class Person {
	string name;
	int age;
public:
	//конструктори
	Person() {
		name = "Иван";
		age = 10;
	}
	Person(string _name, int _age) {
		name = _name;
		age = _age;
	}
	//get()  & set()
	string get_name() { return name; }
	void set_name(string new_name) { name = new_name; }
	int get_age() { return age; }
	void set_age(int new_age) { age = new_age; }
	//други методи
	void show()  //извежда обект Person
	{
		cout << name << ","<< age << endl;
	}

	void changeAge(int byAge) {
		age += byAge;
	}
};

int main() {
	system("chcp 1251>nul");
	//1а.Създаване на неинициализирани обекти
	person ps_1; //s идва от struct
	Person pc_1;  //c идва от клас

	//1b.Създаване на инициализирани обекти
	person ps_2{ "Асен", 19 };
	Person pc_2{ "Диана", 21 }; //Трябва да е дефиниран
	                           //конструктор с 2 параметъра

	//2. Извеждане на стойност на поле
	//При структурните променливи се обръщаме ДИРЕКТНО към полето
	cout << "ps_1,  age=" << ps_1.age << endl;
	//При обектите използваме ГЕТЕР
	cout << "pc_1,  age=" << pc_1.get_age() << endl;

	//3.  Задаване на стойност на поле
   //При структурните променливи се обръщаме ДИРЕКТНО към полето
	ps_1.name = "Васил";
	ps_1.age = 15;
	//При обектите използваме СЕТЕР
	pc_1.set_name("Мария");
	pc_1.set_age(13);

	//4. При C-структурите използваме вънщни функции
	// структурната променлива се подава като параметър
	//трябва да се използва подходящ механизъм
	cout << "Структурни променливи\n";
	cout << "ps_1:"; show(ps_1);
	cout << "ps_2:"; show(ps_2);
	//Изменение на годините с 2
	changeAge(ps_1, 2);
	changeAge(ps_2, 2);
	cout << "ps_1 след 2 години:"; show(ps_1);
	cout << "ps_2 след 2 години:"; show(ps_2);
	//За обектите използваме член-функции
	cout << "Oбекти\n";
	cout << "pc_1:"; pc_1.show();
	cout << "pc_2:"; pc_2.show();
	//Изменение на годините с 5
	pc_1.changeAge(5);
	pc_2.changeAge(5);
	cout << "pc_1 след 5 години:"; pc_1.show();
	cout << "pc_2 след 5 години:"; pc_2.show();
}

