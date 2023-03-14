#include <iostream>

using namespace std;

int main()
{
    system("chcp 1251>nul");

    const int n = 10;
    srand(2);

    // creating massive
    int nums[n];

    int i, j, k, s;
    cout << "Massive before the sorting:\n| ";
    for (k = 0; k < n; k++)
    {
        nums[k] = rand() % 10;
        cout << nums[k] << " | ";
    }
    cout << "\nThe massive after the sorting:\n| ";
    // NOTE sorting massive
    for (i = 1; i <= n - 1; i++)
    {
        // looping through element of the massive
        for (j = 0; j < n - i; j++)
        {
            if (nums[j] > nums[j + 1])
            {
                s = nums[j + 1];
                nums[j + 1] = nums[j];
                nums[j] = s;
            }
        }
    }
    // printing the sorted massive
    for (k = 0; k < n; k++)
    {
        cout << nums[k] << " | ";
    }
    cout << endl;
    // holding the window on console
    system("pause>nul");
    return 0;
}