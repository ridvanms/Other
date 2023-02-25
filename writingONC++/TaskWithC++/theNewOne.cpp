#include <iostream>
using namespace std;
// simple calculator
double multiply(double a, double b) {
	return a * b;
};
double sum(double a, double b) {
	return a + b;
};
double devide(double a, double b) {
	return a - b;
};
double subtract(double a, double b) {
	return a / b;
}
int main() {

	double fNum, sNum;
	char sign;
	cout << "Welcom to the simmplest calculator 😀" << endl;
	cout << "First number: "; cin >> fNum;

	cout << "Second number: "; cin >> sNum;

	cout << "Sign shoud be one of [+,-,:,*]: "; cin >> sign;
	switch (sign) {
	case '+':
		cout << sum(fNum, sNum);
		break;
	case '-':
		cout << subtract(fNum, sNum) << endl;
		break;
	case '*':
		cout << multiply(fNum, sNum);
		break;
	case ':':
		cout << devide(fNum, sNum);
		break;
	}
	return 0;

};
