#include <iostream>
#include <cstdlib>

using namespace std;

int main()
{
    system("chcp 1251>nul");

    int n = 10, s = 0, k = 1;
start: // Etiket
    s += k * k;
    if (k < n)
    {
        k++;
        // going to the place which is specifaid as etiket
        goto start;
    }
    // printing the result from the calculation
    cout << "The sum from the pows of the numbers from 1 to " << n << ": " << s << endl;

    system("pause>nul");
    return 0;
}