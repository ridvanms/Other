#include <iostream>
using namespace std;
template< typename T>
T sum(T a, T b) {
    return a + b;
 }

int main5()
{
    cout << sum(1, 2) << endl;// инстанция на шаблона за int
    cout << sum(1.2, 3.4) << endl;// инстанция на шаблона за double
    cout << sum<double>(1, 2.3) << endl;//инстанция на шаблона за double

    return 0;
}
