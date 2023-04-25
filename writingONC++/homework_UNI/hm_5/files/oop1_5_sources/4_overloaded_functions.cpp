#include <iostream>
#include <string>
using namespace std;

//Îverloaded functions
int sum(int a, int b) { 
    return a + b;
}
double sum(double a, double b) {
    return a + b;
}
string sum(string a, string b) {
    return a + b;
}
int sum(int a, int b, int c) { return a + b + c; }
int main4()
{
    int x{ 1 }, y{ 2 }, z{ 3 };
    double p{ 1.2 }, q{ 6.3 };
    string n1{ "Ivan" }, n2{ "Dimo" };

    cout << sum(x, y) << endl;//3 
    cout << sum(p, q) << endl;//7.5
    cout << sum(n1, n2) << endl;//IvanDimo
    cout << sum(x, y, z) << endl;//6 
    return 0;
}
