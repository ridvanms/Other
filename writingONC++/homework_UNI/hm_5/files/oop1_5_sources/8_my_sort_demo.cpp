#include <iostream>
#include <string>
using namespace std;

bool compare_less(int a, int b) {
	return  a < b;
}
bool compare_greater(int a, int b) {
	return  a > b;
}
bool compare_less_alpha(int a, int b) {
	return  to_string(a) < to_string(b);
}
void bubbleSortAsc(int arr[], int n);
void bubbleSortDesc(int arr[], int n);

void bubbleSort(int arr[], int n, bool (*compF) (int, int) = compare_less);
void display(int nums[], int n);



int main8() {
	system("chcp 1251>nul");
	int myArray[7]{ 10,6,11,5, 4,9,1 };
	display(myArray, 7);

	//cout << "Сортиране по нарастване на елементите\n";
	//bubbleSortAsc(myArray, 7);

	/*cout << "Сортиране по намаляване на елементите\n";
	bubbleSortDesc(myArray, 7);*/

	bubbleSort(myArray, 7);
	cout << "fp default - compare_less\n";
	display(myArray, 7);
	bubbleSort(myArray, 7, compare_greater);
	cout << "fp - compare_greater\n";
	display(myArray, 7);
	bubbleSort(myArray, 7, compare_less_alpha);
	cout << "fp  - compare_less_alpha\n";
	display(myArray, 7);

	bubbleSort(myArray, 7, [](int a, int b) {return to_string(a) > to_string(b); });
	cout << "fp  - lambda\n";
	display(myArray, 7);

	return 0;

}

void bubbleSortAsc(int arr[], int n) {
	for (int i{ n - 1 }; i > 0; i--) {
		cout << "Изплува числото в позиция " << i << endl;
		for (int j{ 0 }; j < i; j++) {
			if (arr[j] > arr[j + 1]) swap(arr[j], arr[j + 1]);

		}
		display(arr, n);
		cin.get();
	}
}

void bubbleSortDesc(int arr[], int n) {

	for (int i{ n - 1 }; i > 0; i--) {
		cout << "Изплува числото в позиция " << i << endl;
		for (int j{ 0 }; j < i; j++) {
			if (arr[j] < arr[j + 1]) swap(arr[j], arr[j + 1]);
		}
		display(arr, n);
		cin.get();
	}
}

void bubbleSort(int arr[], int n, bool (*compF) (int, int)) {

	for (int i{ n - 1 }; i > 0; i--) {
		//	cout << "Изплува числото в позиция " << i << endl;
		for (int j{ 0 }; j < i; j++) {
			if (!compF(arr[j], arr[j + 1])) swap(arr[j], arr[j + 1]);
		}
		//	display(arr, n);
		//	cin.get();
	}
}


void display(int nums[], int n) {
	for (int i{ 0 }; i < n; i++) {
		cout << nums[i] << (i < n - 1 ? ", " : "\n");
	}
}

