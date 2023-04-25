#include <iostream>
#include <string>
using namespace std;

class Point {
	int x;
	int y;

public:
	//�����������
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

	//������ �� ������ - ������ � ������
	//����� - ���� �������� �� ������ ����
	//����� - ������ �������� �������� �� ������ ����

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
	//1.��������� �� ������ � ������������ �� ������������
	Point p1;
	Point* p2 = new Point();
	cout << "������, ��������� � ������������ ��� ���������\n";
	cout << "p1:"; p1.show();
	cout << "*p2:"; p2->show();

	//2. ��������� �� ������ � ������������ � 1 ���������
	Point  p3(7);
	Point* p4 = new Point(3);
	cout << "������, ��������� � ������������ � ���� ���������\n";
	cout << "p3:"; p3.show();
	cout << "*p4:"; p4->show();

	//3. ��������� �� ������ � ������������ � 2 ����������
	Point p5(4, 8);
	Point* p6 = new Point(1, 7);
	cout << "������, ��������� � ������������ � 2 ���������\n";
	cout << "p5:"; p5.show();
	cout << "*p6:"; p6->show();

	cout << "��������� �� �������� ���������� p5 � *p6 � 1\n";
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