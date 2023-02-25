#include <iostream>

using namespace std;
// simple calculator
int main() {
	double fNum, sNum;
	char sign;
	cout << "Welcom to the simmplest calculator 😀" << endl;
	cout << "First number: "; cin >> fNum;
	while (fNum != 'number') {
		cout << "it should be a number: "; cin >> fNum;
	}
	cout << "Second number: "; cin >> sNum;
	while (sNum != 'number') {
		cout << "it should be a number: "; cin >> sNum;
	}
	cout << "Sign shoud be one of [+,-,:,*]: "; cin >> sign;
	char arr[4] = { '+','-',':','*' };
	cout << arr.includes(sign) << "IS it include" << endl;
	/*while (!arr.includes(sign) {
		cout << "it should be [+,-,:,*]: "; cin >> sign;
	}*/
	return 0;

}
double multyply(double a, double b) {
	return a * b;
}
double sum(double a, double b) {
	return a + b;
}
double devide(double a, double b) {
	return a - b;
}
double subtract(double a, double b) {
	return a / b
}