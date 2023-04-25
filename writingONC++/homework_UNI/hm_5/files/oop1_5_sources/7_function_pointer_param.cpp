#include <iostream>
#include <string>
using namespace std;

//�������, ����� ������� ��������, �������� ���� ���������
// ����� ������ �������� �� ������
//����������� � �������� ��� �������, ����� ����� int
//� ��� ���� ��������� �� ��� int (���� �����)
void changeArray(int arr[], int n, int (*fp) (int)) {
    for (int i{ 0 }; i < n; i++) {
        arr[i] = fp(arr[i]);
    }
}
//�������, ����� �������� ������� � ����, 
// ������� � ����������-�������� ��� �������
int f1(int x) {
    return x + 1;
}
int f2(int x) {
    return x * 9;
}
int main7()
{
    int numbers[]{ 7,1,4, 8, 5 };

    //����� �������� �� ������ ���������� ��  ��������������� ������
    const int SIZE = sizeof numbers / sizeof numbers[0];
    //  const int SIZE = sizeof numbers / *numbers;

    //��������� ������
    for (auto num : numbers) cout << num << " ";
    cout << endl;

    //��������� changeArray � ����� ��������� ��������� f1
    changeArray(numbers, SIZE, f1);
    for (auto num : numbers) cout << num << " ";
    cout << endl;

    //��������� changeArray � ����� ��������� ��������� f2
    changeArray(numbers, SIZE, f2);
    for (auto num : numbers) cout << num << " ";
    cout << endl;

    //������ ������� - ���������� � �� ������� �� ����������
    //���� �������� �� ���� �a ���������
    //auto f3 = [](int x)-> int {return x - 5; }; 
    auto f3 = [](int x) {return x - 5; };

    //��������� changeArray � ����� ��������� ��������� f3
    changeArray(numbers, SIZE, f3);
    for (auto num : numbers) cout << num << " ";
    cout << endl;

    //������-��������� ���� �� �� ������ �������� ��� �����������
    changeArray(numbers, SIZE, [](int x) {return x % 2; });
    for (auto num : numbers) cout << num << " ";
    cout << endl;

    return 0;
}