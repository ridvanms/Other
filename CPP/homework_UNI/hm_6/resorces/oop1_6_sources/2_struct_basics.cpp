#include <iostream>
#include <string>
using namespace std;

//1.��������� �� ���������  - �������� ��� � �������� �� ��������
struct student {
    string name;  // ����-����� (������)
    int course;
    double grade;
};


int main2()
{
    //2. ���������� �� ����� ���
    //2� - ���������������� ���������� student
    student s1;
    //2b - �������������� ���������� student
    student s2{ "Ivan", 1, 5.6 };

    //2c ������ �� �������� �� ���������� ����������
    // <��� �� ���������� ����������>.<����>
    s1.name = "Ana";
    s1.course = 2;
    s1.grade = 3.8;

    cout << s2.name << ", " << s2.course << ", " << s2.grade << endl;

    //2d - �������� ��� ���������� ���� - ���������������
    student* s3 = new student;
    (*s3).name = "Vasil";
    s3->course = 2;
    s3->grade = 5.2;

    //2d - �������� ��� ���������� ���� -�������������
    student* s4 = new student{ "Dimo", 1, 4.8 };
	
	//������� ����� �� ������������ ����������
    cout << sizeof s1 << " " << sizeof s2 << " "
        << sizeof *s3 << " " << sizeof *s4 << endl;


    cout << sizeof(string) << endl; 
    return 0;
}