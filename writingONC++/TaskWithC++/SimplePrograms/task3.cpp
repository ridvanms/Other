#include <iostream>

using namespace std;
// simple calculator
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
	return a / b;
}

int main() {
	double fNum, sNum;
	char sign;
	cout << "Welcom to the simmplest calculator 😀" << endl;
	cout << "First number: "; cin >> fNum;
	while (!fNum ) {
		cout << "it should be a number: "; cin >> fNum;
	}
	cout << "Second number: "; cin >> sNum;
	while (!sNum) {
		cout << "it should be a number: "; cin >> sNum;
	}
	cout << "Sign shoud be one of [+,-,:,*]: "; cin >> sign;
	
	if(sign == '+'){
		cout<<"the sum is : "<<sum(fNum,sNum);
	}else if(sign == '-'){
			cout<<"the subtract is : "<<subtract(fNum,sNum);
	}else if(sign == '*'){
			cout<<"the multiply is : "<<multyply(fNum,sNum);
	}else if(sign == ':'){
			cout<<"the devide is : "<<devide(fNum,sNum);
	}
	return 0;
	
}
