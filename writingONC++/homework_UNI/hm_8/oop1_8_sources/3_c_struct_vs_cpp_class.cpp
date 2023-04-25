#include <iostream>
#include <string>
using namespace std;

//��������� � ���� �- ���� � ����-�����
struct person {
	string name;
	int age;
};
//�� ������ ��� �-����������� �� ��������� ������ �������
void show(person p)  //������� ���������� ���������� person
{
  cout << p.name << " �� " << p.age << " ������\n";
}

void changeAge(person& p, int byAge) {
	p.age += byAge;
}


//���� Person - ��������� �� ������ � �������� Person
//�� ���� �� ����
class Person {
	string name;
	int age;
public:
	//������������
	Person() {
		name = "����";
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
	//����� ������
	void show()  //������� ����� Person
	{
		cout << name << ","<< age << endl;
	}

	void changeAge(int byAge) {
		age += byAge;
	}
};

int main() {
	system("chcp 1251>nul");
	//1�.��������� �� ���������������� ������
	person ps_1; //s ���� �� struct
	Person pc_1;  //c ���� �� ����

	//1b.��������� �� �������������� ������
	person ps_2{ "����", 19 };
	Person pc_2{ "�����", 21 }; //������ �� � ���������
	                           //����������� � 2 ����������

	//2. ��������� �� �������� �� ����
	//��� ������������ ���������� �� �������� �������� ��� ������
	cout << "ps_1,  age=" << ps_1.age << endl;
	//��� �������� ���������� �����
	cout << "pc_1,  age=" << pc_1.get_age() << endl;

	//3.  �������� �� �������� �� ����
   //��� ������������ ���������� �� �������� �������� ��� ������
	ps_1.name = "�����";
	ps_1.age = 15;
	//��� �������� ���������� �����
	pc_1.set_name("�����");
	pc_1.set_age(13);

	//4. ��� C-����������� ���������� ������ �������
	// ������������ ���������� �� ������ ���� ���������
	//������ �� �� �������� �������� ���������
	cout << "���������� ����������\n";
	cout << "ps_1:"; show(ps_1);
	cout << "ps_2:"; show(ps_2);
	//��������� �� �������� � 2
	changeAge(ps_1, 2);
	changeAge(ps_2, 2);
	cout << "ps_1 ���� 2 ������:"; show(ps_1);
	cout << "ps_2 ���� 2 ������:"; show(ps_2);
	//�� �������� ���������� ����-�������
	cout << "O�����\n";
	cout << "pc_1:"; pc_1.show();
	cout << "pc_2:"; pc_2.show();
	//��������� �� �������� � 5
	pc_1.changeAge(5);
	pc_2.changeAge(5);
	cout << "pc_1 ���� 5 ������:"; pc_1.show();
	cout << "pc_2 ���� 5 ������:"; pc_2.show();
}

