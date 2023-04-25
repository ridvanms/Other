#include <iostream>
#include <string>
using namespace std;

class Point {
	int x;
	int y;

public:
	//Констуктори
	Point() {
		x = 1;
		y = 2;
	}
	Point(int value) {
		x = y = value;
	}
	Point(int _x, int _y) {
		x = _x;
		y = _y;
	}
	~Point() {
		cout << "destructing( " << x << "," << y << ")\n";
	}

	void show() {
		cout << "(" << x << "," << y << ")\n";
	}

	//методи за достъп - гетери и сетери
	//гетер - чете стойност на скрито поле
	//сетер - задава КОРЕКТНА стойност на скрито поле

	int get_x() { return x; }
	int get_y() { return y; }

	void set_x(int new_x) {
		x = new_x;
	}
	void set_y(int new_y) {
		y = new_y;
	}

};

int main2() {
	system("chcp 1251>nul");
	//1.Създаване на обекти с конструктора по подразбиране
	Point p1;
	Point* p2 = new Point();
	cout << "Обекти, създадени с конструктора без параметри\n";
	cout << "p1:"; p1.show();
	cout << "*p2:"; p2->show();

	//2. Създаване на обекти с конструктора с 1 параметър
	Point  p3(7);
	Point* p4 = new Point(3);
	cout << "Обекти, създадени с конструктора с един параметър\n";
	cout << "p3:"; p3.show();
	cout << "*p4:"; p4->show();

	//3. Създаване на обекти с конструктора с 2 параметъра
	Point p5(4, 8);
	Point* p6 = new Point(1, 7);
	cout << "Обекти, създадени с конструктора с 2 параметра\n";
	cout << "p5:"; p5.show();
	cout << "*p6:"; p6->show();

	cout << "Изменение на текущите координати p5 и *p6 с 1\n";
	p5.set_x(p5.get_x() + 1);
	p5.set_y(p5.get_y() + 1);

	p6->set_x(p6->get_x() +1);
	p6->set_y(p6->get_y() + 1);
	cout << "p5:"; p5.show();
	cout << "*p6:"; p6->show();

	delete p2;
	delete p4; 
	delete p6;
	return 0;
}