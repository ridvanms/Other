#include <iostream>
using namespace std;

int main2()
{
 
    const int SIZE{ 4 };
    int arr[SIZE]{ 1,2,3,4 };

    cout << "nachalen adres na masiva:" << arr
        << " " << &arr[0] << endl;

    int* p3 = arr + 2;
    cout << *p3 << " " << p3[0] << endl; //3
    cout << *(p3 - 1) << " " << p3[-1] << endl;//2
    cout << *(p3 + 1) << " " << p3[1] << endl;//4

    //����� �� ��������� �� ����� � �����
    //1.����� �� ������ - 0 �� SIZE-1
    cout << "index loop\n";
    for (int i{ 0 }; i < SIZE; i++) {
        cout << arr[i] << " " << *(arr + i) << endl;
    }
    cout << endl;

    //2.����� �� ��������
    //���������� �������� �� arr �� arr+SIZE-1
    //arr++; //ne!
    cout << "pointer loop\n";
    for (int* p{ arr }; p < arr + SIZE; p++) {
        cout << *p << " ";
    }
    cout << endl;

    //3. ����� for �� ��������
    //range based for, enhanced for

    //� ���������, � ����� � ��������� ������ �����
    //��� ���� ������� ��
    cout << "range based for\n";
    for (int element : arr) {
        cout << element << " ";
    }
    cout << endl;

    //� ���������� sizeof �� ����� ������ ������ ��
    //�������� �����
    cout << arr << endl; //��������
    cout << sizeof(arr) << "B\n"; //��������� �����

    //������� �� 2 ��������� - ���� �������� �/� ���
    cout << "p3- arr=" << p3 - arr << endl;

    return 0;
}