#include <iostream>
using namespace std;

int sum1(int a, int b) { return a + b; }// int (int, int)
int mult(int a, int b) { return a * b; }// int (int, int)
double calc(int x) { return x * 1.5; }  // double (int)

int main6()
{
    cout << "sum1 " << sum1 << " mult " << mult << endl;

    int (*fp) (int, int);

    fp = sum1;
    cout << fp(1, 10) << endl;

    fp = mult;
    cout << fp(2, 12) << endl;

    return 0;
}
