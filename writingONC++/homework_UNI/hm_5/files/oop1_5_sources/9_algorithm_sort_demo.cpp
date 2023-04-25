#include <iostream>
#include <string>
#include <algorithm>
using namespace std;


bool sort_decs(int a, int b) {
	return  a > b;
}
void display(int* nums_begin, int* nums_end) {
	for (int* p{ nums_begin }; p < nums_end; p++) {
		cout << *p << " ";
	}
	cout << endl;
}

int main() {
	system("chcp 1251>nul");
	
	int myArray[7]{ 10,6,11,5, 4,9,1 };
	cout << "���������� �� sort �� STL\n";
	cout << "�� ���������� - �� ������������\n";
	sort(myArray, myArray + 7);
	display(myArray, myArray + 7);
	cout << "�� ���������� - ���������� �������� ��� �������\n";
	sort(myArray, myArray + 7, sort_decs);
	display(myArray, myArray + 7);
	cout << "�� ���������� �������������� - ������ �����\n";
	sort(myArray, myArray + 7, [](int a, int b) {return  to_string(a) < to_string(b); });
	display(myArray, myArray + 7);

	return 0;


}


