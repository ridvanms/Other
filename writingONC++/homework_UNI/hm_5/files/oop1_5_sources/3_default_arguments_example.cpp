#include <iostream>
#include <string>

using namespace std;

void errorLog(string message = "error", bool cls = false, bool red = false);


int main3()
{
    system("chcp 1251>nul");
 
    errorLog();
    cout << "����������  �� 3 ��������� �� ������������\n";
    cin.get();

    errorLog("������ �� � �������");
    cout << "������� � ���� 1-��  ��������, 2 � 3 �� ������������\n";
    cin.get();

    errorLog("��������� ��������", true);
    cout << "�������� �� ���� 1-�� � 2-�� ���������,  3 �� ������������\n";
    cin.get();
  
    errorLog("������� �� ����", true, true);
    cout << "�������� �� ���� ������  ���������\n";

    //visual basic
    //errorLog(, true); //C++ - ne

    return 0;

}

void errorLog(string message, bool cls , bool red )
{
    if (cls) system("cls");
    if (red) system("color 04");
    cout << message << endl;
}