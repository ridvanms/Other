#include <iostream>
using namespace std;

struct place4all {
    double d;
    int i;
    char c;
};

union one4all {
    double d;
    int i;
    char c;
};

int main3()
{
    system("chcp 1251>nul");
    cout << "������ �� struct place4all: " << sizeof(place4all) << endl; //16
    cout << "������ �� union one4all: " << sizeof(one4all) << endl; //8
    cin.get();

    //� ����� ������ ���� �� �� �������� ���� ��
    //�������� �� ������������
    one4all uvar;
    uvar.c = '�';
    cout << "uvar.c=" << uvar.c << endl;

    uvar.d = 1.75e-14;
    cout << "uvar.d=" << uvar.d << endl;

    //������ ���
    cout << "\n���� ���������� �� ������ d �� one4all\n";
    cout << "uvar.c=" << uvar.c << endl; //������������

    return 0;
}
